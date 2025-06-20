import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Home, MenuSquare, ShoppingBag } from 'lucide-react';
import GadgetIconButton from '@/components/GadgetIconButton'; // Assuming default export

interface ThemedHeaderProps {}

const ThemedHeader: React.FC<ThemedHeaderProps> = () => {
  console.log('ThemedHeader loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-lg font-medium transition-colors hover:text-blue-500 ${
      isActive ? 'text-blue-600 font-bold' : 'text-slate-700'
    }`;

  // Placeholder for cart item count
  const cartItemCount = 0; // In a real app, this would come from state/context

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-sky-100/80 backdrop-blur supports-[backdrop-filter]:bg-sky-100/60 shadow-md">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <Bell className="h-8 w-8 text-red-500 group-hover:animate-bounce" />
          <span className="font-bold text-2xl text-blue-700 tracking-tight">
            Dora-Restaurant
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-3">
          <GadgetIconButton aria-label="Home" asChild>
            <NavLink to="/" className={navLinkClasses}>
              <Home className="h-5 w-5 mr-2" /> Home
            </NavLink>
          </GadgetIconButton>
          <GadgetIconButton aria-label="Menu" asChild>
            <NavLink to="/menu" className={navLinkClasses}>
              <MenuSquare className="h-5 w-5 mr-2" /> Menu
            </NavLink>
          </GadgetIconButton>
        </nav>

        <div className="flex items-center gap-3">
          <GadgetIconButton aria-label="Open Cart" asChild>
            <Link to="/cart" className="relative flex items-center text-slate-700 hover:text-blue-500">
              <ShoppingBag className="h-7 w-7" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Open Cart</span>
            </Link>
          </GadgetIconButton>
          
          {/* Mobile Menu Button - basic placeholder */}
          <div className="md:hidden">
            <Button variant="outline" size="icon">
              <MenuSquare className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ThemedHeader;