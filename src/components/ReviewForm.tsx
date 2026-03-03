import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addReview } from '@/lib/database';

interface ReviewFormProps {
  onSuccess?: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || rating === 0 || !comment) return;

    setIsSubmitting(true);
    try {
      await addReview({ name, rating, comment });
      setShowSuccess(true);
      setName('');
      setRating(0);
      setComment('');
      if (onSuccess) onSuccess();
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {showSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-green-600 fill-green-600" />
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Merci pour votre avis!</h3>
          <p className="text-green-700">
            Votre avis a ete soumis avec succes. Il sera affiche apres validation par notre equipe.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-display font-bold text-foreground">Partagez votre experience</h3>
            <p className="text-muted-foreground text-sm mt-1">Votre avis nous aide a nous ameliorer</p>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Votre nom
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez votre nom"
              required
              className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Note
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 ? `${rating}/5` : 'Selectionnez une note'}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Votre avis
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre experience chez WADOU Tasty..."
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!name || rating === 0 || !comment || isSubmitting}
            className="w-full h-12 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Envoyer mon avis
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
};
