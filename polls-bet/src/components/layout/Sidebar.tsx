'use client';

import { TrophyIcon, ArrowTrendingUpIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { LeaderboardUser, dailyLeaderboard, weeklyLeaderboard, monthlyLeaderboard } from '../../lib/LeaderboardData';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const getLeaderboardData = (): LeaderboardUser[] => {
    switch (activeTab) {
      case 'daily':
        return dailyLeaderboard;
      case 'weekly':
        return weeklyLeaderboard;
      case 'monthly':
        return monthlyLeaderboard;
      default:
        return dailyLeaderboard;
    }
  };

  return (
    <><aside className="hidden lg:flex w-64 flex-col fixed h-screen border-r border-[#2f3336]">
      {/* Sidebar content */}
    </aside>
    <div className="sticky top-20">
        <div className="bg-card rounded-xl shadow-lg p-4">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-4">
            <TrophyIcon className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-text-primary">Leaderboard</h2>
          </div>

          {/* Time Period Tabs */}
          <div className="flex space-x-2 mb-4">
            {['daily', 'weekly', 'monthly'].map((period: string) => (
              <button
                key={period}
                onClick={() => setActiveTab(period as 'daily' | 'weekly' | 'monthly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === period
                    ? 'bg-purple-primary text-white'
                    : 'text-text-secondary hover:bg-card hover:text-text-primary'}`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>

          {/* Leaderboard List */}
          <div className="space-y-3">
            {getLeaderboardData().map((user: LeaderboardUser) => (
              <div
                key={user.address}
                className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-foreground transition-all"
              >
                {/* Rank */}
                <div className="w-6 text-center font-bold text-text-secondary">
                  {user.rank}
                </div>

                {/* Avatar */}
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full" />

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary truncate">{user.name}</span>
                    <span className="text-xs text-text-secondary hidden sm:inline">{user.address}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-0.5 text-xs text-text-secondary">
                    <div className="flex items-center">
                      <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                      {user.winRate}%
                    </div>
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="w-3 h-3 mr-1" />
                      {user.totalWagered} ETH
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className="font-bold text-purple-primary">{user.score}</div>
                  <div className="text-xs text-text-secondary">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div></>
  );
}