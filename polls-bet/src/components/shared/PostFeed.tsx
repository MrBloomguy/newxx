'use client';

import { useState } from 'react';
import { dummyFeed } from '@/lib/dummyData';
import PollCard from './PollCard';
import RegularPost from './RegularPost';
import { Poll, Post } from '@/lib/types';
import { useAccount } from 'wagmi';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function PostFeed() {
  const { address, isConnected } = useAccount();
  const [posts, setPosts] = useState<(Post | Poll)[]>(dummyFeed);
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Remove image handler
  const removeImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage); // Clean up the object URL
      setSelectedImage(null);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return;
    }

    // Generate a new ID based on the current posts length
    const newId = Math.max(...posts.map(post => post.id), 0) + 1;

    // Check if this is a challenge post
    const isPollsBot = content.includes('/pollsbot');
    const mentionMatch = content.match(/@(\w+)/);
    
    if (isPollsBot && mentionMatch) {
      // This is a challenge post
      const challengedUser = mentionMatch[0];
      const wagerMatch = content.match(/(\d+\.?\d*)\s*(ETH|BTC|SOL)/i);
      const wager = wagerMatch ? wagerMatch[0] : '0 ETH';

      const newPoll: Poll = {
        id: newId,
        type: 'challenge',
        creator: {
          name: `User${address?.slice(0, 6)}`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`,
          address: address || '0x',
        },
        challengedUser,
        prediction: content.replace('/pollsbot', '').replace(challengedUser, '').trim(),
        wager,
        createdAt: Date.now(),
        votes: { yes: 0, no: 0 },
        status: 'Active',
      };

      setPosts(currentPosts => [newPoll, ...currentPosts]);
    } else {
      // This is a regular post
      const newPost: Post = {
        id: newId,
        type: 'post',
        creator: {
          name: `User${address?.slice(0, 6)}`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`,
          address: address || '0x',
        },
        content,
        image: selectedImage,
        createdAt: Date.now(),
        likes: 0,
        reposts: 0,
      };

      setPosts(currentPosts => [newPost, ...currentPosts]);
    }

    // Reset form
    setContent('');
    setSelectedImage(null);
  };

  return (
    <div className="space-y-4 mb-16 sm:mb-0">
      {/* Create Post Box */}
      <div className="bg-[#010409] p-4 rounded-xl border border-[#30363d] shadow-lg">
        <form onSubmit={handleCreatePost}>
          <div className="flex items-start space-x-3">
            {isConnected ? (
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`}
                alt="Your avatar"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#21262d] flex items-center justify-center">
                👤
              </div>
            )}
            <div className="flex-1 space-y-3">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={isConnected ? 
                  "What's happening? Use /pollsbot @username to create a challenge" : 
                  "Connect your wallet to post"
                }
                className="w-full bg-transparent border-none rounded-lg p-2 sm:p-3 h-20 sm:h-24 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] text-white placeholder-[#8b949e]"
                disabled={!isConnected}
              />
              
              {selectedImage && (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected image"
                    className="rounded-lg w-full max-h-[200px] sm:max-h-[300px] object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-[#30363d]">
                <div className="flex items-center space-x-2 text-[#8b949e]">
                  <label className={`cursor-pointer p-1.5 sm:p-2 rounded-full transition-colors ${
                    isConnected ? 'hover:bg-[#21262d]' : 'opacity-50'
                  }`}>
                    <PhotoIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={!isConnected}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className={`px-5 py-1.5 rounded-full font-medium transition-colors ${
                    isConnected && content.trim()
                      ? 'bg-[#8b5cf6] text-white hover:bg-[#7c3aed]'
                      : 'bg-[#21262d] text-[#8b949e] cursor-not-allowed'
                  }`}
                  disabled={!isConnected || !content.trim()}
                >
                  {isUploading ? 'Uploading...' : 'Cast'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post, index) => {
          const uniqueKey = `${post.type}-${post.id}-${index}`;
          
          if (post.type === 'challenge') {
            return <PollCard key={uniqueKey} poll={post as Poll} />;
          }
          
          return <RegularPost key={uniqueKey} post={post as Post} />;
        })}
      </div>
    </div>
  );
}