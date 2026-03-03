import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ReservationPage } from './pages/ReservationPage';
import { ContactPage } from './pages/ContactPage';
import { OrderPage } from './pages/OrderPage';
import { AdminPage } from './pages/AdminPage';
import { Toaster } from 'react-hot-toast';
import { MenuItem } from './lib/database';

function App() {
  const [currentPage, setCurrentPage] = useState('accueil');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Handle admin route
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) {
      setIsAdmin(true);
    }
  }, []);

  // Handle direct links or browser back/forward if needed
  // For simplicity, we use internal state routing
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Handle page change with optional item parameter
  const handlePageChange = (page: string, item?: MenuItem) => {
    if (item) {
      setSelectedItem(item);
    } else if (page !== 'order') {
      // Clear selected item when navigating to other pages
      setSelectedItem(null);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil':
        return <HomePage onPageChange={handlePageChange} />;
      case 'menu':
        return <MenuPage onPageChange={handlePageChange} />;
      case 'order':
        return <OrderPage initialItem={selectedItem} />;
      case 'reservation':
        return <ReservationPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  // If admin route, show admin page
  if (isAdmin) {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
