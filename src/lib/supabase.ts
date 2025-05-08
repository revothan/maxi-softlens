import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Tables = Database['public']['Tables'];
export type Products = Tables['products']['Row'];
export type ProductPowers = Tables['product_powers']['Row'];
export type Profiles = Tables['profiles']['Row'];
export type Coins = Tables['coins']['Row'];
export type CoinTransactions = Tables['coin_transactions']['Row'];
export type Rewards = Tables['rewards']['Row'];
export type UserRewards = Tables['user_rewards']['Row'];

export type SupabaseFunction = Database['public']['Functions'];
