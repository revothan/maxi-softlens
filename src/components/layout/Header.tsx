import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Menu,
  X,
  ShoppingBag,
  User,
  LogOut,
  Gift,
  Coins,
  ArrowRight,
  UserCircle,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, profile, coins, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                <Link
                  to="/"
                  className="flex items-center px-2 py-1 rounded-md hover:bg-muted"
                  onClick={closeSheet}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="flex items-center px-2 py-1 rounded-md hover:bg-muted"
                  onClick={closeSheet}
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  className="flex items-center px-2 py-1 rounded-md hover:bg-muted"
                  onClick={closeSheet}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center px-2 py-1 rounded-md hover:bg-muted"
                  onClick={closeSheet}
                >
                  Contact
                </Link>
                
                {user ? (
                  <>
                    <div className="bg-muted p-4 rounded-lg mt-4">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-9 w-9 mr-2">
                          <AvatarImage src="/images/placeholder.jpg" alt="Profile" />
                          <AvatarFallback>
                            <UserCircle className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>