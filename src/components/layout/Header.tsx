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
                          <p className="text-sm font-medium">
                            {profile?.full_name || 'Member'}
                          </p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between bg-amber-50 rounded p-2 mb-4">
                        <div className="flex items-center">
                          <Coins className="h-4 w-4 text-amber-500 mr-1.5" />
                          <span className="text-sm text-amber-800">
                            <strong>{coins?.balance || 0}</strong> coins
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs text-amber-700"
                          onClick={() => {
                            closeSheet();
                            navigate('/rewards');
                          }}
                        >
                          Redeem <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-left"
                          onClick={() => {
                            closeSheet();
                            navigate('/dashboard');
                          }}
                        >
                          Dashboard
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-left"
                          onClick={() => {
                            closeSheet();
                            navigate('/profile');
                          }}
                        >
                          Profile
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-left"
                          onClick={() => {
                            closeSheet();
                            navigate('/rewards');
                          }}
                        >
                          Rewards
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-left text-destructive hover:text-destructive"
                          onClick={() => {
                            closeSheet();
                            handleSignOut();
                          }}
                        >
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <Button
                      onClick={() => {
                        closeSheet();
                        navigate('/login');
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        closeSheet();
                        navigate('/register');
                      }}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="hidden md:flex items-center">
            <img
              src="/images/logo.png"
              alt="Maxi Softlens"
              className="h-8 mr-4"
            />
          </Link>
          
          <Link to="/" className="md:hidden">
            <img
              src="/images/logo.png"
              alt="Maxi Softlens"
              className="h-8"
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 ml-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          {user && (
            <div className="hidden md:flex items-center mr-2 bg-amber-50 rounded-full px-3 py-1">
              <Coins className="h-4 w-4 text-amber-500 mr-1.5" />
              <span className="text-sm text-amber-800">
                <strong>{coins?.balance || 0}</strong> coins
              </span>
            </div>
          )}
          
          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/images/placeholder.jpg" alt="Profile" />
                    <AvatarFallback>
                      <UserCircle className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{profile?.full_name || 'Member'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <User className="mr-2 h-4 w-4" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/rewards')}>
                  <Gift className="mr-2 h-4 w-4" /> Rewards
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/register')}>Register</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};