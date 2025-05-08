import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRewards } from '@/contexts/RewardsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Coins, Gift, User, ChevronRight, Sparkles, Award } from 'lucide-react';
import {
  coinAnimations,
  progressAnimations,
  addAnimationStyles,
  animateNumber,
  createConfetti
} from '@/lib/animations';

const DashboardPage: React.FC = () => {
  const { user, profile, coins, loading } = useAuth();
  const { rewards, loadingRewards } = useRewards();
  const navigate = useNavigate();
  const coinCountRef = useRef<HTMLSpanElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [showFirstLoginBonus, setShowFirstLoginBonus] = useState(false);
  const [nextReward, setNextReward] = useState<{ name: string; cost: number; progress: number } | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Add animations
  useEffect(() => {
    const styles = [
      addAnimationStyles(coinAnimations.coinEarned),
      addAnimationStyles(coinAnimations.coinCount),
      addAnimationStyles(coinAnimations.coinFloat),
      addAnimationStyles(coinAnimations.coinShine),
      addAnimationStyles(progressAnimations.progressFill),
      addAnimationStyles(progressAnimations.progressPulse),
    ];
    
    return () => {
      styles.forEach(style => style.remove());
    };
  }, []);

  // Animate coin count on initial load
  useEffect(() => {
    if (coins && coinCountRef.current) {
      animateNumber(
        coinCountRef.current,
        0,
        coins.balance,
        1500,
        (value) => Math.round(value).toString()
      );
    }
  }, [coins]);

  // Show first login bonus animation
  useEffect(() => {
    if (coins?.has_received_first_login_bonus && !showFirstLoginBonus) {
      setShowFirstLoginBonus(true);
      
      // Create confetti effect
      if (dashboardRef.current) {
        createConfetti(dashboardRef.current);
        
        // Add coin floating animation
        const coinFloatContainer = document.createElement('div');
        coinFloatContainer.style.position = 'absolute';
        coinFloatContainer.style.top = '50%';
        coinFloatContainer.style.left = '50%';
        coinFloatContainer.style.transform = 'translate(-50%, -50%)';
        coinFloatContainer.style.zIndex = '100';
        coinFloatContainer.style.pointerEvents = 'none';
        
        for (let i = 0; i < 10; i++) {
          const coin = document.createElement('div');
          coin.className = 'text-amber-500';
          coin.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coins"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>';
          
          // Random position and animation
          const left = `${Math.random() * 200 - 100}px`;
          const delay = `${Math.random() * 0.5}s`;
          
          Object.assign(coin.style, {
            position: 'absolute',
            left: left,
            animation: `coinFloat 2s ease-out ${delay} forwards`,
          });
          
          coinFloatContainer.appendChild(coin);
        }
        
        dashboardRef.current.appendChild(coinFloatContainer);
        
        // Clean up after animation
        setTimeout(() => {
          coinFloatContainer.remove();
          setShowFirstLoginBonus(false);
        }, 3000);
      }
    }
  }, [coins, showFirstLoginBonus]);

  // Calculate next reward
  useEffect(() => {
    if (coins && rewards.length > 0) {
      // Filter rewards that the user doesn't have enough coins for
      const availableRewards = rewards
        .filter(reward => reward.cost > coins.balance)
        .sort((a, b) => a.cost - b.cost);
      
      if (availableRewards.length > 0) {
        const next = availableRewards[0];
        const progress = (coins.balance / next.cost) * 100;
        
        setNextReward({
          name: next.name,
          cost: next.cost,
          progress: progress
        });
      } else {
        // If user has enough coins for all rewards, show the most expensive one
        const mostExpensive = rewards.sort((a, b) => b.cost - a.cost)[0];
        setNextReward({
          name: mostExpensive.name,
          cost: mostExpensive.cost,
          progress: 100
        });
      }
    }
  }, [coins, rewards]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div ref={dashboardRef} className="container max-w-4xl mx-auto p-4 relative">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      
      {/* First-time login bonus alert */}
      {showFirstLoginBonus && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <Card className="w-80 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-xl animate-in zoom-in duration-300">
            <CardHeader className="text-center pb-2">
              <Sparkles className="mx-auto h-12 w-12 text-amber-500 mb-2" />
              <CardTitle className="text-2xl font-bold text-amber-800">Welcome Bonus!</CardTitle>
              <CardDescription className="text-amber-700">
                You've received 50 coins for joining Maxi Softlens!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <div className="text-4xl font-bold text-amber-600 my-4 flex items-center justify-center">
                <Coins className="mr-2 h-6 w-6" />
                <span>+50</span>
              </div>
              <Button
                onClick={() => setShowFirstLoginBonus(false)}
                className="bg-amber-600 hover:bg-amber-700"
              >
                Claim Reward
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Main dashboard content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Coin balance card */}
        <Card className="relative overflow-hidden border-amber-200 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 z-0"></div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center text-amber-800">
              <Coins className="mr-2 h-5 w-5" /> My Coins
            </CardTitle>
            <CardDescription className="text-amber-700">
              Earn coins by shopping and engaging with Maxi Softlens
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-amber-600 flex items-center">
                  <span ref={coinCountRef}>{coins?.balance || 0}</span>
                  <div className="ml-2 text-2xl">coins</div>
                </div>
                
                {nextReward && (
                  <div className="mt-4">
                    <div className="text-sm text-amber-700 mb-1">
                      Next reward: {nextReward.name} ({nextReward.cost} coins)
                    </div>
                    <div className="relative">
                      <Progress 
                        value={nextReward.progress} 
                        className="h-2 bg-amber-200"
                        style={{
                          '--progress-percent': `${nextReward.progress}%`,
                          '--tw-bg-opacity': '1',
                          backgroundColor: 'rgb(253 230 138 / var(--tw-bg-opacity))',
                        } as React.CSSProperties}
                      />
                      <div 
                        className="absolute h-2 bg-amber-500 rounded-full" 
                        style={{ 
                          width: `${nextReward.progress}%`,
                          animation: nextReward.progress > 80 ? 'progressPulse 2s infinite' : 'progressFill 1.5s ease-out',
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <Button
                  variant="link"
                  className="p-0 mt-4 text-amber-800 hover:text-amber-600"
                  onClick={() => navigate('/rewards')}
                >
                  View all rewards <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="h-24 w-24 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Coins className="h-12 w-12 text-white" />
              </div>
            </div>
          </CardContent>
          
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-64 h-64 bg-amber-300 rounded-full opacity-10 z-0"></div>
        </Card>
        
        {/* Quick links card */}
        <div className="grid gap-4">
          <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full justify-between p-6 h-auto"
                onClick={() => navigate('/profile')}
              >
                <div className="flex items-center">
                  <User className="mr-4 h-5 w-5 text-primary" />
                  <div className="text-left">
                    <h3 className="font-medium">My Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      {profile?.full_name ? profile.full_name : 'Complete your profile'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full justify-between p-6 h-auto"
                onClick={() => navigate('/rewards')}
              >
                <div className="flex items-center">
                  <Gift className="mr-4 h-5 w-5 text-primary" />
                  <div className="text-left">
                    <h3 className="font-medium">My Rewards</h3>
                    <p className="text-sm text-muted-foreground">
                      Redeem coins for exclusive discounts
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full justify-between p-6 h-auto"
                onClick={() => navigate('/products')}
              >
                <div className="flex items-center">
                  <Award className="mr-4 h-5 w-5 text-primary" />
                  <div className="text-left">
                    <h3 className="font-medium">Shop Now</h3>
                    <p className="text-sm text-muted-foreground">
                      Browse our collection of softlens
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
