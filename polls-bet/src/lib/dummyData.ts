// src/lib/dummyData.ts
import { Post, Poll } from './types';

type FeedItem = (Post | Poll);

export const dummyFeed: FeedItem[] = [
  // Regular Posts
  {
    id: 7,
    type: 'post',
    creator: {
      name: "CryptoNews",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=news",
      address: "0x9999...1111"
    },
    content: "Just published my latest analysis on the crypto market trends for 2024. What are your thoughts? 📊",
    // Remove image or use a different placeholder
    createdAt: Date.now() - 1000 * 60,
    likes: 45,
    reposts: 12
  },
  // Challenge Post
  {
    id: 1,
    type: 'challenge',
    creator: {
      name: "CryptoWhale",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=whale",
      address: "0x1234...5678"
    },
    challengedUser: "@vitalik",
    prediction: "ETH will break $3000 by end of January",
    wager: "0.5 ETH",
    createdAt: Date.now() - 1000 * 60 * 2,
    votes: { yes: 234, no: 156 },
    status: "Active"
  },
  // Regular Post
  {
    id: 8,
    type: 'post',
    creator: {
      name: "TechEnthusiast",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech",
      address: "0x8888...2222"
    },
    content: "Amazing developments in the L2 scaling solutions space! 🚀",
    createdAt: Date.now() - 1000 * 60 * 15,
    likes: 89,
    reposts: 23
  },
  // Regular Post with Image
  {
    id: 9,
    type: 'post',
    creator: {
      name: "NFTArtist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=artist",
      address: "0x7777...3333"
    },
    content: "Just dropped my latest NFT collection! Check it out 🎨",
    // Remove image or use a different placeholder
    createdAt: Date.now() - 1000 * 60 * 45,
    likes: 156,
    reposts: 34
  },
  // Challenge Post
  {
    id: 3,
    type: 'challenge',
    creator: {
      name: "SolanaSage",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=solana",
      address: "0x4567...8901"
    },
    challengedUser: "@anat",
    prediction: "SOL will flip ETH in market cap by 2025",
    wager: "100 SOL",
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    votes: { yes: 789, no: 1023 },
    status: "Active"
  },
  // Regular Post
  {
    id: 10,
    type: 'post',
    creator: {
      name: "DeFiExplorer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=defi",
      address: "0x6666...4444"
    },
    content: "Thread 🧵 on the latest DeFi innovations and yield farming strategies...",
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    likes: 234,
    reposts: 56
  }
];