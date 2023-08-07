interface SingleBlogProps {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogProps {
  blogs: SingleBlogProps[];
  nbHits?: number;
  success: boolean;
}
