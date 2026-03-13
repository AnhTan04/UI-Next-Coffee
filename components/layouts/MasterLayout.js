import Navbar from './Navbar';
import Footer from './Footer';
import { HeroUIProvider } from '@heroui/react';

const MasterLayout = ({ children }) => {
  return (
    <HeroUIProvider>
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
    </HeroUIProvider>
  );
};

export default MasterLayout;