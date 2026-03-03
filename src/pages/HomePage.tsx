import React, { useState, useEffect } from 'react';
import { Utensils, Clock, MapPin, Star, ArrowRight, Phone, Instagram, Facebook, UtensilsCrossed, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useOpeningStatus } from '@/hooks/useOpeningHours';
import { ReviewForm } from '@/components/ReviewForm';
import { getApprovedReviews, Review } from '@/lib/database';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
}

// Static featured items data (replaces blink.db call)
const featuredItems: MenuItem[] = [
  {
    id: '1',
    name: 'Amiwo au Poulet',
    description: 'Le classique du Benin. Pommes de terre grillees accompagnees de sauce tomate epicee et poulet roti.',
    price: '4.500 XOF',
    category: 'Signature',
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Wagassi Grille',
    description: 'Fromage deinggue traditionnellement grille, accompagne de Sauce Arachide et de pikliz.',
    price: '3.500 XOF',
    category: 'Signature',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Foutou Banane',
    description: 'Puree de bananes plantains pilee, servie avec sauce graine et viande de boeuf.',
    price: '5.000 XOF',
    category: ' Traditionnel',
    image_url: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=800&auto=format&fit=crop'
  }
];

export const HomePage: React.FC<{ onPageChange: (page: string) => void }> = ({ onPageChange }) => {
  const { status, isOpen, nextOpenTime } = useOpeningStatus();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Load reviews
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoadingReviews(true);
    const data = await getApprovedReviews();
    setReviews(data);
    if (data.length > 0) {
      const total = data.reduce((acc, review) => acc + review.rating, 0);
      setAverageRating((total / data.length).toFixed(1) as any);
    }
    setLoadingReviews(false);
  };
  
  const stats = [
    { label: 'Plats Authentiques', value: '50+' },
    { label: 'Clients Heureux', value: '10k+' },
    { label: "Ans d'Experience", value: '15+' },
    { label: 'Epices Secretes', value: '25+' },
  ];

  const getStatusColor = () => {
    switch (status) {
      case 'Ouvert':
        return 'text-green-500';
      case 'Fermé':
        return 'text-red-500';
      case 'Ouvre bientot':
        return 'text-yellow-500';
      case 'Ferme bientot':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBgColor = () => {
    switch (status) {
      case 'Ouvert':
        return 'bg-green-500/10 border-green-500/20';
      case 'Ferme':
        return 'bg-red-500/10 border-red-500/20';
      case 'Ouvre bientot':
        return 'bg-yellow-500/10 border-yellow-500/20';
      case 'Ferme bientot':
        return 'bg-orange-500/10 border-orange-500/20';
      default:
        return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop" 
            alt="Authentic Beninese Cuisine" 
            className="w-full h-full object-cover scale-105 animate-[pulse_8s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/20 z-0" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col items-start gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 py-2 px-4 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30 self-start">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Le Gout de l'Excellence</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.9] max-w-3xl drop-shadow-2xl">
              Authentique <br />
              <span className="text-primary italic">Saveurs</span> du Benin
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed font-medium">
              Decouvrez l'art de la cuisine beninoise traditionnelle. Des ingredients frais, des epices rares et une passion infinie dans chaque assiette.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 w-full"
          >
            <Button 
              size="lg" 
              className="h-16 px-10 text-lg font-bold shadow-2xl hover:scale-105 transition-transform group"
              onClick={() => onPageChange('menu')}
            >
              Explorer le Menu <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-16 px-10 text-lg font-bold border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all"
              onClick={() => onPageChange('reservation')}
            >
              Reserver une Table
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="hidden lg:grid grid-cols-4 gap-12 mt-20 pt-12 border-t border-white/20 w-full max-w-4xl"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl font-display font-bold text-white leading-none">{stat.value}</span>
                <span className="text-xs uppercase tracking-widest text-white/50 mt-2 font-bold">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-primary to-transparent opacity-50" />
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 lg:px-12 bg-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-3xl -z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-3xl -z-10 group-hover:scale-110 transition-transform" />
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop" 
              alt="Notre Ambiance" 
              className="w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl relative z-10"
            />
            <div className="absolute bottom-8 right-8 z-20 bg-white p-6 rounded-2xl shadow-2xl border border-border/50 max-w-[240px]">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <Star className="w-4 h-4 text-primary fill-primary" />
                <Star className="w-4 h-4 text-primary fill-primary" />
                <Star className="w-4 h-4 text-primary fill-primary" />
                <Star className="w-4 h-4 text-primary fill-primary" />
              </div>
              <p className="text-xs font-medium italic text-foreground/80 leading-relaxed">
                "Une explosion de saveurs beninoises. Le meilleur Wagassi grille de la region !"
              </p>
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">JD</div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Jean-Daniel T.</span>
                  <span className="text-[8px] text-muted-foreground uppercase tracking-widest">Client Fidele</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Notre Histoire</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
                Une Passion pour la <span className="italic text-primary">Tradition</span> et la Qualite
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fonde a Agblangandan avec la vision de celebrer le patrimoine culinaire du Benin, WADOU Tasty est devenu une reference pour les amateurs de cuisine authentique. 
              Chaque plat raconte une histoire, celle de nos meres et de nos ancetres, prepare avec les meilleurs produits de nos terroir.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-secondary rounded-2xl border border-primary/10">
                <Utensils className="w-8 h-8 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <h4 className="font-display font-bold text-lg">Cuisine Locale</h4>
                  <p className="text-sm text-muted-foreground">Recettes ancestrales authentiques du sud au nord du Benin.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-accent/5 rounded-2xl border border-accent/10">
                <Clock className="w-8 h-8 text-accent shrink-0" />
                <div className="flex flex-col gap-1">
                  <h4 className="font-display font-bold text-lg">Ambiance Unique</h4>
                  <p className="text-sm text-muted-foreground">Un cadre chaleureux et convivial pour tous vos moments.</p>
                </div>
              </div>
            </div>

            <Button 
              variant="link" 
              className="text-primary font-bold text-lg p-0 h-auto self-start group"
              onClick={() => onPageChange('contact')}
            >
              En savoir plus sur nous <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section className="py-24 px-6 lg:px-12 bg-secondary/50">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Selection du Chef</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
                Nos Plats <span className="italic text-primary">Signatures</span>
              </h2>
            </div>
            <Button 
              onClick={() => onPageChange('menu')}
              className="px-8 h-14 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Voir Tout le Menu
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden rounded-3xl border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-white/10 backdrop-blur-md px-3 py-1 rounded-full self-start border border-white/20">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white">{item.name}</h3>
                    <p className="text-sm text-white/70 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl font-bold text-primary">{item.price}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-white hover:text-primary p-0 h-auto font-bold opacity-0 group-hover:opacity-100 transition-opacity delay-200"
                      >
                        Commander <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Temoignages - Avis clients */}
      <section className="py-24 px-6 lg:px-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-4">
              Nos <span className="italic text-primary">Temoignages</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Decouvrez ce que nos clients disent de leur experience chez WADOU Tasty
            </p>
          </div>

          {/* Stats - Moyenne des notes */}
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="flex items-center gap-4">
              <div className="text-6xl font-display font-bold text-primary">{averageRating}</div>
              <div className="flex flex-col">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{reviews.length} avis</span>
              </div>
            </div>
          </div>

          {/* Liste des avis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {loadingReviews ? (
              <div className="col-span-2 text-center py-12">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                <p className="text-muted-foreground mt-4">Chargement des avis...</p>
              </div>
            ) : reviews.length > 0 ? (
              reviews.slice(0, 4).map((review) => (
                <Card key={review.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <Quote className="w-8 h-8 text-primary/10 mb-4" />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {review.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-foreground">{review.name}</h4>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {review.comment}
                      </p>
                      {review.created_at && (
                        <p className="text-xs text-muted-foreground mt-4">
                          {new Date(review.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 bg-white rounded-2xl shadow-lg">
                <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Aucun avis pour le moment. Soyez le premier a donner votre avis!
                </p>
              </div>
            )}
          </div>

          {/* Formulaire d'avis */}
          <div className="max-w-md mx-auto">
            {showReviewForm ? (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <ReviewForm onSuccess={() => {
                  loadReviews();
                  setShowReviewForm(false);
                }} />
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => setShowReviewForm(false)}
                >
                  Annuler
                </Button>
              </div>
            ) : (
              <Button 
                size="lg"
                className="h-14 px-8 rounded-xl font-bold"
                onClick={() => setShowReviewForm(true)}
              >
                <Star className="w-5 h-5 mr-2" />
                Laissez votre avis
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Info & Map Section */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col gap-10 bg-secondary/30 p-12 rounded-[40px] border border-primary/5">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Informations Pratiques</span>
              <h2 className="text-4xl font-display font-bold text-foreground leading-tight">
                Nous sommes <span className="italic text-primary">faciles</span> a trouver
              </h2>
            </div>

            {/* Opening Status - Dynamic */}
            <div className={`flex items-center justify-between `}>
              <div className="flex items-center gap-3">

                <span className="font-bold text-lg">Nos horaires d'ouverture</span>
              </div>
              <span className={`font-bold text-lg p-2 rounded-lg border ${getStatusBgColor()}  ${getStatusColor()}`}>
                {status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                  <MapPin className="w-4 h-4" /> Notre Adresse
                </div>
                <p className="text-lg font-display font-bold leading-snug">
                  RNIE1, Agblangandan <br />
                  Benin (Route de Porto-Novo)
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                  <Phone className="w-4 h-4" /> Telephone
                </div>
                <a href="tel:+22966620716" className="text-lg font-display font-bold hover:text-primary transition-colors">
                  +229 66620716
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                  <Clock className="w-4 h-4" /> Horaires d'Ouverture
                </div>
                <div className="flex flex-col">
                   <span className="font-bold">Lun-Jeu: 10:00 - 12:00</span>
                   <span className="font-bold">Ven-Sam: 10:00 - 12:00</span>
                   <span className="font-bold">Dimanche: 12:00 - 12:00</span>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-6 pt-10 border-t border-primary/10">
              <p className="text-muted-foreground font-medium italic">
                "Pret pour une explosion de saveurs ? Appelez-nous pour commander ou reservez votre table en ligne des maintenant."
              </p>
              <div className="flex items-center gap-4">
                <Button 
                   size="lg" 
                   className="h-14 px-8 rounded-xl font-bold flex-1 sm:flex-none"
                   onClick={() => onPageChange('reservation')}
                >
                  Reserver en Ligne
                </Button>
                <Button 
                   size="lg" 
                   variant="outline" 
                   className="h-14 px-8 rounded-xl font-bold border-primary/20 hover:bg-primary/5 flex-1 sm:flex-none"
                   asChild
                >
                  <a href="tel:+22966620716">Nous Appeler</a>
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white h-[600px] lg:h-auto">
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

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto bg-primary rounded-[50px] p-12 lg:p-20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="relative z-10 flex flex-col items-center text-center gap-8">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white max-w-3xl leading-[1.1]">
              Rejoignez-nous pour un festin <span className="text-foreground italic underline underline-offset-8 decoration-accent/40">inoubliable</span>.
            </h2>
            <p className="text-xl text-white/90 max-w-xl font-medium">
              Vivez le Benin authentique a travers sa gastronomie riche et genereuse. 
              Votre table vous attend.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="h-16 px-12 text-lg font-bold rounded-2xl shadow-2xl hover:bg-white hover:scale-105 transition-all"
              onClick={() => onPageChange('reservation')}
            >
              Reserver Maintenant <ChevronRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>
      
    </div>
  );
};
