import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'GameMaster', text: 'Добро пожаловать в игровой чат!', time: '12:30' },
    { id: 2, user: 'ProPlayer', text: 'Кто играет в Cyberpunk 2077?', time: '12:31' },
    { id: 3, user: 'Streamer', text: 'Начинаю стрим Valorant через 5 минут!', time: '12:32' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const games = [
    { id: 1, title: 'Cyberpunk 2077', category: 'RPG', rating: 4.2, players: '12.5K', image: '/img/aa177eec-efd9-49fe-8751-c18dcec5c174.jpg' },
    { id: 2, title: 'Valorant', category: 'Shooter', rating: 4.8, players: '24.8K', image: '/img/1ae8b657-7505-4ee6-ada3-932ddc4832c7.jpg' },
    { id: 3, title: 'Minecraft', category: 'Sandbox', rating: 4.9, players: '35.2K', image: '/placeholder.svg' },
    { id: 4, title: 'Dota 2', category: 'MOBA', rating: 4.5, players: '18.9K', image: '/placeholder.svg' },
    { id: 5, title: 'CS:GO', category: 'Shooter', rating: 4.7, players: '28.1K', image: '/placeholder.svg' },
    { id: 6, title: 'World of Warcraft', category: 'MMORPG', rating: 4.4, players: '15.7K', image: '/placeholder.svg' },
  ];

  const streams = [
    { id: 1, title: 'Топовый стрим Valorant', streamer: 'ProStreamer', viewers: 15234, game: 'Valorant' },
    { id: 2, title: 'Прохождение Cyberpunk', streamer: 'GameExplorer', viewers: 8921, game: 'Cyberpunk 2077' },
    { id: 3, title: 'Турнир по CS:GO', streamer: 'ESportsCast', viewers: 32105, game: 'CS:GO' },
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'Вы',
        text: newMessage,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="bg-card/50 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GameHub
              </h1>
              <div className="hidden md:flex space-x-6">
                {['Главная', 'Игры', 'Категории', 'Топ', 'Новинки', 'Профиль', 'Избранное'].map((item) => (
                  <Button key={item} variant="ghost" className="hover:bg-accent/10 transition-colors">
                    {item}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Input 
                placeholder="Поиск игр..." 
                className="w-64 bg-background/50 border-border/50"
              />
              <Button size="icon" variant="ghost">
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 animate-glow"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4 text-foreground">
                  Добро пожаловать в мир игр
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Играйте, стримьте и общайтесь с геймерами со всего мира
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Icon name="Play" size={20} className="mr-2" />
                  Начать играть
                </Button>
              </div>
            </div>

            {/* Games Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Популярные игры</h3>
                <Button variant="outline">
                  Все игры
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {games.map((game) => (
                  <Card key={game.id} className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 bg-card/50 backdrop-blur border-border/50 hover:scale-105">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={game.image} 
                          alt={game.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-secondary/90 text-secondary-foreground">
                            {game.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                          <Icon name="Users" size={16} className="text-primary" />
                          <span className="text-sm text-primary font-medium">{game.players}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-lg mb-2">{game.title}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{game.rating}</span>
                          </div>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Icon name="Play" size={16} className="mr-2" />
                            Играть
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Streams Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Популярные стримы</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {streams.map((stream) => (
                  <Card key={stream.id} className="group hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>{stream.streamer[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-bold">{stream.title}</h4>
                          <p className="text-sm text-muted-foreground">{stream.streamer}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">LIVE</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{stream.game}</Badge>
                        <div className="flex items-center space-x-2">
                          <Icon name="Eye" size={16} />
                          <span className="text-sm">{stream.viewers.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 h-[calc(100vh-8rem)] bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Игровой чат
                  <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
                    {messages.length * 15} онлайн
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full p-0">
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex space-x-3 animate-fade-in">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-primary/20 text-primary">
                            {message.user[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-sm">{message.user}</span>
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                          <p className="text-sm break-words">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t border-border/50">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Написать сообщение..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 bg-background/50 border-border/50"
                    />
                    <Button size="icon" onClick={sendMessage} className="shrink-0">
                      <Icon name="Send" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;