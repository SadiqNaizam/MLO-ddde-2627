import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemedHeader from '@/components/layout/ThemedHeader';
import ThemedFooter from '@/components/layout/ThemedFooter';
import ThematicPageTransition from '@/components/ThematicPageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Input might be used or replaced by buttons
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, PlusCircle, MinusCircle, ShoppingCart, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  description?: string; // Optional: for a bit more detail
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Dorayaki Classic',
    price: 300,
    quantity: 2,
    imageUrl: 'https://placehold.co/100x100/FFD699/4A4A4A/png?text=Dorayaki',
    description: "Doraemon's favorite pancake snack!",
  },
  {
    id: '2',
    name: 'Memory Bread Slice',
    price: 450,
    quantity: 1,
    imageUrl: 'https://placehold.co/100x100/A0E7E5/4A4A4A/png?text=Memory+Bread',
    description: 'Helps you remember anything!',
  },
  {
    id: '3',
    name: 'Anywhere Door Jelly',
    price: 250,
    quantity: 3,
    imageUrl: 'https://placehold.co/100x100/FFABAB/4A4A4A/png?text=Anywhere+Jelly',
    description: 'Tastes like adventure!',
  },
];

const CartPage: React.FC = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const navigate = useNavigate();

  const handleQuantityChange = (itemId: string, change: number) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(1, item.quantity + change) } // Quantity cannot be less than 1
            : item
        )
        .filter((item) => item.quantity > 0) // Remove if quantity becomes 0 (optional, handled by remove button)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();

  return (
    <ThematicPageTransition>
      <div className="flex flex-col min-h-screen bg-sky-50">
        <ThemedHeader />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 flex items-center">
                <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-orange-500" />
                Your Magical Cart
              </h1>
              {cartItems.length > 0 && (
                 <Button variant="outline" onClick={() => navigate('/menu')} className="hidden sm:flex">
                    Continue Shopping
                </Button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <Card className="text-center py-12 md:py-16 shadow-lg border-dashed border-blue-300 bg-white">
                <CardHeader>
                  <Info className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                  <CardTitle className="text-2xl font-semibold text-blue-600">Your 4D Pocket is Empty!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Looks like you haven't added any Doraemon treats yet.
                  </p>
                  <Button size="lg" onClick={() => navigate('/menu')} className="bg-orange-500 hover:bg-orange-600 text-white">
                    Explore Our Magical Menu
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="shadow-xl overflow-hidden bg-white">
                    <CardHeader className="bg-blue-50 p-4 border-b">
                      <CardTitle className="text-xl text-blue-700">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="py-3 px-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider w-2/5 sm:w-auto">Product</TableHead>
                            <TableHead className="py-3 px-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider hidden sm:table-cell">Price</TableHead>
                            <TableHead className="py-3 px-4 text-center text-xs font-medium text-slate-600 uppercase tracking-wider">Quantity</TableHead>
                            <TableHead className="py-3 px-4 text-right text-xs font-medium text-slate-600 uppercase tracking-wider hidden sm:table-cell">Total</TableHead>
                            <TableHead className="py-3 px-4 text-center text-xs font-medium text-slate-600 uppercase tracking-wider">Remove</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <AnimatePresence initial={false}>
                            {cartItems.map((item) => (
                              <motion.tr
                                key={item.id}
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0, x: -50 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="border-b border-slate-200 hover:bg-sky-50/50"
                              >
                                <TableCell className="py-4 px-4 font-medium text-slate-800">
                                  <div className="flex items-center space-x-3">
                                    <img
                                      src={item.imageUrl}
                                      alt={item.name}
                                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover shadow-sm"
                                    />
                                    <div>
                                      <p className="font-semibold text-sm sm:text-base group-hover:text-blue-600">{item.name}</p>
                                      <p className="text-xs text-slate-500 hidden md:block">{item.description}</p>
                                      <p className="text-sm text-orange-600 sm:hidden">¥{item.price.toLocaleString()}</p> {/* Price for mobile view under name */}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4 px-4 text-slate-700 hidden sm:table-cell">¥{item.price.toLocaleString()}</TableCell>
                                <TableCell className="py-4 px-4">
                                  <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleQuantityChange(item.id, -1)}
                                      disabled={item.quantity <= 1}
                                      className="h-7 w-7 sm:h-8 sm:w-8 text-red-500 hover:bg-red-100"
                                      aria-label="Decrease quantity"
                                    >
                                      <MinusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </Button>
                                    <Input
                                      type="text" // Using text to better style the input as non-editable visually
                                      readOnly
                                      value={item.quantity}
                                      className="w-8 sm:w-10 h-7 sm:h-8 p-0 text-center border-slate-300 rounded-md focus-visible:ring-blue-500"
                                      aria-label={`Current quantity of ${item.name}`}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleQuantityChange(item.id, 1)}
                                      className="h-7 w-7 sm:h-8 sm:w-8 text-green-500 hover:bg-green-100"
                                      aria-label="Increase quantity"
                                    >
                                      <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </Button>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4 px-4 text-right font-semibold text-slate-800 hidden sm:table-cell">
                                  ¥{(item.price * item.quantity).toLocaleString()}
                                </TableCell>
                                <TableCell className="py-4 px-4 text-center">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full"
                                    aria-label={`Remove ${item.name} from cart`}
                                  >
                                    <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                  </Button>
                                </TableCell>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <Card className="shadow-xl sticky top-24 bg-white"> {/* Sticky for desktop */}
                    <CardHeader className="bg-blue-600 text-white p-4">
                      <CardTitle className="text-xl flex items-center justify-between">
                        <span>Subtotal</span>
                        <motion.span key={subtotal} initial={{ scale: 0.9, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                          ¥{subtotal.toLocaleString()}
                        </motion.span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-4">
                      <p className="text-sm text-slate-600">
                        Shipping and taxes will be calculated at checkout.
                      </p>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          size="lg"
                          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-base font-semibold"
                          onClick={() => navigate('/checkout')}
                        >
                          Proceed to Checkout
                        </Button>
                      </motion.div>
                    </CardContent>
                    <CardFooter className="p-4 border-t sm:hidden"> {/* Continue shopping for mobile at bottom of summary */}
                        <Button variant="outline" onClick={() => navigate('/menu')} className="w-full">
                            Continue Shopping
                        </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
          </motion.div>
        </main>
        <ThemedFooter />
      </div>
    </ThematicPageTransition>
  );
};

export default CartPage;