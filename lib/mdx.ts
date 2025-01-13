import { getPostCommentCount } from './getPostCommentCount';
import { getPostComments } from './getPostComments';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type Comment = {
  id?: number;
  createdAt?: Date;
  postSlug?: string;
  authorName?: string;
  authorEmail?: string;
  content?: string;
}

interface Post {
  title: string;
  date: Date;
  contentPreview: string;
  content: string;
  slug: string;
  commentCount: number | undefined;
  comments: Array<Comment>;
}

const POSTS_PATH = path.join(process.cwd(), 'content/posts')

function getPostSlugs() {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((path) => path.replace(/\.mdx?$/, ''))
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  const { data, content } = matter(fileContents)

  const commentCount = await getPostCommentCount(slug)
  const comments = await getPostComments(slug)

  return {
    title: data.title,
    date: new Date(data.date),
    contentPreview: content.length > 512 ? content.slice(0, 512).trim() + '...' : content,
    content: content,
    slug: realSlug,
    commentCount: commentCount,
    comments: comments
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug)
      return post
    })
  )
  
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime())
}
