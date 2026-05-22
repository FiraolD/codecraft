import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchAdminUser(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchAdminUser(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const fetchAdminUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      if (error || !data) {
        // Not an admin – sign out
        await supabase.auth.signOut();
        setUser(null);
      } else {
        // Get user email from auth
        const { data: { user } } = await supabase.auth.getUser();
        setUser({
          id: userId,
          email: user?.email || '',
          role: 'admin'
        });
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Check if this user is in admin_users table
    if (data.user) {
      const { data: adminCheck, error: adminError } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', data.user.id)
        .single();

      if (adminError || !adminCheck) {
        // Not an admin – sign out immediately
        await supabase.auth.signOut();
        return { success: false, error: 'Unauthorized: Not an admin user' };
      }

      setUser({
        id: data.user.id,
        email: data.user.email!,
        role: 'admin'
      });
      return { success: true };
    }

    return { success: false, error: 'Login failed' };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}