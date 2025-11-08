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
        
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            src_dir = Path('/function/code/src')
            
            if src_dir.exists():
                for file_path in src_dir.rglob('*'):
                    if file_path.is_file():
                        arcname = str(file_path.relative_to('/function/code'))
                        zip_file.write(file_path, arcname)
            
            other_files = [
                '/function/code/package.json',
                '/function/code/tsconfig.json',
                '/function/code/tailwind.config.ts',
                '/function/code/vite.config.ts',
                '/function/code/index.html',
                '/function/code/postcss.config.cjs'
            ]
            
            for file_path in other_files:
                if os.path.exists(file_path):
                    arcname = os.path.basename(file_path)
                    zip_file.write(file_path, arcname)
        
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
