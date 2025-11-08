'''
Business: Archive source code and send to Telegram user
Args: event - HTTP request with method
Returns: HTTP response with status
'''

import json
import os
import zipfile
import io
import requests
from pathlib import Path
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        telegram_token = '8528212862:AAFFtkJERqGnoluKy8qhulWR5j5ZqnbSYXE'
        chat_id = '8460830060'
        
        zip_buffer = io.BytesIO()
        
        base_paths = ['/function/code', '/var/task', '/app', '.']
        working_dir = None
        
        for base in base_paths:
            test_path = Path(base) / 'src'
            if test_path.exists():
                working_dir = Path(base)
                break
        
        if not working_dir:
            working_dir = Path(os.getcwd())
        
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            src_dir = working_dir / 'src'
            
            if src_dir.exists():
                for file_path in src_dir.rglob('*'):
                    if file_path.is_file():
                        arcname = str(file_path.relative_to(working_dir))
                        zip_file.write(file_path, arcname)
            
            config_files = [
                'package.json',
                'tsconfig.json', 
                'tailwind.config.ts',
                'vite.config.ts',
                'index.html',
                'postcss.config.cjs',
                'README.md'
            ]
            
            for filename in config_files:
                file_path = working_dir / filename
                if file_path.exists():
                    zip_file.write(file_path, filename)
        
        zip_buffer.seek(0)
        
        url = f'https://api.telegram.org/bot{telegram_token}/sendDocument'
        files = {'document': ('source-code.zip', zip_buffer, 'application/zip')}
        data = {
            'chat_id': chat_id,
            'caption': '📦 Исходный код сайта восстановления Авито'
        }
        
        response = requests.post(url, files=files, data=data, timeout=30)
        
        if response.status_code == 200:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Code sent to Telegram'}),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Telegram API error: {response.text}'}),
                'isBase64Encoded': False
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }