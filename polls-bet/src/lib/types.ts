export interface Creator {
  name: string;
  avatar: string;
  address: string;
}

export interface Poll {
  id: number;
  type: 'challenge';
  creator: Creator;
  challengedUser: string;
  prediction: string;
  wager: string;
  createdAt: number;
  votes: {
    yes: number;
    no: number;
  };
  status: 'Active' | 'Closed';
}

export interface Post {
  id: number;
  type: 'post';
  creator: Creator;
  content: string;
  image?: string | null;
  createdAt: number;
  likes: number;
  reposts: number;
}