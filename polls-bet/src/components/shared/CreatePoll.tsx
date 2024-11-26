'use client';

import { useState, useRef, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { PhotoIcon, FaceSmileIcon, Square2StackIcon } from '@heroicons/react/24/outline';
import { VerifiedBadge } from './VerifiedBadge';

const emojis = ['👍', '❤️', '😊', '🎉', '🔥', '👀', '🙌', '💯', '🚀', '✨'];

export default function CreatePoll() {
  const { isConnected } = useAccount();
  
  // State declarations
  const [activeTab, setActiveTab] = useState<'compose' | 'drafts'>('compose');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [content, setContent] = useState('');
  const [drafts, setDrafts] = useState<string[]>([]);
  
  // Refs
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Click outside handler for emoji picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Emoji handler
  const addEmoji = (emoji: string) => {
    setContent(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Draft handler
  const saveDraft = () => {
    if (content.trim()) {
      setDrafts(prev => [...prev, content]);
      setContent('');
    }
  };

  return (
    <div className="bg-[#010409] rounded-xl border border-[#30363d] shadow-lg">
      <div className="flex flex-col">
        {/* Header Tabs */}
        <div className="flex items-center space-x-6 border-b border-[#30363d] p-3">
          <div 
            className={`relative cursor-pointer ${activeTab === 'compose' ? 'text-white' : 'text-[#8b949e]'}`}
            onClick={() => setActiveTab('compose')}
          >
            <span className="font-semibold">Compose</span>
            {activeTab === 'compose' && (
              <div className="absolute bottom-[-12px] left-0 right-0 h-[2px] bg-[#8b5cf6]"></div>
            )}
          </div>
          <div 
            className={`relative cursor-pointer ${activeTab === 'drafts' ? 'text-white' : 'text-[#8b949e]'}`}
            onClick={() => setActiveTab('drafts')}
          >
            <span className="font-semibold">Drafts</span>
            {activeTab === 'drafts' && (
              <div className="absolute bottom-[-12px] left-0 right-0 h-[2px] bg-[#8b5cf6]"></div>
            )}
          </div>
          <button className="ml-auto text-[#8b949e] hover:text-white">
            ✕
          </button>
        </div>

        {activeTab === 'compose' ? (
          <div className="p-3">
            {/* Input Area */}
            <div className="flex space-x-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#21262d] flex items-center justify-center">
                  👤
                </div>
                <VerifiedBadge className="absolute -bottom-1 -right-1" />
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start typing a new cast here..."
                className="flex-1 bg-transparent text-white placeholder-[#8b949e] text-base resize-none focus:outline-none h-12 py-1"
                disabled={!isConnected}
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#30363d]">
              {/* Left Actions */}
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-1 text-[#8b5cf6] bg-[#1c1c1c] px-2 py-1 rounded-lg hover:bg-[#30363d] text-sm">
                  <span>🏠</span>
                  <span>▼</span>
                </button>
                <button className="text-[#8b949e] hover:text-white">
                  <PhotoIcon className="w-4 h-4" />
                </button>
                <div className="relative" ref={emojiPickerRef}>
                  <button 
                    className="text-[#8b949e] hover:text-white"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <FaceSmileIcon className="w-4 h-4" />
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute bottom-8 left-0 z-10 bg-[#1c1c1c] border border-[#30363d] rounded-lg p-2 shadow-lg">
                      <div className="grid grid-cols-5 gap-2">
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            onClick={() => addEmoji(emoji)}
                            className="hover:bg-[#30363d] p-1 rounded"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  className="text-[#8b949e] hover:text-white"
                  onClick={saveDraft}
                >
                  <Square2StackIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full border-2 border-[#8b949e]"></div>
                <button
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                    isConnected && content.trim()
                      ? 'bg-[#8b5cf6] text-white hover:bg-[#7c3aed]'
                      : 'bg-[#21262d] text-[#8b949e]'
                  }`}
                  disabled={!isConnected || !content.trim()}
                >
                  Cast
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Drafts Tab Content
          <div className="p-3 text-[#8b949e] min-h-[100px]">
            {drafts.length > 0 ? (
              <div className="space-y-2">
                {drafts.map((draft, index) => (
                  <div 
                    key={index}
                    className="p-2 border border-[#30363d] rounded-lg hover:bg-[#1c1c1c] cursor-pointer"
                    onClick={() => {
                      setContent(draft);
                      setDrafts(drafts.filter((_, i) => i !== index));
                      setActiveTab('compose');
                    }}
                  >
                    {draft.slice(0, 100)}...
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">No drafts yet</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}