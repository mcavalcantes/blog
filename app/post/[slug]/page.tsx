import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar } from "@/components/heroicons/Calendar";
import { ArrowLeft } from "@/components/heroicons/ArrowLeft";
import Link from "next/link";

export default async function Post({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

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
            <p>{post.date.toLocaleDateString()}</p>
          </div>
        </div>
        <article className="prose prose-neutral max-w-none">
          <MDXRemote source={post.content} />
        </article>
      </div>
    </main>
  );
}