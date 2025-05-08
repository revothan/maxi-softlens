import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Rewards, UserRewards } from '@/lib/supabase';
import { useAuth } from './AuthContext';

interface RewardsContextType {
  rewards: Rewards[];
  userRewards: (UserRewards & { reward: Rewards })[];
  loadingRewards: boolean;
  redeemReward: (rewardId: string) => Promise<{
    success: boolean;
    message: string;
    newBalance?: number;
  }>;
  refreshRewards: () => Promise<void>;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export const RewardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, refreshUserData } = useAuth();
  const [rewards, setRewards] = useState<Rewards[]>([]);
  const [userRewards, setUserRewards] = useState<(UserRewards & { reward: Rewards })[]>([]);
  const [loadingRewards, setLoadingRewards] = useState(true);

  useEffect(() => {
    if (user) {
      refreshRewards();
    } else {
      setUserRewards([]);
      fetchAvailableRewards();
    }
  }, [user]);

  const fetchAvailableRewards = async () => {
    try {
      setLoadingRewards(true);
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('is_active', true)
        .order('cost', { ascending: true });

      if (error) {
        console.error('Error fetching rewards:', error);
      } else {
        setRewards(data || []);
      }
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setLoadingRewards(false);
    }
  };

  const fetchUserRewards = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_rewards')
        .select(`
          *,
          reward:rewards(*)
        `)
        .eq('user_id', user.id)
        .order('redeemed_at', { ascending: false });

      if (error) {
        console.error('Error fetching user rewards:', error);
      } else {
        setUserRewards(data as (UserRewards & { reward: Rewards })[] || []);
      }
    } catch (error) {
      console.error('Error fetching user rewards:', error);
    }
  };

  const refreshRewards = async () => {
    await fetchAvailableRewards();
    await fetchUserRewards();
  };

  const redeemReward = async (rewardId: string) => {
    if (!user) {
      return {
        success: false,
        message: 'You must be logged in to redeem rewards',
      };
    }

    try {
      const { data, error } = await supabase.rpc('redeem_reward', {
        user_uuid: user.id,
        reward_uuid: rewardId,
      });

      if (error) {
        console.error('Error redeeming reward:', error);
        return {
          success: false,
          message: error.message || 'Failed to redeem reward',
        };
      }

      const success = data === true;

      if (success) {
        // Refresh user data and rewards after redemption
        await refreshUserData();
        await refreshRewards();
        
        return {
          success: true,
          message: 'Reward redeemed successfully!',
        };
      } else {
        return {
          success: false,
          message: 'Not enough coins to redeem this reward',
        };
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
      return {
        success: false,
        message: 'An error occurred while redeeming the reward',
      };
    }
  };

  const value = {
    rewards,
    userRewards,
    loadingRewards,
    redeemReward,
    refreshRewards,
  };

  return <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>;
};

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};
