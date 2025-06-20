import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Used in ThemedHeader/Footer, Dialog might link to cart
import { ThemedHeader } from '@/components/layout/ThemedHeader';
import { ThemedFooter } from '@/components/layout/ThemedFooter';
import GadgetIconButton from '@/components/GadgetIconButton';
import AnimatedFoodItemCard from '@/components/AnimatedFoodItemCard';
import ThematicPageTransition from '@/components/ThematicPageTransition';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast as sonnerToast } from "sonner";
import { Cookie, Wand2, Utensils, GlassWater, FilterX, ShoppingCart, HelpCircle } from 'lucide-react'; // Placeholder icons

interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  themeIcon?: React.ReactNode; // Optional: for a small thematic icon on the card or dialog
}

const sampleFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Classic Dorayaki',
    price: 350,
    description: "Doraemon's all-time favorite! Sweet red bean paste sandwiched between two fluffy, golden-brown pancakes. A taste of pure joy!",
    imageUrl: 'https://images.unsplash.com/photo-1582050150430-719205c58199?q=80&w=600&auto=format&fit=crop',
    category: 'Dorayaki & Sweets',
    themeIcon: <Cookie className="h-5 w-5 text-yellow-500" />,
  },
  {
    id: '2',
    name: 'Memory Bread French Toast',
    price: 600,
    description: 'A magical twist on French toast! Thick slices of "Memory Bread" soaked in a rich custard, pan-fried to perfection, and served with syrup and berries. Helps you ace your day!',
    imageUrl: 'https://images.unsplash.com/photo-1528740096961-3798add19cb7?q=80&w=600&auto=format&fit=crop',
    category: 'Magical Snacks',
  },
  {
    id: '3',
    name: 'Anywhere Door Margherita Pizza',
    price: 1250,
    description: 'A classic Margherita pizza that transports your taste buds to Italy! Fresh basil, mozzarella, and a tangy tomato sauce on a crispy crust.',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop',
    category: 'Main Courses',
  },
  {
    id: '4',
    name: 'Time Kerchief Carbonara',
    price: 1100,
    description: 'A comforting and timeless Carbonara pasta. Creamy egg-rich sauce, pancetta, and a generous sprinkle of Parmesan cheese.',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop',
    category: 'Main Courses',
  },
  {
    id: '5',
    name: "Gian's Mighty Ramen",
    price: 1150,
    description: "A bold and hearty ramen, just like Gian! Rich tonkotsu broth, tender chashu pork, a perfectly soft-boiled egg, and all the fixings. Surprisingly delicious!",
    imageUrl: 'https://images.unsplash.com/photo-1552633040-20b729c6ef45?q=80&w=600&auto=format&fit=crop',
    category: 'Main Courses',
  },
  {
    id: '6',
    name: "Shizuka's Sweet Potato Parfait",
    price: 550,
    description: 'A delightful and elegant sweet potato parfait, layered with cream, granola, and a hint of cinnamon. As lovely and gentle as Shizuka.',
    imageUrl: 'https://images.unsplash.com/photo-1590663209064-3dbd54859408?q=80&w=600&auto=format&fit=crop',
    category: 'Dorayaki & Sweets',
  },
  {
    id: '7',
    name: 'Small Light Citrus Soda',
    price: 400,
    description: 'A refreshingly light and bubbly soda infused with zesty citrus flavors. Makes you feel as light as a feather!',
    imageUrl: 'https://images.unsplash.com/photo-1541696432-82c6da8ce787?q=80&w=600&auto=format&fit=crop',
    category: 'Drinks',
  },
  {
    id: '8',
    name: 'Take-copter Coffee Jelly Swirl',
    price: 480,
    description: "A whimsical coffee jelly dessert swirled with vanilla cream, guaranteed to make you feel like you're flying! Topped with a cherry.",
    imageUrl: 'https://images.unsplash.com/photo-1610093030891-69862dd6f654?q=80&w=600&auto=format&fit=crop',
    category: 'Dorayaki & Sweets',
  },
];

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Dorayaki & Sweets': <Cookie className="h-5 w-5" />,
  'Magical Snacks': <Wand2 className="h-5 w-5" />,
  'Main Courses': <Utensils className="h-5 w-5" />,
  'Drinks': <GlassWater className="h-5 w-5" />,
  'Default': <HelpCircle className="h-5 w-5" />
};

