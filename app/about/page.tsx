import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | Matheus Cavalcante",
};

export default function About() {
  return (
    <main className="px-8 md:px-44 xl:px-96">
      <article>
        <h1 className="text-2xl font-bold">Olá, sou o Matheus! 👋</h1>
        <p>
          Por enquanto, essa página ainda está vazia. Talvez algum outro dia
          eu venha aqui e incremente ela com mais algumas coisas...
        </p>
      </article>
    </main>
  );
}
