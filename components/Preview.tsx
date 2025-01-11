import { Calendar } from "./heroicons/Calendar";
import { ArrowRight } from "./heroicons/ArrowRight";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export interface PreviewProps {
  title: string;
  date: Date;
  contentPreview: string;
  slug: string;
}

export function Preview({
  title,
  date,
  contentPreview,
  slug,
}: PreviewProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="select-none flex items-center gap-1 text-sm text-neutral-700">
        <Calendar className="size-4" />
        <p>{date.toLocaleDateString()}</p>
      </div>
      <article className="line-clamp-6 md:line-clamp-5 xl:line-clamp-4">
        <MDXRemote source={contentPreview} />
      </article>
      <div className="flex justify-end">
        <Link href={`post/${slug}`} className="select-none group py-0.5 w-36 text-sm text-neutral-700 flex gap-1 items-center justify-center rounded-lg hover:bg-[--hover] hover:shadow hover:shadow-[--shadow] transition">
          <p>Continuar lendo</p>
          <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
        </Link>
      </div>
    </div>
  );
}
