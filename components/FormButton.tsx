"use client";
import { useFormStatus } from "react-dom";

export function FormButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="self-end font-semibold h-8 w-20 rounded-lg border bg-[#fffbf5] shadow hover:shadow-md transition disabled:cursor-not-allowed disabled:bg-white disabled:text-neutral-400"
    >Enviar</button>
  );
}
