'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-purple-600">
              Polls.bet
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
              Trending
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
              About
            </a>
          </nav>

          {/* Connect Button and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <ConnectButton />
            </div>
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-2 space-y-1">
              <a
                href="#"
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-gray-50"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-gray-50"
              >
                Trending
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-gray-50"
              >
                About
              </a>
              <div className="px-4 py-2">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}