'use client';

import { useState } from 'react';
import { dummyFeed } from '@/lib/dummyData';
import PollCard from './PollCard';
import { Poll, Post } from '@/lib/types';
import { useAccount } from 'wagmi';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function PostFeed() {
  const { address, isConnected } = useAccount();
  const [posts, setPosts] = useState<(Post | Poll)[]>(dummyFeed);
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setSelectedImage(URL.createObjectURL(file));
        setIsUploading(false);
      }, 1000);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return;
    }

    // Check if this is a challenge post
    const isPollsBot = content.includes('/pollsbot');
    const mentionMatch = content.match(/@(\w+)/);
    
    if (isPollsBot && mentionMatch) {
      // This is a challenge post
      const challengedUser = mentionMatch[0];
      // Extract wager amount (assuming format: "0.1 ETH" or similar)
      const wagerMatch = content.match(/(\d+\.?\d*)\s*(ETH|BTC|SOL)/i);
      const wager = wagerMatch ? wagerMatch[0] : '0 ETH';

      const newPoll: Poll = {
        id: posts.length + 1,
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
        id: posts.length + 1,
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
    <div className="space-y-4">
      {/* Create Post Box */}
      <div className="bg-white p-4 rounded-xl shadow">
        <form onSubmit={handleCreatePost}>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              👤
            </div>
            <div className="flex-1 space-y-3">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening? Use /pollsbot @username to create a challenge"
                className="w-full border border-gray-200 rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={!isConnected}
              />
              
              {selectedImage && (
                <div className="relative">
                  <Image
                    src={selectedImage}
                    alt="Selected image"
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-500">
                  <label className="cursor-pointer hover:bg-gray-100 p-2 rounded-full">
                    <PhotoIcon className="w-6 h-6" />
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
                  className={`px-4 py-2 rounded-lg font-medium ${
                    isConnected && content.trim()
                      ? 'bg-purple-500 text-white hover:bg-purple-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  disabled={!isConnected || !content.trim()}
                >
                  {isUploading ? 'Uploading...' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          post.type === 'challenge' ? (
            <PollCard key={post.id} poll={post as Poll} />
          ) : (
            <RegularPost key={post.id} post={post as Post} />
          )
        ))}
      </div>
    </div>
  );
}

function RegularPost({ post }: { post: Post }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex space-x-3">
        <img
          src={post.creator.avatar}
          alt={post.creator.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{post.creator.name}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-2">{post.content}</p>
          {post.image && (
            <div className="mt-3">
              <Image
                src={post.image}
                alt="Post image"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          )}
          <div className="mt-3 flex items-center space-x-6 text-gray-500">
            <button className="flex items-center space-x-2 hover:text-purple-500">
              <span>❤️</span>
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-purple-500">
              <span>🔄</span>
              <span>{post.reposts}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}