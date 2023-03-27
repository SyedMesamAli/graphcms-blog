export type PostType = {
  author: {
    name: string;
    photo: {
      url: string;
    };
    bio: string;
  };
  categories: [];
  createdAt: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  slug: string;
  title: string;
};

export type CategoryType = {
  slug: string;
  name: string;
};
