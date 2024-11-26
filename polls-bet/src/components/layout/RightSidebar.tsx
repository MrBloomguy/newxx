'use client';

import { dummyFeed } from '@/lib/dummyData';
import { Poll } from '@/lib/types';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { format, formatDistance, formatDistanceToNow } from 'date-fns';

export default function RightSidebar() {
  const trendingPolls = dummyFeed
    .filter((item): item is Poll => item.type === 'challenge')
    .sort((a, b) => (b.votes.yes + b.votes.no) - (a.votes.yes + a.votes.no))
    .slice(0, 3);

  return (
    <div className="sticky top-20">
      <div className="space-y-4">
        {/* Auth Card */}
        <div className="bg-card p-4 rounded-xl shadow">
          <div className="text-center">
            <h3 className="font-bold text-text-primary mb-4">Welcome to Polls.bet</h3>
            <p className="text-text-secondary mb-4">
              Connect your wallet to start creating challenges and participating in predictions
            </p>
            <ConnectButton />
          </div>
        </div>

        {/* Trending Challenges */}
        <div className="bg-card p-4 rounded-xl shadow">
          <h3 className="font-bold text-text-primary mb-4">🔥 Trending Challenges</h3>
          <div className="space-y-3">
            {trendingPolls.map(poll => (
              <div 
                key={poll.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-foreground transition-all cursor-pointer"
              >
                <img 
                  src={poll.creator.avatar} 
                  alt={poll.creator.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {poll.prediction}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-text-secondary mt-1">
                    <span>{poll.votes.yes + poll.votes.no} votes</span>
                    <span>•</span>
                    <span>{poll.wager}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(poll.createdAt, { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-card p-4 rounded-xl shadow">
          <h3 className="font-bold text-text-primary mb-4">Quick Links</h3>
          <div className="space-y-2">
            <a href="#" className="block text-text-secondary hover:text-purple-primary transition-all">
              How it works
            </a>
            <a href="#" className="block text-text-secondary hover:text-purple-primary transition-all">
              FAQ
            </a>
            <a href="#" className="block text-text-secondary hover:text-purple-primary transition-all">
              Terms of Service
            </a>
            <a href="#" className="block text-text-secondary hover:text-purple-primary transition-all">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-text-secondary">
          <p>© 2024 Polls.bet</p>
          <p className="mt-1">All rights reserved</p>
        </div>
      </div>
    </div>
  );
}