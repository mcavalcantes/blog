"use server";
import { prisma } from "./prisma";

export async function createComment(formData: FormData, slug: string) {
  await prisma.comment.create({
    data: {
      postSlug: slug,
      authorName: formData.get("name")!.toString(),
      authorEmail: formData.get("email")!.toString(),
      content: formData.get("content")!.toString(),
    }
  });

  await prisma.post.update({
    where: {
      slug: slug,
    },
    data: {
      commentCount: {
        increment: 1,
      },
    },
  });
}
