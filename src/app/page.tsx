import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header>Portfolio web</header>
      <section className="mt-4">
        <Link href={"/income-dividend"}>
          <Button variant="flat">Ver listado de dividendos</Button>
        </Link>
      </section>
    </main>
  );
}
