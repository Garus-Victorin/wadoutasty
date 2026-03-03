import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Utensils, Star, Info, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getMenuItems, MenuItem } from '@/lib/database';

interface MenuPageProps {
  onPageChange?: (page: string, item?: MenuItem) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onPageChange }) => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    setLoading(true);
    const items = await getMenuItems();
    setMenuItems(items);
    setLoading(false);
  };

  const handleOrder = (item: MenuItem) => {
    if (onPageChange) {
      onPageChange('order', item);
    }
  };

  const categories = ['Tous', ...Array.from(new Set(menuItems.map(item => item.category)))];
  
  const filteredItems = activeCategory === 'Tous' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-24 px-6 lg:px-12 bg-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20"
            alt="Menu Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 to-foreground" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary">Saveurs Beninoises</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mt-4">
              Notre <span className="italic text-primary">Menu</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
              Une selection rigoureuse de plats traditionnels prepares avec des ingredients frais et des epices locales pour une experience authentique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border py-6 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                activeCategory === cat 
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105' 
                  : 'bg-white border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="group bg-white rounded-[32px] overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 py-1.5 px-4 bg-white/90 backdrop-blur-md rounded-full text-sm font-bold text-primary shadow-lg">
                      {item.price}
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">{item.category}</span>
                      <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                        <span className="text-xs font-bold">4.9</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-border" />
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Utensils className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium italic">Fait maison</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4 h-12 rounded-xl font-bold group"
                      onClick={() => handleOrder(item)}
                    >
                      Commander <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-6 opacity-50">
              <Utensils className="w-16 h-16" />
              <p className="text-xl font-display font-bold">Aucun plat dans cette categorie pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 px-6 lg:px-12 bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 text-center md:text-left">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Info className="w-8 h-8 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-display font-bold">Allergies ou Regime Speciaux ?</h4>
              <p className="text-sm text-muted-foreground">N'hesitez pas a en informer notre personnel lors de votre commande.</p>
            </div>
          </div>
          <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-primary/20 hover:bg-primary/10">
            Telcharger le Menu PDF
          </Button>
        </div>
      </section>
    </div>
  );
};
