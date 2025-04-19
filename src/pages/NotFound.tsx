
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 festive-gradient bg-clip-text text-transparent">404</h1>
          <p className="text-2xl text-gray-600 mb-8">Oops! We couldn't find that page.</p>
          <p className="text-gray-500 mb-10 max-w-md mx-auto">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          <Button size="lg" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
