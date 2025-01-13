import { createComment } from "@/lib/createComment";
import { FormButton } from "./FormButton";
import { redirect } from "next/navigation";
import Form from "next/form";

export async function CommentForm({ slug }: { slug: string }) {

  async function handleSubmit(formData: FormData) {
    "use server";
    await createComment(formData, slug)
      .then(() => redirect(`/post/${slug}`));
  }

  return (
    <Form action={handleSubmit} className="p-4 rounded-lg border border-[#ded1c0] flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          name="name"
          type="name"
          maxLength={256}
          spellCheck={false}
          className="p-1 rounded-md outline-none focus:ring-1 ring-[#c7b8a5] transition"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">E-mail (opcional)</label>
        <input
          id="email"
          name="email"
          type="email"
          maxLength={512}
          spellCheck={false}
          className="p-1 rounded-md outline-none focus:ring-1 ring-[#c7b8a5] transition"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="content">Comentário</label>
        <textarea
          id="content"
          name="content"
          maxLength={4096}
          spellCheck={false}
          rows={5}
          required
          className="p-1 rounded-md outline-none focus:ring-1 ring-[#c7b8a5] transition"
        ></textarea>
      </div>
      <FormButton />
    </Form>
  );
}
