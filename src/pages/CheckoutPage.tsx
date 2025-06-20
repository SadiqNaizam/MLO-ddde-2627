import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';

import ThemedHeader from '@/components/layout/ThemedHeader';
import ThemedFooter from '@/components/layout/ThemedFooter';
import ThematicPageTransition from '@/components/ThematicPageTransition';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast as sonnerToast } from "sonner";
import { User, Mail, Phone, Home as HomeIcon, Truck, CreditCard, PackageCheck, Building, Clock } from 'lucide-react';

const pickupLocations = [
  { id: "dora_bell_cafe", name: "Doraemon's Bell Cafe - Downtown" },
  { id: "anywhere_door_point", name: "Anywhere Door Pickup Point - Suburbia" },
  { id: "nobitas_house_eats", name: "Nobita's House Eats - Residential Area" },
];

const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Please enter your full name (at least 2 characters)." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number (at least 10 digits)." }).regex(/^\+?[0-9\s-()]{10,}$/, "Invalid phone number format."),
  orderType: z.enum(['delivery', 'pickup'], { required_error: "Please select delivery or pickup." }),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  pickupLocation: z.string().optional(),
  pickupTime: z.string().optional(),
  paymentMethod: z.enum(['credit_card', 'dora_pay', 'cash_on_delivery'], { required_error: "Please select a payment method." }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions." }),
}).superRefine((data, ctx) => {
  if (data.orderType === 'delivery') {
    if (!data.addressLine1 || data.addressLine1.length < 5) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Address line is required for delivery (min 5 characters).", path: ['addressLine1'] });
    }
    if (!data.city || data.city.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "City is required for delivery (min 2 characters).", path: ['city'] });
    }
    if (!data.postalCode || !/^[A-Za-z0-9\s-]{3,}$/.test(data.postalCode)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid postal code is required for delivery.", path: ['postalCode'] });
    }
  }
  if (data.orderType === 'pickup') {
    if (!data.pickupLocation) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please select a pickup location.", path: ['pickupLocation'] });
    }
    if (!data.pickupTime) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please select a pickup time.", path: ['pickupTime'] });
    }
  }
  if (data.paymentMethod === 'credit_card') {
    if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid 16-digit card number is required.", path: ['cardNumber'] });
    }
    if (!data.cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry)) { // MM/YY
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid expiry date (MM/YY) is required.", path: ['cardExpiry'] });
    }
    if (!data.cardCvc || !/^\d{3,4}$/.test(data.cardCvc)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid CVC (3 or 4 digits) is required.", path: ['cardCvc'] });
    }
  }
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const sectionAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [currentOrderType, setCurrentOrderType] = useState<'delivery' | 'pickup' | undefined>(undefined);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      orderType: undefined,
      addressLine1: '',
      city: '',
      postalCode: '',
      pickupLocation: '',
      pickupTime: '',
      paymentMethod: undefined,
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      agreeToTerms: false,
    },
  });

  const watchOrderType = form.watch('orderType');
  const watchPaymentMethod = form.watch('paymentMethod');

  React.useEffect(() => {
    setCurrentOrderType(watchOrderType);
  }, [watchOrderType]);

  function onSubmit(data: CheckoutFormValues) {
    console.log('Checkout form submitted:', data);
    sonnerToast.success("Processing your magical order!", {
      description: "Hold on to your Gadget Hats!",
      duration: 3000,
    });
    // Simulate API call
    setTimeout(() => {
      navigate('/order-confirmation', { state: { orderDetails: data } }); // Navigate to order confirmation page
    }, 2000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <ThemedHeader />
      <ThematicPageTransition>
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3 text-center">
              Checkout - Almost There!
            </h1>
            <p className="text-center text-slate-600 mb-8 md:mb-12 max-w-xl mx-auto">
              Just a few more details and your Doraemon-themed feast will be on its way. It's going to be magically delicious!
            </p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Contact Information Section */}
              <motion.div {...sectionAnimation}>
                <Card className="shadow-lg border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-2xl text-blue-700 flex items-center"><User className="mr-2 h-6 w-6 text-blue-500" />Your Details</CardTitle>
                    <CardDescription>So we know how to reach you with updates about your exciting order.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Nobita Nobi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="e.g., nobita@doraemon.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="e.g., (123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Delivery or Pickup Section */}
              <motion.div {...sectionAnimation} transition={{ ...sectionAnimation.transition, delay: 0.1 }}>
                <Card className="shadow-lg border-yellow-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-yellow-700 flex items-center"><Truck className="mr-2 h-6 w-6 text-yellow-500" />Delivery or Pickup?</CardTitle>
                    <CardDescription>How would you like to receive your Dora-treats?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="orderType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value);
                                setCurrentOrderType(value as 'delivery' | 'pickup');
                              }}
                              defaultValue={field.value}
                              className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="delivery" />
                                </FormControl>
                                <FormLabel className="font-normal">Delivery (via Take-copter!)</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="pickup" />
                                </FormControl>
                                <FormLabel className="font-normal">Pickup (at a Gadget Stop!)</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {currentOrderType === 'delivery' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="space-y-4 pt-4 border-t border-yellow-200">
                         <FormField
                          control={form.control}
                          name="addressLine1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center"><HomeIcon className="mr-2 h-4 w-4" /> Delivery Address</FormLabel>
                              <FormControl><Input placeholder="123 Anywhere Door Street" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl><Input placeholder="Future City" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl><Input placeholder="D0R A3M" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.div>
                    )}

                    {currentOrderType === 'pickup' && (
                       <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="space-y-4 pt-4 border-t border-yellow-200">
                        <FormField
                          control={form.control}
                          name="pickupLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center"><Building className="mr-2 h-4 w-4" />Pickup Location</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Select a Gadget Stop" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {pickupLocations.map(loc => (
                                    <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="pickupTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center"><Clock className="mr-2 h-4 w-4" />Preferred Pickup Time</FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Select a time slot" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="12:00">12:00 PM - 12:30 PM</SelectItem>
                                  <SelectItem value="13:00">1:00 PM - 1:30 PM</SelectItem>
                                  <SelectItem value="18:00">6:00 PM - 6:30 PM</SelectItem>
                                  <SelectItem value="19:00">7:00 PM - 7:30 PM</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Payment Information Section */}
              <motion.div {...sectionAnimation} transition={{ ...sectionAnimation.transition, delay: 0.2 }}>
                <Card className="shadow-lg border-red-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-red-700 flex items-center"><CreditCard className="mr-2 h-6 w-6 text-red-500" />Payment Magic</CardTitle>
                    <CardDescription>Choose your preferred way to complete this wonderful transaction.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select payment method" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="credit_card">Credit/Debit Card</SelectItem>
                              <SelectItem value="dora_pay">DoraPay (Instant Gadget Points!)</SelectItem>
                              <SelectItem value="cash_on_delivery">Cash on Delivery/Pickup (Time Machine Money)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {watchPaymentMethod === 'credit_card' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="space-y-4 pt-4 border-t border-red-200">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="cardExpiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry (MM/YY)</FormLabel>
                                <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cardCvc"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl><Input placeholder="•••" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.div>
                    )}
                     {watchPaymentMethod === 'dora_pay' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-blue-50 rounded-md text-blue-700">
                        <p>Great choice! DoraPay is quick and easy. You'll be redirected to the DoraPay portal (simulation).</p>
                      </motion.div>
                    )}
                    {watchPaymentMethod === 'cash_on_delivery' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-green-50 rounded-md text-green-700">
                        <p>Excellent! Please have the exact amount ready for our Delivery Dorayaki Drone or at the Pickup Point.</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Terms and Conditions */}
              <motion.div {...sectionAnimation} transition={{ ...sectionAnimation.transition, delay: 0.3 }}>
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-white">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Agree to our <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Terms and Conditions of Fun</a>
                        </FormLabel>
                        <FormDescription>
                          By checking this, you agree to have a magically delicious time!
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div {...sectionAnimation} transition={{ ...sectionAnimation.transition, delay: 0.4 }} className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 text-lg transform hover:scale-105 transition-all duration-300"
                  disabled={form.formState.isSubmitting}
                >
                  <PackageCheck className="mr-2 h-6 w-6" />
                  {form.formState.isSubmitting ? "Placing Order..." : "Place My Magical Order!"}
                </Button>
              </motion.div>
            </form>
          </Form>
        </main>
      </ThematicPageTransition>
      <ThemedFooter />
    </div>
  );
};

export default CheckoutPage;