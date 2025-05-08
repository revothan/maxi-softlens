import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRewards } from '@/contexts/RewardsContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Coins, Gift, Lock, Check, Clock, AlertCircle } from 'lucide-react';
import { 
  rewardAnimations, 
  coinAnimations, 
  confettiAnimation, 
  addAnimationStyles, 
  createConfetti, 
  animateNumber 
} from '@/lib/animations';

const RewardsPage: React.FC = () => {
  const { user, coins, loading, refreshUserData } = useAuth();
  const { rewards, userRewards, loadingRewards, redeemReward, refreshRewards } = useRewards();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [redeemDialog, setRedeemDialog] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [animatedCoinBalance, setAnimatedCoinBalance] = useState(0);
  const balanceRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Add animations
  useEffect(() => {
    const styles = [
      addAnimationStyles(rewardAnimations.rewardUnlock),
      addAnimationStyles(rewardAnimations.rewardHover),
      addAnimationStyles(rewardAnimations.rewardCelebration),
      addAnimationStyles(coinAnimations.coinCount),
      addAnimationStyles(confettiAnimation),
    ];
    
    return () => {
      styles.forEach(style => style.remove());
    };
  }, []);

  // Initialize animated coin balance
  useEffect(() => {
    if (coins) {
      setAnimatedCoinBalance(coins.balance);
    }
  }, [coins]);

  const handleOpenRedeemDialog = (reward: any) => {
    setSelectedReward(reward);
    setRedeemDialog(true);
    setRedeemSuccess(false);
    setRedeemError(null);
  };

  const handleRedeemReward = async () => {
    if (!selectedReward || !user) return;
    
    setIsRedeeming(true);
    setRedeemError(null);
    
    try {
      const result = await redeemReward(selectedReward.id);
      
      if (result.success) {
        setRedeemSuccess(true);
        
        // Animate coin deduction
        if (balanceRef.current && coins) {
          const startBalance = coins.balance;
          const endBalance = startBalance - selectedReward.cost;
          
          // Update the animated balance
          setAnimatedCoinBalance(endBalance);
          
          // Animate the number change
          animateNumber(
            balanceRef.current,
            startBalance,
            endBalance,
            1000,
            (value) => Math.round(value).toString()
          );
        }
        
        // Create confetti effect for successful redemption
        if (containerRef.current) {
          createConfetti(containerRef.current, 100);
        }
        
        // Refresh data
        await refreshUserData();
        await refreshRewards();
        
        // Auto-switch to "My Rewards" tab after successful redemption
        setTimeout(() => {
          setActiveTab('myRewards');
        }, 2000);
      } else {
        setRedeemError(result.message);
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
      setRedeemError('An unexpected error occurred. Please try again.');
    } finally {
      setIsRedeeming(false);
    }
  };

  if (loading || loadingRewards) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Sort rewards by cost (lowest to highest)
  const sortedRewards = [...rewards].sort((a, b) => a.cost - b.cost);
  
  // Get user's redeemed rewards
  const myRedeemedRewards = userRewards || [];

  return (
    <div ref={containerRef} className="container max-w-4xl mx-auto p-4 pb-20">
      <h1 className="text-3xl font-bold mb-2">Rewards</h1>
      <div className="flex items-center mb-6 bg-amber-50 rounded-lg p-4 border border-amber-200">
        <Coins className="h-6 w-6 text-amber-500 mr-3" />
        <div>
          <p className="text-sm text-amber-800">Your coin balance</p>
          <p className="text-xl font-bold text-amber-600">
            <span ref={balanceRef}>{animatedCoinBalance}</span> coins
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="available" className="flex-1">Available Rewards</TabsTrigger>
          <TabsTrigger value="myRewards" className="flex-1">My Rewards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {sortedRewards.map((reward) => {
              const canRedeem = coins && coins.balance >= reward.cost;
              
              return (
                <Card 
                  key={reward.id}
                  className={`border overflow-hidden transition-all duration-300 ${
                    canRedeem 
                      ? 'border-primary shadow-md hover:shadow-lg' 
                      : 'border-gray-200 opacity-80'
                  }`}
                  style={{
                    animation: canRedeem ? 'rewardUnlock 0.5s ease-out' : undefined,
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {reward.name}
                      </CardTitle>
                      <Badge 
                        variant={canRedeem ? "default" : "outline"}
                        className={canRedeem ? "bg-primary" : "text-muted-foreground"}
                      >
                        {reward.cost} coins
                      </Badge>
                    </div>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <div className="h-28 bg-muted rounded-md flex items-center justify-center mb-2">
                      {reward.reward_type === 'discount' ? (
                        <div className="text-3xl font-bold text-primary flex items-center">
                          <span>{reward.discount_percentage}%</span>
                          <span className="ml-2 text-lg">OFF</span>
                        </div>
                      ) : (
                        <div className="text-2xl font-bold text-primary">
                          Free Product
                        </div>
                      )}
                    </div>
                    
                    {!canRedeem && (
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Lock className="h-4 w-4 mr-1" />
                        <span>
                          You need {reward.cost - (coins?.balance || 0)} more coins
                        </span>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      onClick={() => handleOpenRedeemDialog(reward)}
                      disabled={!canRedeem}
                      className="w-full"
                      variant={canRedeem ? "default" : "outline"}
                    >
                      {canRedeem ? (
                        <>
                          <Gift className="mr-2 h-4 w-4" /> Redeem Now
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" /> Locked
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          {sortedRewards.length === 0 && (
            <div className="text-center py-12">
              <Gift className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No rewards available</h3>
              <p className="text-muted-foreground">Check back later for new rewards</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="myRewards" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {myRedeemedRewards.map((userReward) => {
              const reward = userReward.reward;
              const isExpired = userReward.expiry_date && new Date(userReward.expiry_date) < new Date();
              const isUsed = userReward.is_used;
              
              return (
                <Card 
                  key={userReward.id}
                  className={`border overflow-hidden transition-all duration-300 ${
                    isExpired || isUsed
                      ? 'border-gray-200 opacity-60'
                      : 'border-green-200 shadow-md'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{reward.name}</CardTitle>
                      <Badge 
                        variant={isExpired || isUsed ? "outline" : "default"}
                        className={isExpired || isUsed ? "text-muted-foreground" : "bg-green-600"}
                      >
                        {isUsed ? 'Used' : isExpired ? 'Expired' : 'Active'}
                      </Badge>
                    </div>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <div className={`h-28 rounded-md flex items-center justify-center mb-4 ${
                      isExpired || isUsed ? 'bg-muted' : 'bg-green-50'
                    }`}>
                      {reward.reward_type === 'discount' ? (
                        <div className={`text-3xl font-bold flex items-center ${
                          isExpired || isUsed ? 'text-muted-foreground' : 'text-green-600'
                        }`}>
                          <span>{reward.discount_percentage}%</span>
                          <span className="ml-2 text-lg">OFF</span>
                        </div>
                      ) : (
                        <div className={`text-2xl font-bold ${
                          isExpired || isUsed ? 'text-muted-foreground' : 'text-green-600'
                        }`}>
                          Free Product
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm mb-2">
                      {isUsed ? (
                        <div className="flex items-center text-muted-foreground">
                          <Check className="h-4 w-4 mr-1" />
                          <span>Used on {new Date(userReward.used_at || '').toLocaleDateString()}</span>
                        </div>
                      ) : isExpired ? (
                        <div className="flex items-center text-muted-foreground">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>Expired on {new Date(userReward.expiry_date || '').toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-green-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Valid until {new Date(userReward.expiry_date || '').toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      variant={isExpired || isUsed ? "outline" : "default"}
                      className={`w-full ${!isExpired && !isUsed ? "bg-green-600 hover:bg-green-700" : ""}`}
                      disabled={isExpired || isUsed}
                      onClick={() => {
                        // In a real app, this would mark the reward as used or show a code
                        // For now, we'll just show a message
                        alert(`Use your ${reward.name} reward at checkout!`);
                      }}
                    >
                      {isUsed ? (
                        'Already Used'
                      ) : isExpired ? (
                        'Expired'
                      ) : (
                        'Use Reward'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          {myRedeemedRewards.length === 0 && (
            <div className="text-center py-12">
              <Gift className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No redeemed rewards yet</h3>
              <p className="text-muted-foreground mb-6">Redeem your coins for exclusive rewards</p>
              <Button onClick={() => setActiveTab('available')}>
                View Available Rewards
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Redemption Dialog */}
      <Dialog open={redeemDialog} onOpenChange={setRedeemDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Redeem Reward</DialogTitle>
            <DialogDescription>
              {!redeemSuccess ? (
                `Are you sure you want to redeem ${selectedReward?.name} for ${selectedReward?.cost} coins?`
              ) : (
                `You've successfully redeemed ${selectedReward?.name}!`
              )}
            </DialogDescription>
          </DialogHeader>
          
          {redeemError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{redeemError}</AlertDescription>
            </Alert>
          )}
          
          {redeemSuccess ? (
            <div className="text-center py-6 animate-in fade-in duration-300">
              <div className="mb-4">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <div className="text-xl font-bold text-green-600 mb-2">
                Reward Redeemed!
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Your reward is now available in "My Rewards" tab
              </p>
              <Button
                onClick={() => {
                  setRedeemDialog(false);
                  setActiveTab('myRewards');
                }}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                View My Rewards
              </Button>
            </div>
          ) : (
            <DialogFooter className="flex sm:justify-between gap-4 sm:flex-row flex-col">
              <Button
                variant="outline"
                onClick={() => setRedeemDialog(false)}
                disabled={isRedeeming}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRedeemReward}
                disabled={isRedeeming}
                className="min-w-32"
              >
                {isRedeeming ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Redeeming...
                  </>
                ) : (
                  'Confirm Redemption'
                )}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RewardsPage;
