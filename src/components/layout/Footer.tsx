import React from 'react';
import { UtensilsCrossed, Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-20 px-6 lg:px-12 border-t border-background/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 group">
            <div className="p-2 bg-primary rounded-lg transition-transform group-hover:rotate-12">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold leading-none tracking-tight">WADOU Tasty</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-80">Saveurs du Benin</span>
            </div>
          </div>
          <p className="text-background/70 text-sm leading-relaxed max-w-xs">
            Decouvrez l'authenticite de la cuisine beninoise chez WADOU Tasty. 
            Des recettes ancestrales revisittees avec passion pour un voyage culinaire inoubliable.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="p-2 bg-background/5 rounded-full hover:bg-primary transition-colors hover:text-white border border-background/10">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-background/5 rounded-full hover:bg-primary transition-colors hover:text-white border border-background/10">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-background/5 rounded-full hover:bg-primary transition-colors hover:text-white border border-background/10">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-8">
          <h3 className="text-lg font-display font-bold uppercase tracking-wider text-primary">Liens Rapides</h3>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" /> Accueil</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" /> Notre Menu</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" /> Reservations</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" /> Nous Contacter</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-8">
          <h3 className="text-lg font-display font-bold uppercase tracking-wider text-primary">Nous Contacter</h3>
          <ul className="flex flex-col gap-5">
            <li className="flex items-start gap-4">
              <div className="p-2 bg-background/5 rounded-lg border border-background/10">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest text-background/50">Adresse</span>
                <span className="text-sm font-medium leading-relaxed">RNIE1, Agblangandan, Benin</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 bg-background/5 rounded-lg border border-background/10">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest text-background/50">Telephone</span>
                <a href="tel:+22966620716" className="text-sm font-medium hover:text-primary transition-colors">+229 66620716</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 bg-background/5 rounded-lg border border-background/10">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest text-background/50">Email</span>
                <a href="mailto:contact@wadoutasty.bj" className="text-sm font-medium hover:text-primary transition-colors">contact@wadoutasty.bj</a>
              </div>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs text-background/40 font-medium">
          &copy; {currentYear} WADOU Tasty BENIN. Tous droits reserves.
        </p>
        <div className="flex items-center gap-8 text-xs text-background/40 font-medium">
          <a href="#" className="hover:text-primary transition-colors">Politique de Confidentialite</a>
          <a href="#" className="hover:text-primary transition-colors">ADH Digital</a>
        </div>
      </div>
    </footer>
  );
};
