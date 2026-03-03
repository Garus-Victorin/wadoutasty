import React, { useState } from 'react';
import { Eye, EyeOff, UtensilsCrossed, Lock, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { adminLogin } from '@/lib/database';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = await adminLogin(email, password);
    
    if (result.success) {
      // Store admin session
      localStorage.setItem('admin_session', JSON.stringify({ 
        email: result.admin?.email, 
        loggedIn: true 
      }));
      onLogin();
    } else {
      setError(result.message || 'Email ou mot de passe incorrect');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-20"
          alt="Background"
        />
        <div className="absolute inset-0 bg-foreground/90" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-primary rounded-2xl mb-4">
            <UtensilsCrossed className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white">WADOU Tasty</h1>
          <span className="text-white/60 text-sm uppercase tracking-widest">Administration</span>
        </div>

        <Card className="bg-white/10 backdrop-blur-xl border-white/10 rounded-3xl shadow-2xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-display font-bold text-white mb-6 text-center">
              Connexion Admin
            </h2>

            {error && (
              <div className="flex items-center gap-2 p-4 mb-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="text-white/80 text-xs font-bold uppercase tracking-widest ml-1">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input 
                    id="email" 
                    type="email"
                    required
                    placeholder="admin@gmail.com"
                    className="h-14 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:ring-primary focus:border-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="text-white/80 text-xs font-bold uppercase tracking-widest ml-1">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="h-14 pl-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:ring-primary focus:border-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 rounded-xl text-lg font-bold mt-4 bg-primary hover:bg-primary/90"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <button onClick={() => window.location.href = '/'} className="text-white/60 text-sm hover:text-white transition-colors">
                ← Retour au site
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-white/40 text-xs mt-6">
          © 2024 WADOU Tasty. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};
