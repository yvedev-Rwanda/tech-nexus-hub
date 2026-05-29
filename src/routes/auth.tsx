import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword, 
//   signInWithPopup, 
//   GoogleAuthProvider 
// } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
// import { doc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { LogIn, UserPlus, Github, Chrome } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/logo.png';

export const Route = createFileRoute('/auth')({
  component: AuthPage,
});

function AuthPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock Auth for now until firebase is installed
      login(email);
      toast.success(isLogin ? "Welcome back!" : "Welcome to VEXA!");
      navigate({ to: '/feed' });
    } catch (error: any) {
      toast.error("Auth failed");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      login('google-user@example.com');
      toast.success("Google Sign-in (Mock)");
      navigate({ to: '/feed' });
    } catch (error: any) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border/40 bg-card/30 p-10 backdrop-blur-xl shadow-2xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black border border-primary/20 shadow-glow overflow-hidden">
            <img src={logo} alt="VEXA" className="h-full w-full object-cover" />
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-foreground">
            {isLogin ? "Sign in to VEXA" : "Join the Ecosystem"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-primary hover:underline transition-all"
            >
              {isLogin ? "Create one now" : "Sign in instead"}
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleAuth}>
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="rounded-xl border-border/40 bg-background/50 h-12"
              />
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="rounded-xl border-border/40 bg-background/50 h-12"
              />
            </div>
          )}
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-xl border-border/40 bg-background/50 h-12"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-xl border-border/40 bg-background/50 h-12"
          />

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl text-md font-bold transition-transform hover:scale-105 active:scale-95" 
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Register"}
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" onClick={signInWithGoogle} className="rounded-xl h-11 border-border/40">
              <Chrome className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" type="button" className="rounded-xl h-11 border-border/40">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
