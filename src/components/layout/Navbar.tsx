import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, UtensilsCrossed } from 'lucide-react';
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
    { label: 'Réservation', value: 'reservation' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12 h-20 flex items-center justify-between",
      isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent text-white"
    )}>
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => onPageChange('accueil')}
      >
        <div className="p-2 bg-primary rounded-lg transition-transform group-hover:rotate-12">
          <UtensilsCrossed className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-display font-bold leading-none tracking-tight">WADOU Tasty</span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-80">Saveurs du Bénin</span>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onPageChange(item.value)}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative py-1",
              currentPage === item.value ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary" : (isScrolled ? "text-foreground" : "text-white")
            )}
          >
            {item.label}
          </button>
        ))}
        <Button 
          variant="default"
          onClick={() => onPageChange('reservation')}
          className="ml-4 px-6 font-semibold"
        >
          Réserver
        </Button>
      </div>

      {/* Mobile Nav Toggle */}
      <button 
        className="lg:hidden p-2 transition-colors hover:bg-black/10 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-background z-40 p-6 flex flex-col gap-6 animate-fade-in shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onPageChange(item.value);
                setIsOpen(false);
              }}
              className={cn(
                "text-2xl font-display font-bold text-left py-2 border-b border-border/10",
                currentPage === item.value ? "text-primary" : "text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
          <Button 
            className="w-full mt-4 text-lg h-14"
            onClick={() => {
              onPageChange('reservation');
              setIsOpen(false);
            }}
          >
            Réserver maintenant
          </Button>
          <div className="mt-auto pb-12 grid grid-cols-2 gap-4">
             <div className="flex flex-col gap-1">
               <span className="text-xs uppercase tracking-widest text-muted-foreground">Appelez-nous</span>
               <a href="tel:+22966620716" className="font-bold flex items-center gap-2">
                 <Phone className="w-4 h-4 text-primary" /> +229 66620716
               </a>
             </div>
             <div className="flex flex-col gap-1">
               <span className="text-xs uppercase tracking-widest text-muted-foreground">Adresse</span>
               <span className="font-bold flex items-start gap-2 leading-tight">
                 <MapPin className="w-4 h-4 text-primary shrink-0" /> RNIE1, Agblangandan
               </span>
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};
