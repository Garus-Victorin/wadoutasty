import React, { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { addContact } from '@/lib/database';

export const ContactPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      // Save contact to Supabase
      await addContact({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string || '',
        message: formData.get('message') as string,
      });
      
      toast.success('Message envoyé ! Nous vous répondrons dès que possible.');
      form.reset();
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-24 px-6 lg:px-12 bg-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20"
            alt="Contact Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 to-foreground" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary">Nous Contacter</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mt-4">
              Dites-nous <span className="italic text-primary">Bonjour</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
              Une question, une suggestion ou un événement spécial à organiser ? 
              Notre équipe est à votre écoute pour faire de chaque moment une réussite.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Contact Details */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl font-display font-bold">Nos <span className="text-primary italic">Coordonnées</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                N'hésitez pas à nous joindre par le moyen qui vous convient le mieux. 
                Nous sommes ravis d'échanger avec nos clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4 p-8 bg-white rounded-[32px] border border-border/50 shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Phone className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Téléphone</span>
                  <a href="tel:+22966620716" className="text-xl font-display font-bold">+229 66620716</a>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-8 bg-white rounded-[32px] border border-border/50 shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Mail className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</span>
                  <a href="mailto:contact@wadoutasty.bj" className="text-xl font-display font-bold break-all">contact@wadoutasty.bj</a>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-8 bg-white rounded-[32px] border border-border/50 shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all group md:col-span-2">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Localisation</span>
                  <p className="text-xl font-display font-bold">RNIE1, Agblangandan, Benin (Route de Porto-Novo)</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Suivez-nous</span>
              <div className="flex items-center gap-4">
                <a href="#" className="p-4 bg-white rounded-2xl border border-border/50 shadow-md hover:bg-primary hover:text-white transition-all">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="p-4 bg-white rounded-2xl border border-border/50 shadow-md hover:bg-primary hover:text-white transition-all">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="p-4 bg-white rounded-2xl border border-border/50 shadow-md hover:bg-primary hover:text-white transition-all">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-2xl border border-border/50">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest ml-1">Nom</Label>
                  <Input 
                    id="name" 
                    name="name"
                    required 
                    placeholder="Votre nom" 
                    className="h-14 bg-muted/30 border-border/50 rounded-xl focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest ml-1">Téléphone</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel"
                    placeholder="+229 ..." 
                    className="h-14 bg-muted/30 border-border/50 rounded-xl focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest ml-1">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  required 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="h-14 bg-muted/30 border-border/50 rounded-xl focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest ml-1">Message</Label>
                <Textarea 
                  id="message" 
                  name="message"
                  required 
                  placeholder="Comment pouvons-nous vous aider ?" 
                  className="min-h-[150px] bg-muted/30 border-border/50 rounded-xl focus:ring-primary resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 group"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le Message'}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-6 lg:px-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <UtensilsCrossed className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-display font-bold">Contactez-nous</h2>
          </div>
          <div className="rounded-[48px] overflow-hidden shadow-2xl border-8 border-white h-[500px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.881476906233!2d2.522295975841022!3d6.409308023773199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103cab9137398a03%3A0xb4d06caf574c7e08!2sWADOU%20Tasty%20BENIN!5e0!3m2!1sfr!2sbj!4v1709395200000!5m2!1sfr!2sbj" 
              className="w-full h-full border-0 grayscale-[0.2] contrast-[1.1]"
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
