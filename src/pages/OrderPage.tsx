import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ChevronRight, Loader2, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { addOrder, MenuItem } from '@/lib/database';

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

interface OrderPageProps {
  initialItem?: MenuItem | null;
}

export const OrderPage: React.FC<OrderPageProps> = ({ initialItem }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialRequests: '',
  });

  // Add initial item if provided
  useEffect(() => {
    if (initialItem) {
      const existing = orderItems.find(o => o.menuItem.id === initialItem.id);
      if (existing) {
        setOrderItems(orderItems.map(o => 
          o.menuItem.id === initialItem.id ? { ...o, quantity: o.quantity + 1 } : o
        ));
      } else {
        setOrderItems([{ menuItem: initialItem, quantity: 1 }]);
      }
      toast.success(`${initialItem.name} ajouté au panier!`);
    }
  }, []);

  const removeFromOrder = (itemId: string) => {
    setOrderItems(orderItems.filter(o => o.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setOrderItems(orderItems.map(o => {
      if (o.menuItem.id === itemId) {
        const newQty = o.quantity + delta;
        return newQty > 0 ? { ...o, quantity: newQty } : o;
      }
      return o;
    }).filter(o => o.quantity > 0));
  };

  const totalPrice = orderItems.reduce((sum, item) => {
    const price = parseFloat(item.menuItem.price.replace(/[^0-9]/g, ''));
    return sum + (price * item.quantity);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      toast.error('Veuillez ajouter des plats à votre commande');
      return;
    }

    setSubmitting(true);
    
    try {
      const itemsDescription = orderItems.map(item => 
        `${item.quantity}x ${item.menuItem.name}`
      ).join(', ');

      await addOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        items: itemsDescription,
        total: totalPrice.toString() + ' XOF',
        special_requests: formData.specialRequests,
      });
      
      setSuccess(true);
      toast.success('Commande envoyée avec succès!');
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="pt-20 min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[40px] p-12 text-center shadow-2xl border border-primary/10 flex flex-col items-center gap-8"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-display font-bold">Commande Confirmée!</h2>
            <p className="text-muted-foreground leading-relaxed">
              Merci pour votre commande. Notre équipe va la préparer et vous contactera pour la livraison.
            </p>
          </div>
          <div className="w-full p-6 bg-secondary/50 rounded-2xl flex flex-col gap-3 text-sm font-medium">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total</span>
              <span className="text-xl font-bold text-primary">{totalPrice.toLocaleString()} XOF</span>
            </div>
          </div>
          <Button 
            className="w-full h-14 rounded-xl font-bold"
            onClick={() => window.location.reload()}
          >
            Retourner au site
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20"
            alt="Order Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 to-foreground" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary">Livraison à Domicile</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mt-4">
              Passer une <span className="italic text-primary">Commande</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto mt-6 text-base sm:text-lg leading-relaxed">
              Commandez vos plats préférés et recevez-les directement chez vous.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white rounded-2xl shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span>Votre Commande</span>
                <span className="text-sm font-normal text-muted-foreground">({orderItems.length} plats)</span>
              </h3>

              {/* Order Items */}
              <div className="space-y-3 mb-6 max-h-[250px] overflow-y-auto">
                {orderItems.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Votre panier est vide
                  </p>
                ) : (
                  orderItems.map((item) => (
                    <div key={item.menuItem.id} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
                      <img 
                        src={item.menuItem.image_url} 
                        alt={item.menuItem.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.menuItem.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.menuItem.price} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.menuItem.id, -1)}
                          className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.menuItem.id, 1)}
                          className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => removeFromOrder(item.menuItem.id)}
                          className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 ml-2"
                        >
                          <Trash2 className="w-3 h-3 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{totalPrice.toLocaleString()} XOF</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="orderName" className="text-xs font-bold uppercase tracking-widest ml-1">Nom Complet</Label>
                  <Input 
                    id="orderName" 
                    required 
                    placeholder="Votre nom"
                    className="mt-1"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="orderPhone" className="text-xs font-bold uppercase tracking-widest ml-1">Téléphone</Label>
                  <Input 
                    id="orderPhone" 
                    required 
                    type="tel"
                    placeholder="+229 ..."
                    className="mt-1"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="orderEmail" className="text-xs font-bold uppercase tracking-widest ml-1">Email</Label>
                  <Input 
                    id="orderEmail" 
                    required 
                    type="email"
                    placeholder="votre@email.com"
                    className="mt-1"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="orderAddress" className="text-xs font-bold uppercase tracking-widest ml-1">Adresse de livraison</Label>
                  <Input 
                    id="orderAddress" 
                    required 
                    placeholder="Votre adresse complète"
                    className="mt-1"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="orderNotes" className="text-xs font-bold uppercase tracking-widest ml-1">Notes (optionnel)</Label>
                  <Textarea 
                    id="orderNotes" 
                    placeholder="Instructions spéciales..."
                    className="mt-1"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={submitting || orderItems.length === 0}
                  className="w-full h-12 sm:h-14 rounded-xl font-bold"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    <>
                      Confirmer la Commande
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
