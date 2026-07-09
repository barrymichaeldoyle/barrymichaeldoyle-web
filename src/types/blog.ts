export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  readingMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
