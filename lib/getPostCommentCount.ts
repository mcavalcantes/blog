import { prisma } from "./prisma";

export async function getPostCommentCount(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug: slug
    }
  })

  const commentCount = post?.commentCount;
  return commentCount;
}
