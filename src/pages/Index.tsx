import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'GameMaster', text: 'Добро пожаловать в игровой чат!', time: '12:30' },
    { id: 2, user: 'ProPlayer', text: 'Кто играет в Cyberpunk 2077?', time: '12:31' },
    { id: 3, user: 'Streamer', text: 'Начинаю стрим Valorant через 5 минут!', time: '12:32' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [userOrbs, setUserOrbs] = useState(250);
  const [selectedSkin, setSelectedSkin] = useState(null);
  const [skinColors, setSkinColors] = useState({
    primary: '#8B5CF6',
    secondary: '#F97316',
    accent: '#10B981'
  });
  const [userInventory, setUserInventory] = useState([]);
  const [marketplace, setMarketplace] = useState([
    { id: 1, name: 'Огненный Самурай', price: 18, seller: 'ProGamer123', rarity: 'epic', game: 'Valorant' },
    { id: 2, name: 'Ледяной Волк', price: 35, seller: 'SkinsHunter', rarity: 'legendary', game: 'CS:GO' },
    { id: 3, name: 'Космический Воин', price: 12, seller: 'MegaPlayer', rarity: 'rare', game: 'Minecraft' },
  ]);
  const [topUpAmount, setTopUpAmount] = useState(10);

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

  const skins = [
    { id: 1, name: 'Неоновый Воин', price: 15, rarity: 'epic', game: 'Valorant', type: 'weapon' },
    { id: 2, name: 'Киберпанк Ниндзя', price: 25, rarity: 'legendary', game: 'Cyberpunk 2077', type: 'character' },
    { id: 3, name: 'Космический Рейнджер', price: 10, rarity: 'rare', game: 'Minecraft', type: 'character' },
    { id: 4, name: 'Огненный Дракон', price: 30, rarity: 'mythic', game: 'CS:GO', type: 'weapon' },
    { id: 5, name: 'Ледяной Призрак', price: 20, rarity: 'epic', game: 'Dota 2', type: 'character' },
    { id: 6, name: 'Золотой Император', price: 50, rarity: 'legendary', game: 'World of Warcraft', type: 'armor' },
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

  const buySkin = (skin: any) => {
    if (userOrbs >= skin.price) {
      setUserOrbs(userOrbs - skin.price);
      setUserInventory([...userInventory, {...skin, purchaseDate: new Date().toISOString()}]);
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'Система',
        text: `🎨 Поздравляем! Вы купили скин "${skin.name}" за ${skin.price} орбов!`,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  const buyFromMarketplace = (item: any) => {
    if (userOrbs >= item.price) {
      setUserOrbs(userOrbs - item.price);
      setUserInventory([...userInventory, {...item, purchaseDate: new Date().toISOString()}]);
      setMarketplace(marketplace.filter(m => m.id !== item.id));
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'Система',
        text: `🛒 Вы купили "${item.name}" у ${item.seller} за ${item.price} орбов!`,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  const sellSkin = (skin: any, price: number) => {
    setUserInventory(userInventory.filter(item => item.id !== skin.id));
    setMarketplace([...marketplace, {...skin, price, seller: 'Вы', id: Date.now()}]);
    setMessages([...messages, {
      id: messages.length + 1,
      user: 'Система',
      text: `💰 Вы выставили "${skin.name}" на продажу за ${price} орбов!`,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const topUpOrbs = (amount: number) => {
    setUserOrbs(userOrbs + amount);
    setMessages([...messages, {
      id: messages.length + 1,
      user: 'Система',
      text: `💳 Баланс пополнен на ${amount} орбов (${amount * 10}₽)!`,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'rare': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case 'epic': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      case 'legendary': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'mythic': return 'text-red-400 border-red-400/30 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
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
              <div className="flex items-center space-x-3 bg-card/50 rounded-lg px-4 py-2 border border-border/50">
                <Icon name="Coins" size={20} className="text-yellow-500" />
                <span className="font-bold text-yellow-500">{userOrbs}</span>
                <span className="text-sm text-muted-foreground">орбов</span>
                <div className="text-xs text-muted-foreground">
                  (≈{userOrbs * 10} ₽)
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Пополнить
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-card border-border">
                  <DialogHeader>
                    <DialogTitle>Пополнение орбов</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        {[10, 25, 50, 100, 250, 500].map((amount) => (
                          <Button
                            key={amount}
                            variant={topUpAmount === amount ? "default" : "outline"}
                            className="flex flex-col py-6"
                            onClick={() => setTopUpAmount(amount)}
                          >
                            <span className="font-bold">{amount}</span>
                            <span className="text-xs text-muted-foreground">
                              {amount * 10}₽
                            </span>
                          </Button>
                        ))}
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span>Текущий баланс:</span>
                          <span className="font-semibold">{userOrbs} орбов</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>После пополнения:</span>
                          <span className="font-semibold text-green-400">{userOrbs + topUpAmount} орбов</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => topUpOrbs(topUpAmount)}
                    >
                      <Icon name="CreditCard" size={16} className="mr-2" />
                      Пополнить на {topUpAmount * 10}₽
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
            {/* Navigation Tabs */}
            <Tabs defaultValue="games" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-card/50">
                <TabsTrigger value="games">Игры</TabsTrigger>
                <TabsTrigger value="skins">Магазин скинов</TabsTrigger>
                <TabsTrigger value="marketplace">Торговая площадка</TabsTrigger>
                <TabsTrigger value="inventory">Инвентарь</TabsTrigger>
              </TabsList>
              
              <TabsContent value="games" className="space-y-8">
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
              </TabsContent>

              <TabsContent value="skins" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Магазин скинов</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Icon name="Palette" size={16} className="mr-2" />
                        Создать скин
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card border-border">
                      <DialogHeader>
                        <DialogTitle>Создание скина</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Основной цвет</label>
                            <input
                              type="color"
                              value={skinColors.primary}
                              onChange={(e) => setSkinColors({...skinColors, primary: e.target.value})}
                              className="w-full h-12 rounded border border-border/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Дополнительный цвет</label>
                            <input
                              type="color"
                              value={skinColors.secondary}
                              onChange={(e) => setSkinColors({...skinColors, secondary: e.target.value})}
                              className="w-full h-12 rounded border border-border/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Акцентный цвет</label>
                            <input
                              type="color"
                              value={skinColors.accent}
                              onChange={(e) => setSkinColors({...skinColors, accent: e.target.value})}
                              className="w-full h-12 rounded border border-border/50"
                            />
                          </div>
                        </div>
                        <div className="bg-muted/50 p-6 rounded-lg">
                          <h4 className="font-semibold mb-3">Предпросмотр скина</h4>
                          <div className="relative w-full h-32 rounded-lg overflow-hidden" style={{
                            background: `linear-gradient(45deg, ${skinColors.primary}, ${skinColors.secondary}, ${skinColors.accent})`
                          }}>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-white font-bold text-lg drop-shadow-lg">
                                Мой скин
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <Icon name="Save" size={16} className="mr-2" />
                          Сохранить скин (5 орбов)
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {skins.map((skin) => (
                    <Card key={skin.id} className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-lg">{skin.name}</h4>
                              <p className="text-sm text-muted-foreground">{skin.game}</p>
                            </div>
                            <Badge className={getRarityColor(skin.rarity)}>
                              {skin.rarity}
                            </Badge>
                          </div>
                          
                          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 h-24 rounded-lg flex items-center justify-center">
                            <Icon name={skin.type === 'weapon' ? 'Zap' : skin.type === 'character' ? 'User' : 'Shield'} 
                                  size={32} className="text-primary" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Icon name="Coins" size={16} className="text-yellow-500" />
                              <span className="font-bold text-yellow-500">{skin.price}</span>
                              <span className="text-sm text-muted-foreground">
                                (≈{skin.price * 10}₽)
                              </span>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => buySkin(skin)}
                              disabled={userOrbs < skin.price}
                              className="bg-primary hover:bg-primary/90 disabled:opacity-50"
                            >
                              <Icon name="ShoppingCart" size={14} className="mr-1" />
                              Купить
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="marketplace" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Торговая площадка</h3>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    {marketplace.length} лотов
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {marketplace.map((item) => (
                    <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-lg">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">от {item.seller}</p>
                            </div>
                            <Badge className={getRarityColor(item.rarity)}>
                              {item.rarity}
                            </Badge>
                          </div>
                          
                          <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 h-24 rounded-lg flex items-center justify-center">
                            <Icon name="Package" size={32} className="text-orange-400" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Icon name="Coins" size={16} className="text-yellow-500" />
                              <span className="font-bold text-yellow-500">{item.price}</span>
                              <span className="text-sm text-muted-foreground">
                                (≈{item.price * 10}₽)
                              </span>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => buyFromMarketplace(item)}
                              disabled={userOrbs < item.price}
                              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
                            >
                              <Icon name="ShoppingBag" size={14} className="mr-1" />
                              Купить
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="inventory" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Мой инвентарь</h3>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {userInventory.length} предметов
                  </Badge>
                </div>
                
                {userInventory.length === 0 ? (
                  <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardContent className="p-12 text-center">
                      <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h4 className="text-xl font-semibold mb-2">Инвентарь пуст</h4>
                      <p className="text-muted-foreground mb-6">Купите скины в магазине или на торговой площадке</p>
                      <Button className="bg-primary hover:bg-primary/90">
                        Перейти в магазин
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {userInventory.map((item, index) => (
                      <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-bold text-lg">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.game}</p>
                              </div>
                              <Badge className={getRarityColor(item.rarity)}>
                                {item.rarity}
                              </Badge>
                            </div>
                            
                            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 h-24 rounded-lg flex items-center justify-center">
                              <Icon name="Crown" size={32} className="text-green-400" />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-muted-foreground">
                                Куплено: {new Date(item.purchaseDate).toLocaleDateString('ru-RU')}
                              </div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                                    <Icon name="Tag" size={14} className="mr-1" />
                                    Продать
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md bg-card border-border">
                                  <DialogHeader>
                                    <DialogTitle>Продажа скина</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Цена (орбы)</label>
                                      <Input
                                        type="number"
                                        placeholder="Введите цену..."
                                        className="bg-background/50 border-border/50"
                                      />
                                    </div>
                                    <Button 
                                      className="w-full bg-red-600 hover:bg-red-700"
                                      onClick={() => sellSkin(item, 15)}
                                    >
                                      <Icon name="DollarSign" size={16} className="mr-2" />
                                      Выставить на продажу
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

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