import React from 'react';
import { Link } from 'react-router-dom';
import ThemedHeader from '@/components/layout/ThemedHeader';
import BestsellersShowcase from '@/components/BestsellersShowcase';
import ThematicPageTransition from '@/components/ThematicPageTransition';
import ThemedFooter from '@/components/layout/ThemedFooter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

// Placeholder data for BestsellersShowcase matching the FoodItem interface in BestsellersShowcase.tsx
const bestsellingItems = [
  {
    id: 'dora001',
    name: "Doraemon's Dorayaki Delight",
    price: 350,
    description: "The classic, fluffy pancakes filled with sweet red bean paste. Doraemon's absolute favorite!",
    imageUrl: 'https://images.unsplash.com/photo-1607300169137-b2510a16999e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9yYXlha2l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    // onAddToCart is handled by AnimatedFoodItemCard itself
  },
  {
    id: 'dora002',
    name: 'Anywhere Door Doughnuts',
    price: 480,
    description: 'Magically delicious doughnuts that can take your taste buds anywhere! Assorted flavors.',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78d8d5d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG91Z2hudXRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'dora003',
    name: "Time Kerchief Tempura",
    price: 650,
    description: "Crispy, golden tempura that's so good, you'll wish you could turn back time to eat it again!",
    imageUrl: 'https://images.unsplash.com/photo-1579887829603-69997c207880?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVtcHVyYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'dora004',
    name: "Memory Bread French Toast",
    price: 520,
    description: 'Sweet and savory french toast. So memorable, you will not forget this taste! (Actual memory improvement not included).',
    imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlbmNoJTIwdG9hc3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 antialiased">
      <ThemedHeader />

      <ThematicPageTransition>
        <main className="flex-grow">
          {/* Hero Section */}
          <section
            className="relative py-24 md:py-40 bg-cover bg-center text-white"
            // Using a generic vibrant, playful background. Replace with a Doraemon-specific one if available.
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504610926078-a1611febcad3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')" }}
          >
            <div className="absolute inset-0 bg-blue-600 opacity-60"></div> {/* Doraemon-themed overlay */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              {/* Optional: Doraemon character image */}
              {/* <img src="/path-to-doraemon-character.png" alt="Doraemon Welcomes You" className="mx-auto mb-8 h-40 sm:h-48 md:h-56" /> */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl"
              >
                Welcome to <span className="text-yellow-300">Dora-Restaurant!</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 max-w-xl sm:max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed drop-shadow-md"
              >
                Embark on a delightful culinary journey into the whimsical world of Doraemon. Unforgettable flavors await!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, type: 'spring', stiffness: 120 }} 
                className="mt-10"
              >
                <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-blue-700 font-bold text-lg py-3.5 px-10 rounded-full shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">
                  <Link to="/menu"> {/* Path from App.tsx */}
                    Discover Our Menu <ArrowRight className="ml-2.5 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            {/* Decorative elements */}
            <div className="absolute bottom-5 left-5 z-10 hidden md:block opacity-80">
                <Sparkles className="h-10 w-10 text-yellow-200 animate-pulse" />
            </div>
            <div className="absolute top-10 right-8 z-10 hidden md:block opacity-80">
                <Sparkles className="h-12 w-12 text-pink-300 animate-ping duration-1000" />
            </div>
          </section>

          {/* Bestsellers Showcase Section */}
          <BestsellersShowcase items={bestsellingItems} title="Doraemon's Favorite Gadget-Dishes!" />

          {/* Additional Thematic Section */}
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
               {/* Optional: Another Doraemon visual element */}
              {/* <img src="/doraemon-eating.svg" alt="Doraemon Enjoying Food" className="mx-auto h-24 mb-6" /> */}
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6">
                More Adventures, More Flavors!
              </h2>
              <p className="text-lg text-slate-700 mb-10 max-w-lg mx-auto">
                Our kitchen is always cooking up new surprises. Check out the full menu to find your next favorite dish!
              </p>
              <Button asChild variant="outline" size="lg" className="text-orange-600 border-orange-500 hover:bg-orange-500 hover:text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
                <Link to="/menu"> {/* Path from App.tsx */}
                  View Full Menu
                </Link>
              </Button>
            </div>
          </section>

        </main>
      </ThematicPageTransition>

      <ThemedFooter />
    </div>
  );
};

// Import motion from framer-motion for the animation examples.
// If not already globally available, add:
import { motion } from 'framer-motion';

export default Homepage;