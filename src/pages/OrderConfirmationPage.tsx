import React from 'react';
import { Link } from 'react-router-dom';
import ThemedHeader from '@/components/layout/ThemedHeader';
import ThematicPageTransition from '@/components/ThematicPageTransition';
import ThemedFooter from '@/components/layout/ThemedFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PartyPopper, Home, ShoppingBag } from 'lucide-react';

const OrderConfirmationPage = () => {
  console.log('OrderConfirmationPage loaded');

  // Placeholder order details - in a real app, this might come from route state or an API
  const orderDetails = {
    orderNumber: `DORA-${Math.floor(Math.random() * 90000) + 10000}`,
    estimatedDeliveryTime: "approx. 25-35 minutes",
    items: [
      { name: "Dorayaki Delight", quantity: 2, price: 300 },
      { name: "Memory Bread Toast", quantity: 1, price: 450 },
    ],
    totalAmount: 1050,
  };

  return (
    <ThematicPageTransition>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-100 via-yellow-50 to-pink-50">
        <ThemedHeader />
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center">
          <Card className="w-full max-w-xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-blue-500 text-white p-6 text-center">
              <PartyPopper className="h-16 w-16 mx-auto mb-4 text-yellow-300 animate-bounce" />
              <CardTitle className="text-3xl font-bold">Order Confirmed!</CardTitle>
              <CardDescription className="text-blue-100 text-lg mt-1">
                Your magical meal is on its way!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="text-center">
                <img 
                  src="https://pngimg.com/uploads/doraemon/doraemon_PNG42.png" 
                  alt="Happy Doraemon" 
                  className="h-32 w-32 mx-auto mb-4"
                />
                <p className="text-slate-700 text-lg">
                  Thank you for your order! Doraemon and friends are preparing your delicious treats with lots of love and a sprinkle of magic.
                </p>
              </div>

              <div className="border-t border-b border-dashed border-slate-300 py-4 space-y-2">
                <div className="flex justify-between items-center text-slate-800">
                  <span className="font-semibold">Order Number:</span>
                  <span className="font-mono text-blue-600">{orderDetails.orderNumber}</span>
                </div>
                <div className="flex justify-between items-center text-slate-800">
                  <span className="font-semibold">Estimated Arrival:</span>
                  <span className="font-medium">{orderDetails.estimatedDeliveryTime}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2 text-lg">Order Summary:</h3>
                <ul className="space-y-1 text-sm text-slate-600">
                  {orderDetails.items.map(item => (
                    <li key={item.name} className="flex justify-between">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>¥{(item.price * item.quantity).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-bold text-slate-800 mt-2 pt-2 border-t border-slate-200">
                  <span>Total:</span>
                  <span>¥{orderDetails.totalAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <p className="text-xs text-center text-slate-500 mt-4">
                You will receive an email confirmation shortly with your order details. If you have any questions, feel free to contact us!
              </p>
            </CardContent>
            <CardFooter className="bg-slate-50 p-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white">
                <Link to="/menu">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Continue Shopping
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Homepage
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
        <ThemedFooter />
      </div>
    </ThematicPageTransition>
  );
};

export default OrderConfirmationPage;