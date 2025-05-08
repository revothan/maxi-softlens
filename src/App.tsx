import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { CartPage } from '@/pages/CartPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import RewardsPage from '@/pages/RewardsPage';
import { AuthProvider } from '@/contexts/AuthContext';
import { RewardsProvider } from '@/contexts/RewardsContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <RewardsProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/rewards" 
              element={
                <ProtectedRoute>
                  <RewardsPage />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </RewardsProvider>
    </AuthProvider>
  );
}

export default App;
