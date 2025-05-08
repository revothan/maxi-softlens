export type Profile = {
  id: string;
  full_name: string | null;
  whatsapp_number: string | null;
  birthdate: string | null;
  address: string | null;
  profile_picture_url: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type CoinBalance = {
  id: string;
  balance: number;
  has_received_first_login_bonus: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type CoinTransaction = {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: string;
  description: string | null;
  created_at: string;
};

export type Reward = {
  id: string;
  name: string;
  description: string | null;
  cost: number;
  image_url: string | null;
  reward_type: 'discount' | 'product';
  discount_percentage: number | null;
  product_id: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type UserReward = {
  id: string;
  user_id: string;
  reward_id: string;
  redeemed_at: string;
  expiry_date: string | null;
  is_used: boolean;
  used_at: string | null;
  reward?: Reward;
};
