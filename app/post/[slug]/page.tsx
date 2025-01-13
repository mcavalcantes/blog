import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar } from "@/components/heroicons/Calendar";
import { ArrowLeft } from "@/components/heroicons/ArrowLeft";
import { CommentForm } from "@/components/CommentForm";
import { formatDate } from "@/lib/formatDate";
import { getPostCommentCount } from "@/lib/getPostCommentCount";
import { getPostComments } from "@/lib/getPostComments";
import Link from "next/link";

export default async function Post({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);
  const comments = await getPostComments(slug);

  return (
    <main className="px-8 md:px-44 xl:px-96">
      <Link href={`/`} className="select-none group py-0.5 w-20 text-sm text-neutral-700 flex gap-1 items-center justify-center rounded-lg hover:bg-[--hover] hover:shadow hover:shadow-[--shadow] transition">
        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition" />
        <p>Voltar</p>
      </Link>
      <div>
        <div className="py-4 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <div className="select-none flex items-center gap-1 text-sm text-neutral-700">
            <Calendar className="size-4" />
            <p>{formatDate(post.date)}</p>
          </div>
        </div>
        <article className="prose prose-lg prose-neutral max-w-none">
          <MDXRemote source={post.content} />
        </article>
      </div>
      <div className="py-4 flex flex-col gap-4">
        <h2 className="font-bold text-2xl">{`Comentários (${await getPostCommentCount(slug)})`}</h2>
        <ul className="flex flex-col gap-4">
          {comments.map(item => (
            <li key={item.id}>
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{item.authorName}</h3>
                  <div className="select-none flex items-center gap-1 text-sm text-neutral-700">
                    <Calendar className="size-4" />
                    <p>{formatDate(item.createdAt)}</p>
                  </div>
                </div>
                <article className="prose prose-neutral max-w-none">
                  {item.content}                
                </article>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <h3 className="font-semibold text-lg py-2">Deixe um comentário</h3>
          <CommentForm slug={slug} />
        </div>
      </div>
    </main>
  );
}