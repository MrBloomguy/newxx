'use client';

import { useAccount } from 'wagmi';
import { PhotoIcon, FaceSmileIcon, Square2StackIcon } from '@heroicons/react/24/outline';

export default function CreatePoll() {
  const { isConnected } = useAccount();

  return (
    <div className="bg-[#010409] p-4 rounded-xl border border-[#30363d] mb-4 shadow-lg">
      <div className="flex flex-col space-y-4">
        {/* Header Tabs */}
        <div className="flex items-center space-x-6 border-b border-[#30363d] pb-3">
          <div className="relative">
            <span className="font-semibold text-white">Compose</span>
            <div className="absolute bottom-[-12px] left-0 right-0 h-[2px] bg-[#8b5cf6]"></div>
          </div>
          <span className="text-[#8b949e]">Drafts</span>
          <button className="ml-auto text-[#8b949e] hover:text-white">
            ✕
          </button>
        </div>

        {/* Input Area */}
        <div className="flex space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#21262d] flex items-center justify-center">
            👤
          </div>
          <textarea
            placeholder="Start typing a new cast here..."
            className="flex-1 bg-transparent text-white placeholder-[#8b949e] text-lg resize-none focus:outline-none"
            disabled={!isConnected}
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#30363d]">
          {/* Left Actions */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-[#8b5cf6] bg-[#1c1c1c] px-3 py-1.5 rounded-lg hover:bg-[#30363d]">
              <span>🏠</span>
              <span>▼</span>
            </button>
            <button className="text-[#8b949e] hover:text-white">
              <PhotoIcon className="w-5 h-5" />
            </button>
            <button className="text-[#8b949e] hover:text-white">
              <FaceSmileIcon className="w-5 h-5" />
            </button>
            <button className="text-[#8b949e] hover:text-white">
              <Square2StackIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full border-2 border-[#8b949e]"></div>
            <button
              className={`px-5 py-1.5 rounded-full font-medium transition-colors ${
                isConnected
                  ? 'bg-[#8b5cf6] text-white hover:bg-[#7c3aed]'
                  : 'bg-[#21262d] text-[#8b949e]'
              }`}
              disabled={!isConnected}
            >
              Cast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}