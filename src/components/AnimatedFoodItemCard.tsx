import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart, Sparkles } from 'lucide-react';
import { toast as sonnerToast } from "sonner";

interface AnimatedFoodItemCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  onAddToCart: (itemId: string) => void;
}

const AnimatedFoodItemCard: React.FC<AnimatedFoodItemCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
  onAddToCart,
}) => {
  console.log(`AnimatedFoodItemCard loaded for item: ${name}, ID: ${id}`);

  const handleAddToCart = () => {
    onAddToCart(id);
    sonnerToast.success(`${name} added to your cart!`, {
      description: "Get ready for a delicious treat!",
      // Example of a possible action with sonner:
      // action: {
      //   label: "View Cart",
      //   onClick: () => { /* Navigate to cart page */ console.log("View Cart clicked from toast"); }
      // },
    });
  };

  return (
    <motion.div
      className="w-full h-full" // Ensure motion.div takes full space of its grid cell
      whileHover={{ scale: 1.03, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="overflow-hidden shadow-lg h-full flex flex-col group transition-all duration-300 ease-in-out">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={4 / 3}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x300?text=Delicious+Food'}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
          </AspectRatio>
          {/* Doraemon-themed motif placeholder */}
          <div className="absolute top-3 right-3 bg-blue-500 p-2 rounded-full shadow-md transform transition-all group-hover:rotate-12 group-hover:scale-110">
            <Sparkles className="h-5 w-5 text-yellow-300 fill-yellow-300" />
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-2 flex-grow">
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 line-clamp-3 min-h-[3.75rem]"> {/* approx 3 lines */}
            {description}
          </CardDescription>
          <p className="text-lg font-semibold text-red-600 pt-1">
            ¥{price.toLocaleString()}
          </p>
        </CardContent>

        <CardFooter className="p-4 border-t bg-slate-50/50">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AnimatedFoodItemCard;