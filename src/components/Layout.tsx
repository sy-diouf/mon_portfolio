import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <div className="flex flex-col min-h-screen relative overflow-x-hidden max-w-[100vw]">
        <Header />
        <main className="flex-grow overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </AnimatePresence>
  );
};

export default Layout;