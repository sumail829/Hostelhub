'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Bed, Coffee, DollarSign, Info, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Rooms', href: '/rooms', icon: Bed },
    { name: 'Services', href: '/services', icon: Coffee },
    { name: 'About Us', href: '/about', icon: Info },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Bed className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">HostelHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary flex items-center space-x-1"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link href="/admin/login">Login as Admin</Link>
              </Button>


              <Button variant="outline" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/login">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="flex flex-col space-y-2 px-3 py-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </Button>
              <Button variant="default" className="w-full" asChild>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}