
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="text-center space-y-8 p-8">
        <div>
          <h1 className="text-5xl font-bold text-orange-600 mb-4">RasoiBot</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your AI-powered kitchen companion for discovering amazing recipes and cooking tips
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link to="/login">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-3">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
