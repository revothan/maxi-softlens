import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Profiles, Coins } from '@/lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profiles | null;
  coins: Coins | null;
  signUp: (email: string, password: string) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null } | null;
  }>;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: { user: User | null; session: Session | null } | null;
  }>;
  signOut: () => Promise<void>;
  loading: boolean;
  updateProfile: (updates: Partial<Profiles>) => Promise<{
    error: Error | null;
    data: Profiles | null;
  }>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profiles | null>(null);
  const [coins, setCoins] = useState<Coins | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      if (session?.user) {
        refreshUserData();
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        
        if (session?.user) {
          refreshUserData();
        } else {
          setProfile(null);
          setCoins(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle first login bonus
  useEffect(() => {
    const handleFirstLoginBonus = async () => {
      if (user && !coins?.has_received_first_login_bonus) {
        const { data, error } = await supabase.rpc('handle_first_login_bonus', {
          user_uuid: user.id
        });
        
        if (!error && data) {
          refreshUserData();
        }
      }
    };

    if (user && coins) {
      handleFirstLoginBonus();
    }
  }, [user, coins]);

  const refreshUserData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        setProfile(profileData);
      }

      // Fetch coins
      const { data: coinsData, error: coinsError } = await supabase
        .from('coins')
        .select('*')
        .eq('id', user.id)
        .single();

      if (coinsError) {
        console.error('Error fetching coins:', coinsError);
      } else {
        setCoins(coinsData);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const signUp = async (email: string, password: string) => {
    return await supabase.auth.signUp({
      email,
      password,
    });
  };

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setCoins(null);
  };

  const updateProfile = async (updates: Partial<Profiles>) => {
    if (!user) {
      return { error: new Error('User not authenticated'), data: null };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        return { error, data: null };
      }

      setProfile(data);
      return { error: null, data };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error: error as Error, data: null };
    }
  };

  const value = {
    session,
    user,
    profile,
    coins,
    signUp,
    signIn,
    signOut,
    loading,
    updateProfile,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
