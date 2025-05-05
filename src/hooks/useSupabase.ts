import { useState, useEffect } from 'react';
import { supabase, Products, ProductPowers } from '@/lib/supabase';

export type ProductWithPowers = Products & {
  powers: ProductPowers[];
};

export function useProducts() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductWithPowers[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        // Fetch products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*');
        
        if (productsError) {
          throw new Error(productsError.message);
        }
        
        // Fetch powers for each product
        const productsWithPowers = await Promise.all(
          productsData.map(async (product) => {
            const { data: powersData, error: powersError } = await supabase
              .from('product_powers')
              .select('*')
              .eq('product_id', product.id);
            
            if (powersError) {
              throw new Error(powersError.message);
            }
            
            return {
              ...product,
              powers: powersData || [],
            };
          })
        );
        
        setProducts(productsWithPowers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  return { products, loading, error };
}

export function useProductPowers(productId: number) {
  const [loading, setLoading] = useState(true);
  const [powers, setPowers] = useState<ProductPowers[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPowers() {
      try {
        setLoading(true);
        
        const { data, error: powersError } = await supabase
          .from('product_powers')
          .select('*')
          .eq('product_id', productId);
        
        if (powersError) {
          throw new Error(powersError.message);
        }
        
        setPowers(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchPowers();
  }, [productId]);

  return { powers, loading, error };
}
