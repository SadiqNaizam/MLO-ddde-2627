import React from 'react';
import AnimatedFoodItemCard from '@/components/AnimatedFoodItemCard'; // Assuming this path is correct based on your project structure
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PackageOpen } from 'lucide-react'; // Icon for empty state

// Interface for individual food item data
interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  // Add any other props that AnimatedFoodItemCard might expect, e.g., slug for navigation
}

// Props for the BestsellersShowcase component
interface BestsellersShowcaseProps {
  items: FoodItem[];
  title?: string;
}

const BestsellersShowcase: React.FC<BestsellersShowcaseProps> = ({
  items,
  title = "Doraemon's Favorites",
}) => {
  console.log('BestsellersShowcase loaded');

  if (!items || items.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-sky-50">
        <div className="container mx-auto px-4 text-center">
          <PackageOpen className="mx-auto h-16 w-16 text-sky-400 mb-4" />
          <h2 className="text-2xl font-semibold text-sky-700 mb-2">{title}</h2>
          <p className="text-gray-600">
            No bestselling items to display at the moment. Please check back soon!
          </p>
        </div>
      </section>
    );
  }

  // Determine number of items visible on LG screen for loop condition
  // If lg:basis-1/3, then 3 items are visible. Loop if more than 3.
  const shouldLoop = items.length > 3;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-sky-100 via-yellow-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          {/* Placeholder for a Doraemon-themed animated SVG or Lottie animation */}
          {/* e.g., <img src="/doraemon-joyful-icon.svg" alt="Doraemon" className="mx-auto h-20 w-20 mb-4" /> */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-3 tracking-tight drop-shadow-sm">
            {title}
          </h2>
          <p className="text-md md:text-lg text-yellow-600 font-medium max-w-2xl mx-auto">
            Discover the most loved treats and delightful dishes from Doraemon's wonderful world!
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: shouldLoop,
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto group relative"
        >
          <CarouselContent className="-ml-4">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-full min-[480px]:basis-1/2 lg:basis-1/3" // 1 on xs, 2 on sm/md, 3 on lg+
              >
                <div className="p-1 h-full"> {/* h-full ensures cards in a row can align if they have similar structures */}
                  <AnimatedFoodItemCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    // Pass other necessary props to AnimatedFoodItemCard
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {items.length > 1 && ( // Show controls only if there's something to scroll
            <>
              <CarouselPrevious
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full z-10 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all
                           opacity-0 group-hover:opacity-100 focus:opacity-100 md:opacity-100 
                           disabled:opacity-30 disabled:cursor-not-allowed border border-gray-200"
                aria-label="Previous slide"
              />
              <CarouselNext
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full z-10 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all
                           opacity-0 group-hover:opacity-100 focus:opacity-100 md:opacity-100
                           disabled:opacity-30 disabled:cursor-not-allowed border border-gray-200"
                aria-label="Next slide"
              />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default BestsellersShowcase;