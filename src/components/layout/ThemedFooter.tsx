import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Mail, MapPin, ShieldCheck, FileText } from 'lucide-react';

interface ThemedFooterProps {}

const ThemedFooter: React.FC<ThemedFooterProps> = () => {
  console.log('ThemedFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sky-50 border-t border-sky-200 text-slate-700">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 mb-3 group">
              <Bell className="h-7 w-7 text-red-500 group-hover:animate-pulse" />
              <span className="font-bold text-xl text-blue-700">
                Dora-Restaurant
              </span>
            </Link>
            <p className="text-sm text-center md:text-left text-slate-600">
              Your magical culinary journey begins here!
            </p>
          </div>

          <nav className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center md:justify-start gap-x-6 gap-y-3 text-sm">
            <Link to="/contact" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Mail className="h-4 w-4" /> Contact Us
            </Link>
            <Link to="/location" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <MapPin className="h-4 w-4" /> Our Location
            </Link>
            <Link to="/terms-of-service" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <FileText className="h-4 w-4" /> Terms of Service
            </Link>
            <Link to="/privacy-policy" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <ShieldCheck className="h-4 w-4" /> Privacy Policy
            </Link>
          </nav>
          
          <div className="flex flex-col items-center md:items-end text-sm text-slate-600">
             {/* Placeholder for social media icons or other elements */}
             <p className="mb-2">Follow us for more fun!</p>
             <div className="flex gap-3">
                {/* Example: <FacebookIcon className="h-5 w-5 hover:text-blue-600" /> */}
             </div>
          </div>
        </div>
        
        <div className="border-t border-sky-200 pt-8 text-center">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Dora-Restaurant. All rights reserved. Inspired by the world of Doraemon.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            This is a fictional website for demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ThemedFooter;