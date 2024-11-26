// src/components/shared/RegularPost.tsx
import Image from 'next/image';
import { Post } from '@/lib/types';
import { VerifiedBadge } from './VerifiedBadge';

interface RegularPostProps {
  post: Post;
}

export default function RegularPost({ post }: RegularPostProps) {
  return (
    <div className="bg-card p-4 rounded-xl border border-gray-800 hover:bg-opacity-80 transition-all">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-1">
        <img
          src={post.creator.avatar}
          alt={post.creator.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex items-center space-x-1.5">
          <div className="flex items-center">
            <span className="font-medium text-text-primary">{post.creator.name}</span>
            <VerifiedBadge />
          </div>
          <span className="text-text-secondary text-sm">·</span>
          <span className="text-text-secondary text-sm">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <button className="ml-auto text-text-secondary hover:text-text-primary">
          •••
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <p className="text-text-primary text-[15px] leading-normal">{post.content}</p>
        {post.image && (
          <div className="relative rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt="Post image"
              width={500}
              height={300}
              className="w-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
        <button className="flex items-center space-x-1.5 text-text-secondary hover:text-purple-primary group">
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h8M12 8v8" />
          </svg>
          <span className="text-sm">{post.reposts}</span>
        </button>

        <button className="flex items-center space-x-1.5 text-text-secondary hover:text-purple-primary group">
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11v8a4 4 0 004 4h2a4 4 0 004-4v-8M7 11l5-5 5 5" />
          </svg>
          <span className="text-sm">{post.reposts}</span>
        </button>

        <button className="flex items-center space-x-1.5 text-text-secondary hover:text-purple-primary group">
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-sm">{post.likes}</span>
        </button>

        <button className="flex items-center space-x-1.5 text-text-secondary hover:text-purple-primary group">
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );
}