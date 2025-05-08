export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      coin_transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          transaction_type: string
          description: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          transaction_type: string
          description?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          transaction_type?: string
          description?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coin_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      coins: {
        Row: {
          id: string
          balance: number
          has_received_first_login_bonus: boolean
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          balance?: number
          has_received_first_login_bonus?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          balance?: number
          has_received_first_login_bonus?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coins_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      product_powers: {
        Row: {
          created_at: string | null
          id: number
          power: string
          product_id: number | null
          quantity: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          power: string
          product_id?: number | null
          quantity: number
        }
        Update: {
          created_at?: string | null
          id?: number
          power?: string
          product_id?: number | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_powers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          color: string
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          name: string
          series: string
        }
        Insert: {
          color: string
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name: string
          series: string
        }
        Update: {
          color?: string
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name?: string
          series?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          whatsapp_number: string | null
          birthdate: string | null
          address: string | null
          profile_picture_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          whatsapp_number?: string | null
          birthdate?: string | null
          address?: string | null
          profile_picture_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          whatsapp_number?: string | null
          birthdate?: string | null
          address?: string | null
          profile_picture_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rewards: {
        Row: {
          id: string
          name: string
          description: string | null
          cost: number
          image_url: string | null
          reward_type: string
          discount_percentage: number | null
          product_id: number | null
          is_active: boolean
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          cost: number
          image_url?: string | null
          reward_type: string
          discount_percentage?: number | null
          product_id?: number | null
          is_active?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          cost?: number
          image_url?: string | null
          reward_type?: string
          discount_percentage?: number | null
          product_id?: number | null
          is_active?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rewards_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      user_rewards: {
        Row: {
          id: string
          user_id: string
          reward_id: string
          redeemed_at: string | null
          expiry_date: string | null
          is_used: boolean
          used_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          reward_id: string
          redeemed_at?: string | null
          expiry_date?: string | null
          is_used?: boolean
          used_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          reward_id?: string
          redeemed_at?: string | null
          expiry_date?: string | null
          is_used?: boolean
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_rewards_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_rewards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_coins: {
        Args: {
          user_uuid: string
          coin_amount: number
          tx_type: string
          tx_description?: string
        }
        Returns: number
      }
      handle_first_login_bonus: {
        Args: {
          user_uuid: string
        }
        Returns: boolean
      }
      redeem_reward: {
        Args: {
          user_uuid: string
          reward_uuid: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
