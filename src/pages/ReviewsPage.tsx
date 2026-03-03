import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { ReviewForm } from '@/components/ReviewForm';
import { getApprovedReviews, Review } from '@/lib/database';

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    const data = await getApprovedReviews();
    setReviews(data);
    
    // Calculate average rating
    if (data.length > 0) {
      const total = data.reduce((acc, review) => acc + review.rating, 0);
      setAverageRating((total / data.length).toFixed(1) as any);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Avis de nos <span className="text-primary italic">clients</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Decouvrez ce que nos clients disent de leur experience chez WADOU Tasty
          </p>
        </div>

        {/* Stats */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Reviews List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Avis recents
            </h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                <p className="text-muted-foreground mt-4">Chargement des avis...</p>
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl shadow-lg p-6 relative"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                  
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
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Aucun avis pour le moment. Soyez le premier a donner votre avis!
                </p>
              </div>
            )}
          </div>

          {/* Review Form */}
          <div className="lg:sticky lg:top-8">
            <ReviewForm onSuccess={loadReviews} />
          </div>
        </div>
      </div>
    </div>
  );
};
