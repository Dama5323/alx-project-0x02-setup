// Interface for Card component props
export interface CardProps {
  title: string;
  content: string;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

// Interface for PostModal props
export interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: { title: string; content: string }) => void;
}

// Interface for Post data - FIXED: Use 'content' instead of 'body'
export interface Post {
  id: number;
  title: string;
  content: string;  // Changed from 'body' to 'content'
  userId: number;
  createdAt?: Date;
}

// Interface for PostCard component props
export interface PostCardProps {
  id: number;
  title: string;
  content: string;
  userId: number;
  userName?: string;
  className?: string;
}

// Interface for UserCard component props
export interface UserCardProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  className?: string;
}

// Interface for User data
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Interface for Button component props
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  shape?: 'rounded-sm' | 'rounded-md' | 'rounded-full';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  disabled?: boolean;
  className?: string;
}


// Interface for API response - Keep 'body' for API responses
export interface ApiPost {
  userId: number;
  id: number;
  title: string;
  body: string;  // Keep as 'body' for API responses
}

export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