const MenuPage: React.FC = () => {
  console.log('MenuPage loaded');
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = ['All', ...new Set(sampleFoodItems.map(item => item.category))];

  const handleViewItemDetails = (item: FoodItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleAddToCart = (itemId: string, itemName: string) => {
    console.log(`Item "${itemName}" (ID: ${itemId}) added to cart.`);
    // In a real app, this would interact with a cart context or API.
    // AnimatedFoodItemCard handles its own toast for direct adds.
    // This explicit call is useful if adding from the dialog.
    sonnerToast.success(`${itemName} added to your cart!`, {
      description: "Get ready for a delicious adventure!",
      action: {
        label: "View Cart",
        onClick: () => { 
          // This relies on react-router-dom's Link being available implicitly or navigating programmatically
          // For now, we'll just log it. A real app would use useNavigate() hook here.
          console.log("Navigate to /cart"); 
          window.location.href = '/cart'; // Simple navigation for now
        }
      },
    });
  };

  const handleFilterCategory = (category: string | null) => {
    setActiveCategory(category);
  };

  const filteredItems = activeCategory && activeCategory !== 'All'
    ? sampleFoodItems.filter(item => item.category === activeCategory)
    : sampleFoodItems;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 via-yellow-50 to-pink-50 font-sans">
      <ThemedHeader />
      <ThematicPageTransition>
        <ScrollArea className="flex-1">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <section className="text-center mb-10 md:mb-16">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/c/c8/Doraemon_2005.png" 
                alt="Doraemon Waving" 
                className="mx-auto h-20 sm:h-24 md:h-28 w-auto mb-4 transition-transform hover:scale-110 duration-300"
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 mb-3 tracking-tight drop-shadow-sm">
                Doraemon's Delicious Menu
              </h1>
              <p className="text-md sm:text-lg md:text-xl text-yellow-700 font-medium max-w-2xl mx-auto">
                Explore a world of flavors inspired by Doraemon's favorite gadgets and adventures!
              </p>
            </section>

            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 text-center mb-6">
                Discover by Category
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4">
                {categories.map(category => (
                  <GadgetIconButton
                    key={category}
                    icon={category === 'All' ? <FilterX className="h-5 w-5" /> : (categoryIcons[category] || categoryIcons['Default'])}
                    label={category}
                    gadgetName={`filter-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={() => handleFilterCategory(category === 'All' ? null : category)}
                    buttonVariant={activeCategory === category || (category === 'All' && activeCategory === null) ? 'default' : 'outline'}
                    buttonSize="default"
                    className={activeCategory === category || (category === 'All' && activeCategory === null) ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white hover:bg-blue-50'}
                  />
                ))}
              </div>
            </section>

            {filteredItems.length > 0 ? (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredItems.map(item => (
                  <div key={item.id} className="h-full" onClick={() => handleViewItemDetails(item)}>
                     {/* Wrapping div makes card clickable for dialog, ensure card uses h-full for layout consistency */}
                    <AnimatedFoodItemCard
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      description={item.description}
                      imageUrl={item.imageUrl}
                      onAddToCart={(itemId) => handleAddToCart(itemId, item.name)}
                    />
                  </div>
                ))}
              </section>
            ) : (
              <section className="text-center py-12">
                <HelpCircle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
                <p className="text-xl text-slate-700">
                  Oops! No {activeCategory ? `${activeCategory.toLowerCase()} ` : ''}items found.
                </p>
                <p className="text-slate-500">Try a different category or check back soon for more magical treats!</p>
                {activeCategory && (
                   <Button variant="link" onClick={() => handleFilterCategory(null)} className="mt-4 text-blue-600">
                    Show All Items
                  </Button>
                )}
              </section>
            )}
          </main>
        </ScrollArea>
      </ThematicPageTransition>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedItem && (
          <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden">
            <DialogHeader className="p-0"> {/* Remove padding to allow image to span full width */}
              <div className="relative">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-500 p-2 rounded-full shadow-md">
                  {categoryIcons[selectedItem.category] || categoryIcons['Default']}
                </div>
              </div>
              <div className="p-6 pb-2">
                <DialogTitle className="text-2xl sm:text-3xl font-bold text-blue-700 leading-tight">
                  {selectedItem.name}
                </DialogTitle>
              </div>
            </DialogHeader>
            <DialogDescription className="px-6 text-slate-600 text-sm sm:text-base leading-relaxed max-h-[150px] overflow-y-auto">
              {selectedItem.description}
            </DialogDescription>
            <div className="px-6 pt-2 pb-4">
                <p className="text-2xl sm:text-3xl font-semibold text-red-600">
                  ¥{selectedItem.price.toLocaleString()}
                </p>
            </div>
            <DialogFooter className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="w-full sm:w-auto border-slate-300 hover:bg-slate-100"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  handleAddToCart(selectedItem.id, selectedItem.name);
                  setIsDialogOpen(false);
                }}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <ThemedFooter />
    </div>
  );
};

export default MenuPage;