'use client';

import { HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-gray-800 lg:hidden z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link href="/" className="flex flex-col items-center p-4 text-text-secondary hover:text-purple-primary">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link href="/explore" className="flex flex-col items-center p-4 text-text-secondary hover:text-purple-primary">
          <MagnifyingGlassIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Explore</span>
        </Link>
        
        <Link href="/create" className="flex flex-col items-center p-4 text-text-secondary hover:text-purple-primary">
          <PlusCircleIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Create</span>
        </Link>
        
        <Link href="/profile" className="flex flex-col items-center p-4 text-text-secondary hover:text-purple-primary">
          <UserIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
}