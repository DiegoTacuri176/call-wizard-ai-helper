
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Headphones, User } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-900">
            AI Demo
          </Link>
          <div className="flex gap-2">
            <Button
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/">
                <User className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button
              variant={location.pathname === '/customer-service' ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/customer-service">
                <Headphones className="h-4 w-4 mr-2" />
                Customer Service
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
