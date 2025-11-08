import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [showDevDialog, setShowDevDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
        } else {
          entry.target.classList.remove('animate-fade-in-up');
          entry.target.classList.add('opacity-0');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: '', phone: '', message: '' });
  };

  const handleDevAccess = async () => {
    if (password !== '5566') {
      toast({
        title: "Ошибка",
        description: "Неверный пароль",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/ecf911e0-4ddd-4fb7-9723-7d21a1b95248', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Код отправлен в Telegram"
        });
        setShowDevDialog(false);
        setPassword('');
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить код",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Icon name="Shield" size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Восстановление Авито</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-gray-700 hover:text-cyan-500 transition-colors">Услуги</a>
            <a href="#advantages" className="text-gray-700 hover:text-cyan-500 transition-colors">Преимущества</a>
            <a href="#reviews" className="text-gray-700 hover:text-cyan-500 transition-colors">Отзывы</a>
            <a href="#contact" className="text-gray-700 hover:text-cyan-500 transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDevDialog(true)}
              className="hidden md:flex items-center gap-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50"
            >
              <Icon name="Code" size={16} />
              Для разработчиков
            </Button>
            <a href="tel:+79991234567" className="text-cyan-600 font-semibold text-lg hover:text-cyan-700 transition-colors">
              +7 (999) 123-45-67
            </a>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              ВОССТАНОВЛЕНИЕ АККАУНТА АВИТО
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-light mb-8 leading-relaxed">
              ПРОФЕССИОНАЛЬНАЯ ПОМОЩЬ<br />ДЛЯ ВАШЕГО БИЗНЕСА
            </p>
            <Button 
              size="lg" 
              className="bg-white text-cyan-600 hover:bg-gray-50 text-lg px-8 py-6 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 scroll-animate opacity-0">
            ВХОДИТ В СТОИМОСТЬ
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-16 scroll-animate opacity-0"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { icon: 'FileText', title: 'РАЗМЕЩЕНИЕ ВАШЕЙ ИНФОРМАЦИИ', color: 'from-yellow-400 to-orange-400' },
              { icon: 'MessageSquare', title: 'НАСТРОЙКА ФОРМ ОБРАТНОЙ СВЯЗИ, ЧАТА ОНЛАЙН-КОНСУЛЬТАНТА', color: 'from-cyan-400 to-blue-500' },
              { icon: 'Share2', title: 'ИНТЕГРАЦИЯ С СОЦИАЛЬНЫМИ СЕТЯМИ', color: 'from-pink-400 to-purple-500' },
              { icon: 'Headphones', title: 'ТЕХНИЧЕСКАЯ ПОДДЕРЖКА 7 ДНЕЙ В НЕДЕЛЮ', color: 'from-green-400 to-emerald-500' }
            ].map((item, idx) => (
              <Card key={idx} className="scroll-animate opacity-0 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <Icon name={item.icon} size={40} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-cyan-600 uppercase leading-tight">
                    {item.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="advantages" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 scroll-animate opacity-0">
            НАШИ ПРЕИМУЩЕСТВА
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-16 scroll-animate opacity-0"></div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { icon: 'Clock', title: 'Быстрое восстановление', desc: 'Восстанавливаем доступ к аккаунту в течение 24-48 часов' },
              { icon: 'ShieldCheck', title: '100% гарантия результата', desc: 'Вернём деньги, если не сможем восстановить аккаунт' },
              { icon: 'Users', title: 'Опыт более 5 лет', desc: 'Восстановили более 1000 аккаунтов для наших клиентов' },
              { icon: 'Lock', title: 'Конфиденциальность', desc: 'Гарантируем полную безопасность ваших данных' },
              { icon: 'Headset', title: 'Поддержка 24/7', desc: 'Наши специалисты всегда на связи' },
              { icon: 'Award', title: 'Легальные методы', desc: 'Работаем только официальными способами' }
            ].map((item, idx) => (
              <div key={idx} className="scroll-animate opacity-0 text-center group">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name={item.icon} size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 scroll-animate opacity-0">
            ОТЗЫВЫ КЛИЕНТОВ
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-16 scroll-animate opacity-0"></div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Александр М.', text: 'Отличная работа! Восстановили аккаунт за 1 день. Очень благодарен команде за профессионализм.', rating: 5 },
              { name: 'Елена К.', text: 'Думала, что потеряла аккаунт навсегда. Ребята помогли всё вернуть! Рекомендую всем!', rating: 5 },
              { name: 'Дмитрий С.', text: 'Быстро, качественно и по адекватной цене. Буду обращаться ещё при необходимости.', rating: 5 }
            ].map((review, idx) => (
              <Card key={idx} className="scroll-animate opacity-0 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic leading-relaxed">"{review.text}"</p>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 scroll-animate opacity-0">
            СВЯЖИТЕСЬ С НАМИ
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-16 scroll-animate opacity-0"></div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="scroll-animate opacity-0 shadow-2xl border-0">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ваше имя</label>
                    <Input 
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
                    <Input 
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Сообщение</label>
                    <Textarea 
                      placeholder="Опишите вашу ситуацию..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Восстановление Авито</h3>
              <p className="text-gray-400">Профессиональная помощь в восстановлении аккаунтов</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Контакты</h3>
              <p className="text-gray-400 mb-2">Телефон: +7 (999) 123-45-67</p>
              <p className="text-gray-400">Email: info@avito-recovery.ru</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Режим работы</h3>
              <p className="text-gray-400">Ежедневно, 24/7</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2024 Восстановление Авито. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Dialog open={showDevDialog} onOpenChange={setShowDevDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Доступ для разработчиков</DialogTitle>
            <DialogDescription>
              Введите пароль для получения исходного кода
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDevAccess()}
            />
            <Button 
              onClick={handleDevAccess} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Отправка...' : 'Получить код'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;