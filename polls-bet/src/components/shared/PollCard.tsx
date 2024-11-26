// src/components/shared/PollCard.tsx
'use client';

import { Poll } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { VerifiedBadge } from './VerifiedBadge';

interface PollCardProps {
  poll: Poll;
  onVote?: (pollId: number, vote: 'yes' | 'no') => void;
}

export default function PollCard({ poll, onVote }: PollCardProps) {
  return (
    <div className="bg-card p-4 rounded-xl border border-gray-800 hover:bg-opacity-80 transition-all">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-3">
        <img
          src={poll.creator.avatar}
          alt={poll.creator.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex items-center space-x-1.5 text-sm">
          <div className="flex items-center">
            <span className="font-medium text-text-primary">{poll.creator.name}</span>
            <VerifiedBadge />
          </div>
          <span className="text-purple-primary">challenges</span>
          <div className="flex items-center">
            <span className="font-medium text-blue-500">{poll.challengedUser}</span>
            <VerifiedBadge />
          </div>
        </div>
        <button className="ml-auto text-text-secondary hover:text-text-primary">
          •••
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <p className="text-text-primary text-[15px] leading-normal font-medium">
          {poll.prediction}
        </p>
        
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-text-secondary">Wager:</span>
          <span className="text-purple-primary font-medium">{poll.wager}</span>
        </div>

        {/* Voting Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button 
            onClick={() => onVote?.(poll.id, 'yes')}
            className="bg-green-500/10 hover:bg-green-500/20 text-green-500 py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 group"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Yes ({poll.votes.yes})</span>
          </button>
          <button 
            onClick={() => onVote?.(poll.id, 'no')}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 group"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>No ({poll.votes.no})</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-gray-800 text-sm">
        <span className="text-text-secondary">
          {formatDistanceToNow(poll.createdAt, { addSuffix: true })}
        </span>
        <span className="text-text-secondary">·</span>
        <span className={`font-medium ${
          poll.status === 'Active' 
            ? 'text-green-500' 
            : 'text-text-secondary'
        }`}>
          {poll.status}
        </span>

        {/* Action Buttons */}
        <div className="ml-auto flex items-center space-x-4">
          <button className="text-text-secondary hover:text-purple-primary group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button className="text-text-secondary hover:text-purple-primary group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}