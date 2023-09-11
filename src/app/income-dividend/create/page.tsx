import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { Ticket } from "@/interfaces/Ticket";
import { IncomeForm } from "../components/IncomeForm";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { IconArrowLeft } from "@tabler/icons-react";

const Page = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data: tickets } = await supabase
    .from("Ticket")
    .select("*")
    .returns<Ticket[]>();

  return (
    <div>
      <section className="mb-4">
        <Link href={"/income-dividend"}>
          <Button
            color="primary"
            variant="light"
            startContent={<IconArrowLeft />}
          >
            Regresar
          </Button>
        </Link>
      </section>
      <IncomeForm tickets={tickets!} />
    </div>
  );
};

export default Page;
