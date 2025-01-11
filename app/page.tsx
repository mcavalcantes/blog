import { getAllPosts } from "@/lib/mdx";
import { Preview } from "@/components/Preview";

export default async function App() {
  const posts = await getAllPosts();
  
  return (
    <main className="px-8 md:px-44 xl:px-96">
      <ul className="flex flex-col gap-4">
        {posts.map(item => (
          <li key={item.slug}>
            <Preview
              title={item.title}
              date={item.date}
              contentPreview={item.contentPreview}
              slug={item.slug}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
