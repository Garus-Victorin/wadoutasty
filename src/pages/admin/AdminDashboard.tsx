import React, { useState, useEffect, useRef } from 'react';
import { 
  UtensilsCrossed, 
  LayoutDashboard, 
  ChefHat, 
  CalendarDays, 
  MessageSquare, 
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Eye,
  Loader2,
  FolderPlus,
  Tags,
  AlertTriangle,
  ShoppingBag,
  Star,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  getMenuItems, 
  addMenuItem, 
  updateMenuItem, 
  deleteMenuItem,
  getReservations,
  updateReservation,
  deleteReservation,
  getContacts,
  markContactAsRead,
  deleteContact,
  getOrders,
  updateOrder,
  deleteOrder,
  initDatabase,
  getAllReviews,
  approveReview,
  deleteReview,
  MenuItem,
  Reservation,
  Contact,
  Order,
  Review
} from '@/lib/database';

type AdminPage = 'dashboard' | 'menu' | 'categories' | 'reservations' | 'contacts' | 'orders' | 'reviews';

type ReservationStatus = 'en attente' | 'en cours' | 'termine';

const defaultCategories = [
  'Signature',
  'Traditionnel', 
  'Grillades',
  'Boissons',
  'Desserts',
  'Entrees'
];

export const AdminDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [loading, setLoading] = useState(true);
  
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: ''
  });

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [newReservationStatus, setNewReservationStatus] = useState<ReservationStatus>('en attente');
  const [deletingReservation, setDeletingReservation] = useState<Reservation | null>(null);

  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [newOrderStatus, setNewOrderStatus] = useState<ReservationStatus>('en attente');
  const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await initDatabase();
    const [menu, res, contactsData, ordersData, reviewsData] = await Promise.all([
      getMenuItems(),
      getReservations(),
      getContacts(),
      getOrders(),
      getAllReviews()
    ]);
    setMenuItems(menu);
    setReservations(res);
    setContacts(contactsData);
    setOrders(ordersData);
    setReviews(reviewsData);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    window.location.href = '/admin';
  };

  const handleAddMenuItem = async () => {
    if (newItem.name && newItem.price) {
      await addMenuItem({
        name: newItem.name,
        description: newItem.description || '',
        price: newItem.price,
        category: newItem.category || 'Signature',
        image_url: newItem.image_url || '/images/placeholder.jpg'
      });
      setNewItem({ name: '', description: '', price: '', category: '', image_url: '' });
      setIsAddingItem(false);
      loadData();
    }
  };

  const handleUpdateMenuItem = async () => {
    if (editingItem) {
      await updateMenuItem(editingItem.id, editingItem);
      setEditingItem(null);
      loadData();
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    if (confirm('Etes-vous sur de vouloir supprimer ce plat?')) {
      await deleteMenuItem(id);
      loadData();
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()]);
      setNewCategoryName('');
      setIsAddingCategory(false);
    }
  };

  const handleUpdateCategory = (oldName: string) => {
    if (editingCategoryName.trim() && oldName !== editingCategoryName.trim()) {
      setCategories(categories.map(cat => cat === oldName ? editingCategoryName.trim() : cat));
      setEditingCategory(null);
      setEditingCategoryName('');
    }
  };

  const handleDeleteCategory = (categoryName: string) => {
    if (confirm(`Etes-vous sur de vouloir supprimer la categorie "${categoryName}"?`)) {
      setCategories(categories.filter(cat => cat !== categoryName));
    }
  };

  const handleUpdateReservationStatus = async () => {
    if (editingReservation) {
      await updateReservation(editingReservation.id, { status: newReservationStatus as any });
      setEditingReservation(null);
      setNewReservationStatus('en attente');
      loadData();
    }
  };

  const handleDeleteReservation = async () => {
    if (deletingReservation) {
      await deleteReservation(deletingReservation.id);
      setDeletingReservation(null);
      loadData();
    }
  };

  const handleMarkAsRead = async (id: string) => {
    await markContactAsRead(id);
    loadData();
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm('Etes-vous sur de vouloir supprimer ce message?')) {
      await deleteContact(id);
      loadData();
    }
  };

  const handleUpdateOrderStatus = async () => {
    if (editingOrder) {
      await updateOrder(editingOrder.id, { status: newOrderStatus as any });
      setEditingOrder(null);
      setNewOrderStatus('en attente');
      loadData();
    }
  };

  const handleDeleteOrder = async () => {
    if (deletingOrder) {
      await deleteOrder(deletingOrder.id);
      setDeletingOrder(null);
      loadData();
    }
  };

  const handleApproveReview = async (id: string) => {
    await approveReview(id);
    loadData();
  };

  const handleDeleteReview = async (id: string) => {
    if (confirm('Etes-vous sur de vouloir supprimer cet avis?')) {
      await deleteReview(id);
      loadData();
    }
  };

  const pendingReservations = reservations.filter(r => r.status === 'en attente').length;
  const totalReservations = reservations.length;
  const unreadContacts = contacts.filter(c => !c.read).length;
  const pendingOrders = orders.filter(o => o.status === 'en attente').length;
  const pendingReviews = reviews.filter(r => !r.approved).length;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'en attente':
        return 'bg-orange-100 text-orange-700';
      case 'en cours':
        return 'bg-blue-100 text-blue-700';
      case 'termine':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en attente':
        return 'En attente';
      case 'en cours':
        return 'En cours';
      case 'termine':
        return 'Termine';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-foreground text-white p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-primary rounded-lg">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg">WADOU Tasty</h1>
            <span className="text-xs text-white/60">Administration</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentPage === 'dashboard' ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('menu')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentPage === 'menu' ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <ChefHat className="w-5 h-5" />
            <span>Menu</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('categories')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentPage === 'categories' ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <Tags className="w-5 h-5" />
            <span>Categories</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentPage === 'orders' ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Commandes</span>
            {pendingOrders > 0 && (
              <Badge className="ml-auto bg-red-500">{pendingOrders}</Badge>
            )}
          </button>
          
          <button
            onClick={() => setCurrentPage('reservations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentPage === 'reservations' ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            <span>Reservations</span>
            {pendingReservations > 0 && (
              <Badge className="ml-auto bg-red-500">{pendingReservations}</Badge>
            )}
          </button>
          
          <button
            onClick={() => setCurrentPage('reviews')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentPage === 'reviews' ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <Star className="w-5 h-5" />
            <span>Avis</span>
            {pendingReviews > 0 && (
              <Badge className="ml-auto bg-red-500">{pendingReviews}</Badge>
            )}
          </button>
          
          <button
            onClick={() => setCurrentPage('contacts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              currentPage === 'contacts' ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
            {unreadContacts > 0 && (
              <Badge className="ml-auto bg-red-500">{unreadContacts}</Badge>
            )}
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span>Deconnexion</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Dashboard */}
        {currentPage === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white rounded-2xl shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Reservations</p>
                      <p className="text-3xl font-bold text-gray-900">{totalReservations}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <CalendarDays className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-2xl shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">En attente</p>
                      <p className="text-3xl font-bold text-orange-600">{pendingReservations}</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <CalendarDays className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-2xl shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Commandes</p>
                      <p className="text-3xl font-bold text-purple-600">{orders.length}</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <ShoppingBag className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-2xl shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Messages non lus</p>
                      <p className="text-3xl font-bold text-blue-600">{unreadContacts}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Commandes en attente */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                    Commandes recemment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">{order.name}</p>
                          <p className="text-sm text-gray-500 truncate max-w-[200px]">{order.items}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusBadgeClass(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                          <p className="text-xs text-gray-400 mt-1">{order.total}</p>
                        </div>
                      </div>
                    ))}
                    {orders.length === 0 && (
                      <p className="text-center text-gray-500 py-4">Aucune commande</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-orange-600" />
                    Reservations en attente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reservations.filter(r => r.status === 'en attente').slice(0, 5).map(reservation => (
                      <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">{reservation.name}</p>
                          <p className="text-sm text-gray-500">{reservation.date} a {reservation.time}</p>
                          <p className="text-xs text-gray-400">{reservation.guests} personnes</p>
                        </div>
                        <Badge className={getStatusBadgeClass(reservation.status)}>
                          {getStatusText(reservation.status)}
                        </Badge>
                      </div>
                    ))}
                    {reservations.filter(r => r.status === 'en attente').length === 0 && (
                      <p className="text-center text-gray-500 py-4">Aucune reservation en attente</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Messages recents */}
            <Card className="bg-white rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Messages recents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.slice(0, 5).map(contact => (
                    <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{contact.name}</p>
                          {!contact.read && <Badge className="bg-blue-100 text-blue-700 text-xs">Nouveau</Badge>}
                        </div>
                        <p className="text-sm text-gray-500 truncate max-w-[300px]">{contact.message}</p>
                        <p className="text-xs text-gray-400">{new Date(contact.created_at || '').toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <p className="text-center text-gray-500 py-4">Aucun message</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Menu */}
        {currentPage === 'menu' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-display font-bold text-gray-900">Gestion du Menu</h1>
              <Button onClick={() => setIsAddingItem(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="w-5 h-5 mr-2" />
                Ajouter un plat
              </Button>
            </div>

            {isAddingItem && (
              <Card className="bg-white rounded-2xl shadow-sm mb-6">
                <CardHeader>
                  <CardTitle>Ajouter un nouveau plat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nom du plat</Label>
                      <Input 
                        value={newItem.name} 
                        onChange={e => setNewItem({...newItem, name: e.target.value})}
                        placeholder="Ex: Amiwo au Poulet"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Prix</Label>
                      <Input 
                        value={newItem.price} 
                        onChange={e => setNewItem({...newItem, price: e.target.value})}
                        placeholder="Ex: 4.500 XOF"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Categorie</Label>
                      <select
                        value={newItem.category || ''}
                        onChange={e => setNewItem({...newItem, category: e.target.value})}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                      >
                        <option value="">Selectionner une categorie</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <Label>Image URL</Label>
                      <Input 
                        value={newItem.image_url} 
                        onChange={e => setNewItem({...newItem, image_url: e.target.value})}
                        placeholder="/images/amiwo.jpg ou https://..."
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Description</Label>
                      <Textarea 
                        value={newItem.description} 
                        onChange={e => setNewItem({...newItem, description: e.target.value})}
                        placeholder="Description du plat..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button onClick={handleAddMenuItem} className="bg-primary">Enregistrer</Button>
                    <Button variant="outline" onClick={() => setIsAddingItem(false)}>Annuler</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map(item => (
                <Card key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="h-48 bg-gray-100">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <Badge>{item.category}</Badge>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{item.description}</p>
                    <p className="font-bold text-primary text-lg">{item.price}</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" onClick={() => setEditingItem(item)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteMenuItem(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {editingItem && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="bg-white rounded-2xl w-full max-w-lg">
                  <CardHeader>
                    <CardTitle>Modifier le plat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Nom du plat</Label>
                        <Input 
                          value={editingItem.name} 
                          onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Prix</Label>
                        <Input 
                          value={editingItem.price} 
                          onChange={e => setEditingItem({...editingItem, price: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Image URL</Label>
                        <Input 
                          value={editingItem.image_url} 
                          onChange={e => setEditingItem({...editingItem, image_url: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea 
                          value={editingItem.description} 
                          onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button onClick={handleUpdateMenuItem} className="bg-primary">Enregistrer</Button>
                      <Button variant="outline" onClick={() => setEditingItem(null)}>Annuler</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Categories */}
        {currentPage === 'categories' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-display font-bold text-gray-900">Gestion des Categories</h1>
              <Button onClick={() => setIsAddingCategory(true)} className="bg-primary hover:bg-primary/90">
                <FolderPlus className="w-5 h-5 mr-2" />
                Ajouter une categorie
              </Button>
            </div>

            {isAddingCategory && (
              <Card className="bg-white rounded-2xl shadow-sm mb-6">
                <CardHeader>
                  <CardTitle>Nouvelle categorie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Label>Nom de la categorie</Label>
                      <Input 
                        value={newCategoryName} 
                        onChange={e => setNewCategoryName(e.target.value)}
                        placeholder="Ex: Desserts"
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handleAddCategory} className="bg-primary">Ajouter</Button>
                    <Button variant="outline" onClick={() => { setIsAddingCategory(false); setNewCategoryName(''); }}>Annuler</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(category => (
                <Card key={category} className="bg-white rounded-2xl shadow-sm">
                  <CardContent className="p-4">
                    {editingCategory === category ? (
                      <div className="flex gap-2">
                        <Input 
                          value={editingCategoryName} 
                          onChange={e => setEditingCategoryName(e.target.value)}
                          className="flex-1"
                          autoFocus
                        />
                        <Button size="sm" onClick={() => handleUpdateCategory(category)}>
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => { setEditingCategory(null); setEditingCategoryName(''); }}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Tags className="w-5 h-5 text-primary" />
                          <span className="font-medium">{category}</span>
                          <Badge variant="outline">{menuItems.filter(item => item.category === category).length} plats</Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => { setEditingCategory(category); setEditingCategoryName(category); }}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteCategory(category)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        {currentPage === 'orders' && (
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Gestion des Commandes</h1>
            
            <Card className="bg-white rounded-2xl shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Client</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Telephone</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Adresse</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Plats</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Total</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Statut</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <p className="font-medium">{order.name}</p>
                            <p className="text-sm text-gray-500">{order.email}</p>
                          </td>
                          <td className="px-6 py-4">{order.phone}</td>
                          <td className="px-6 py-4 max-w-[200px] truncate">{order.address}</td>
                          <td className="px-6 py-4 max-w-[250px] truncate">{order.items}</td>
                          <td className="px-6 py-4 font-bold text-primary">{order.total}</td>
                          <td className="px-6 py-4">
                            <Badge className={getStatusBadgeClass(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => { setEditingOrder(order); setNewOrderStatus(order.status as ReservationStatus); }}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => setDeletingOrder(order)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {orders.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucune commande recue</p>
              </div>
            )}

            {editingOrder && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="bg-white rounded-2xl w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Modifier le statut de la commande</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Client: {editingOrder.name}</Label>
                      </div>
                      <div>
                        <Label>Statut</Label>
                        <select
                          value={newOrderStatus}
                          onChange={e => setNewOrderStatus(e.target.value as ReservationStatus)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                        >
                          <option value="en attente">En attente</option>
                          <option value="en cours">En cours</option>
                          <option value="termine">Termine</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button onClick={handleUpdateOrderStatus} className="bg-primary">Enregistrer</Button>
                      <Button variant="outline" onClick={() => setEditingOrder(null)}>Annuler</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {delitingOrder && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="bg-white rounded-2xl w-full max-w-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                      Confirmer la suppression
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Etes-vous sur de vouloir supprimer la commande de <strong>{deletingOrder.name}</strong>?
                    </p>
                    <div className="flex gap-3">
                      <Button onClick={handleDeleteOrder} className="bg-red-600 hover:bg-red-700">Supprimer</Button>
                      <Button variant="outline" onClick={() => setDeletingOrder(null)}>Annuler</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Reservations */}
        {currentPage === 'reservations' && (
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Gestion des Reservations</h1>
            
            <Card className="bg-white rounded-2xl shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Client</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Heure</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Personnes</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Statut</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {reservations.map(reservation => (
                        <tr key={reservation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <p className="font-medium">{reservation.name}</p>
                            <p className="text-sm text-gray-500">{reservation.email}</p>
                            <p className="text-sm text-gray-500">{reservation.phone}</p>
                          </td>
                          <td className="px-6 py-4">{reservation.date}</td>
                          <td className="px-6 py-4">{reservation.time}</td>
                          <td className="px-6 py-4">{reservation.guests} personnes</td>
                          <td className="px-6 py-4">
                            <Badge className={getStatusBadgeClass(reservation.status)}>
                              {getStatusText(reservation.status)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => { setEditingReservation(reservation); setNewReservationStatus(reservation.status as ReservationStatus); }}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => setDeletingReservation(reservation)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {editingReservation && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="bg-white rounded-2xl w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Modifier le statut</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Statut</Label>
                        <select
                          value={newReservationStatus}
                          onChange={e => setNewReservationStatus(e.target.value as ReservationStatus)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                        >
                          <option value="en attente">En attente</option>
                          <option value="en cours">En cours</option>
                          <option value="termine">Termine</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button onClick={handleUpdateReservationStatus} className="bg-primary">Enregistrer</Button>
                      <Button variant="outline" onClick={() => setEditingReservation(null)}>Annuler</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {deletingReservation && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="bg-white rounded-2xl w-full max-w-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                      Confirmer la suppression
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Etes-vous sur de vouloir supprimer la reservation de <strong>{deletingReservation.name}</strong>?
                    </p>
                    <div className="flex gap-3">
                      <Button onClick={handleDeleteReservation} className="bg-red-600 hover:bg-red-700">Supprimer</Button>
                      <Button variant="outline" onClick={() => setDeletingReservation(null)}>Annuler</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Reviews */}
        {currentPage === 'reviews' && (
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Gestion des Avis</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pending Reviews */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-orange-500" />
                  Avis en attente de validation
                </h2>
                <div className="space-y-4">
                  {reviews.filter(r => !r.approved).map(review => (
                    <Card key={review.id} className="bg-white rounded-2xl shadow-sm border-l-4 border-l-orange-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="font-bold text-primary">{review.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <div>
                              <p className="font-bold">{review.name}</p>
                              <p className="text-xs text-gray-500">{new Date(review.created_at || '').toLocaleDateString('fr-FR')}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{review.comment}</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveReview(review.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approuver
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteReview(review.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {reviews.filter(r => !r.approved).length === 0 && (
                    <p className="text-gray-500 text-center py-8">Aucun avis en attente</p>
                  )}
                </div>
              </div>

              {/* Approved Reviews */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Avis approuves
                </h2>
                <div className="space-y-4">
                  {reviews.filter(r => r.approved).map(review => (
                    <Card key={review.id} className="bg-white rounded-2xl shadow-sm border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="font-bold text-primary">{review.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <div>
                              <p className="font-bold">{review.name}</p>
                              <p className="text-xs text-gray-500">{new Date(review.created_at || '').toLocaleDateString('fr-FR')}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{review.comment}</p>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteReview(review.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {reviews.filter(r => r.approved).length === 0 && (
                    <p className="text-gray-500 text-center py-8">Aucun avis approuve</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contacts */}
        {currentPage === 'contacts' && (
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Messages Reus</h1>
            
            <div className="space-y-4">
              {contacts.map(contact => (
                <Card key={contact.id} className={`bg-white rounded-2xl shadow-sm ${!contact.read ? 'border-l-4 border-l-primary' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-lg">{contact.name}</h3>
                          {!contact.read && <Badge className="bg-primary">Non lu</Badge>}
                        </div>
                        <p className="text-sm text-gray-500">{contact.email} - {contact.phone}</p>
                        <p className="text-xs text-gray-400">{new Date(contact.created_at || '').toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div className="flex gap-2">
                        {!contact.read && (
                          <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(contact.id)}>
                            <Eye className="w-4 h-4 mr-1" />
                            Marquer lu
                          </Button>
                        )}
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteContact(contact.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">{contact.message}</p>
                  </CardContent>
                </Card>
              ))}

              {contacts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun message recu</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
