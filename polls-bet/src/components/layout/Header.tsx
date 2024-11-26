'use client';

import ConnectWallet from "../shared/ConnectWallet";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[#1e293b] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold text-purple-500">Polls.bet</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">Home</a>
              <a href="#" className="text-gray-300 hover:text-white">Explore</a>
              <a href="#" className="text-gray-300 hover:text-white">My Polls</a>
            </nav>
          </div>
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}