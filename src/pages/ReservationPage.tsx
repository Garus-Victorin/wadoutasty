import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, Clock, Users, Phone, Mail, User, CheckCircle2, ChevronRight, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { addReservation } from '@/lib/database';

export const ReservationPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    
    try {
      // Save reservation to Supabase
      await addReservation({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        special_requests: formData.specialRequests,
      });
      
      setSuccess(true);
      toast.success('Votre demande de réservation a été envoyée !');
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
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
            <h2 className="text-3xl font-display font-bold">Demande Envoyée !</h2>
            <p className="text-muted-foreground leading-relaxed">
              Merci pour votre confiance. Notre équipe va examiner votre demande et vous contactera par téléphone ou email pour confirmer votre table.
            </p>
          </div>
          <div className="w-full p-6 bg-secondary/50 rounded-2xl flex flex-col gap-3 text-sm font-medium">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Date</span>
              <span>{formData.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Heure</span>
              <span>{formData.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Personnes</span>
              <span>{formData.guests}</span>
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
      <section className="relative py-24 px-6 lg:px-12 bg-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550966842-2862ba996344?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20"
            alt="Reservation Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 to-foreground" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary">Réservez Votre Table</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mt-4">
              Vivez l'Instant <span className="italic text-primary">WADOU</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto mt-6 text-lg leading-relaxed font-medium">
              Assurez-vous d'avoir la meilleure place pour déguster nos spécialités. 
              Réservation recommandée pour les soirées du week-end.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Reservation Info */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl font-display font-bold">Pourquoi <span className="text-primary italic">Réserver</span> ?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Afin de vous garantir un service irréprochable et une expérience culinaire sans attente, nous vous suggérons de réserver votre table à l'avance.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Star className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xl font-display font-bold">Table Privilégiée</h4>
                  <p className="text-sm text-muted-foreground">Bénéficiez des meilleurs emplacements, que ce soit en intérieur ou en terrasse.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Clock className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xl font-display font-bold">Zéro Attente</h4>
                  <p className="text-sm text-muted-foreground">Votre table est prête dès votre arrivée pour un confort optimal.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Users className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xl font-display font-bold">Événements</h4>
                  <p className="text-sm text-muted-foreground">Pour les groupes de plus de 10 personnes, contactez-nous directement.</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-secondary rounded-[32px] border border-primary/5 flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Besoin d'aide ?</span>
              <div className="flex flex-col gap-4">
                <a href="tel:+22966620716" className="flex items-center gap-4 text-xl font-display font-bold hover:text-primary transition-colors">
                  <Phone className="w-6 h-6 text-primary" /> +229 66620716
                </a>
                <a href="mailto:reservation@wadoutasty.bj" className="flex items-center gap-4 text-lg font-bold text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-6 h-6 text-primary" /> reservation@wadoutasty.bj
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-[48px] p-8 md:p-12 shadow-2xl border border-border/50 relative overflow-hidden">
            {/* Form Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Nom Complet</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                    <Input 
                      id="name" 
                      required 
                      placeholder="Votre nom" 
                      className="pl-12 h-14 bg-muted/30 border-border/50 rounded-xl focus:ring-primary focus:border-primary"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                    <Input 
                      id="phone" 
                      required 
                      type="tel" 
                      placeholder="+229 ..." 
                      className="pl-12 h-14 bg-muted/30 border-border/50 rounded-xl focus:ring-primary focus:border-primary"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <Input 
                    id="email" 
                    required 
                    type="email" 
                    placeholder="votre@email.com" 
                    className="pl-12 h-14 bg-muted/30 border-border/50 rounded-xl focus:ring-primary focus:border-primary"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                    <Input 
                      id="date" 
                      required 
                      type="date" 
                      className="pl-12 h-14 bg-muted/30 border-border/50 rounded-xl focus:ring-primary focus:border-primary"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="time" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Heure</Label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                    <Input 
                      id="time" 
                      required 
                      type="time" 
                      className="pl-12 h-14 bg-muted/30 border-border/50 rounded-xl focus:ring-primary focus:border-primary"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="guests" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Personnes</Label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                    <Input 
                      id="guests" 
                      required 
                      type="number" 
                      min="1" 
                      max="20" 
                      className="pl-12 h-14 bg-muted/30 border-border/50 rounded-xl focus:ring-primary focus:border-primary"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="specialRequests" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Demandes Spéciales (Optionnel)</Label>
                <textarea 
                  id="specialRequests"
                  placeholder="Allergies, événements spéciaux, préférences..." 
                  className="w-full h-24 p-4 bg-muted/30 border border-border/50 rounded-xl focus:ring-primary focus:border-primary resize-none"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 mt-4 group"
              >
                {loading ? 'Envoi en cours...' : 'Confirmer la Réservation'}
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-center text-xs text-muted-foreground mt-2 italic">
                * Nous vous recontacterons dans les 15 minutes pour confirmer votre réservation.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
