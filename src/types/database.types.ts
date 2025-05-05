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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
