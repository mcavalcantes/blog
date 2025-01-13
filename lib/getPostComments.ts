import { prisma } from "./prisma";

export async function getPostComments(slug: string) {
  const comments = await prisma.comment.findMany({
    where: {
      postSlug: slug
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  return comments;
}
