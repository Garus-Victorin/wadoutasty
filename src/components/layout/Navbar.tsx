import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', value: 'accueil' },
    { label: 'Menu', value: 'menu' },
    { label: 'Commander', value: 'order' },
    { label: 'Reservation', value: 'reservation' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-md" 
          : "bg-transparent",
        isScrolled ? "text-foreground" : "text-foreground"
      )}
    >
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => onPageChange('accueil')}
      >
        <div className="p-2 rounded-lg transition-transform group-hover:rotate-12 bg-primary">
          <UtensilsCrossed className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg sm:text-xl font-display font-bold leading-none tracking-tight">WADOU Tasty</span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium opacity-80">Saveurs du Benin</span>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-8">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onPageChange(item.value)}
            className={cn(
              "text-sm font-medium transition-colors relative py-1 whitespace-nowrap",
              currentPage === item.value ? "text-primary" : "hover:text-primary"
            )}
          >
            {item.label}
            {currentPage === item.value && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
            )}
          </button>
        ))}
        <Button 
          variant="default"
          onClick={() => onPageChange('order')}
          className="ml-2 sm:ml-4 px-4 sm:px-6 font-semibold flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          Commander
        </Button>
      </div>

      {/* Mobile Nav Toggle */}
      <button 
        className="lg:hidden p-2 transition-colors rounded-full hover:bg-primary/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 sm:top-20 z-40 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 animate-fade-in shadow-2xl overflow-y-auto bg-background">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onPageChange(item.value);
                setIsOpen(false);
              }}
              className={cn(
                "text-xl sm:text-2xl font-display font-bold text-left py-3 border-b border-border",
                currentPage === item.value ? "text-primary" : "text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
          <Button 
            className="w-full mt-4 text-lg h-14 flex items-center justify-center gap-2"
            onClick={() => {
              onPageChange('order');
              setIsOpen(false);
            }}
          >
            <ShoppingBag className="w-5 h-5" />
            Commander maintenant
          </Button>
          <div className="mt-auto pb-8 sm:pb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="flex flex-col gap-1">
               <span className="text-xs uppercase tracking-widest text-muted-foreground">
                 Appelez-nous
               </span>
               <a href="tel:+22966620716" className="font-bold flex items-center gap-2 text-foreground">
                 <Phone className="w-4 h-4 text-primary" /> +229 66620716
               </a>
             </div>
             <div className="flex flex-col gap-1">
               <span className="text-xs uppercase tracking-widest text-muted-foreground">
                 Adresse
               </span>
               <span className="font-bold flex items-start gap-2 leading-tight text-foreground">
                 <MapPin className="w-4 h-4 shrink-0 text-primary" /> 
                 RNIE1, Agblangandan
               </span>
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};
