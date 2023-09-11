import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { IncomeDividendList } from "./components/IncomeDividendList";
import { IncomeDividendItemListResponse } from "@/features/income-dividend/services/interfaces/income-dividend-list";
import { incomeDividendListAdapterResponse } from "@/features/income-dividend/adapters";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { CircularProgress } from "@nextui-org/progress";
import { Chip } from "@nextui-org/chip";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "@/shared/constants";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { redirect } from "next/navigation";

dayjs.extend(customParseFormat);

const Page = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    redirect("/sign-in");
  }

  const { data } = await supabase
    .from("Dividend")
    .select("*, Ticket ( * )")
    .order("date", { ascending: false })
    .returns<IncomeDividendItemListResponse[]>();

  const items = incomeDividendListAdapterResponse(data!);

  const total = items.reduce((acc, item) => acc + item.netAmount, 0);
  const monthlyTotal = items
    .filter((item) =>
      dayjs()
        .startOf("M")
        .isSame(dayjs(item.date, DEFAULT_DATE_FORMAT).startOf("M"))
    )
    .reduce((acc, item) => acc + item.netAmount, 0);

  return (
    <div>
      <section className="flex gap-x-4">
        <Card className="w-[200px] h-[220px] border-none">
          <CardBody className="justify-center items-center pb-0">
            <CircularProgress
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-white",
                track: "stroke-white/10",
                value: "text-2xl font-semibold text-white",
              }}
              size="lg"
              value={total}
              maxValue={1000}
              color="success"
              formatOptions={{ style: "currency", currency: "USD" }}
              showValueLabel={true}
              aria-label="Total"
            />
          </CardBody>
          <CardFooter className="justify-center items-center pt-0">
            <Chip
              classNames={{
                base: "border-1 border-white/30",
                content: "text-white/90 text-small font-semibold",
              }}
              variant="bordered"
            >
              Total Neto
            </Chip>
          </CardFooter>
        </Card>
        <Card className="w-[200px] h-[220px] border-none">
          <CardBody className="justify-center items-center pb-0">
            <CircularProgress
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-white",
                track: "stroke-white/10",
                value: "text-2xl font-semibold text-white",
              }}
              size="lg"
              value={monthlyTotal}
              maxValue={1000}
              color="success"
              formatOptions={{ style: "currency", currency: "USD" }}
              showValueLabel={true}
              aria-label="Total Mensual"
            />
          </CardBody>
          <CardFooter className="justify-center items-center pt-0">
            <Chip
              classNames={{
                base: "border-1 border-white/30",
                content: "text-white/90 text-small font-semibold",
              }}
              variant="bordered"
            >
              Total Mensual
            </Chip>
          </CardFooter>
        </Card>
      </section>
      <section className="mt-3 text-right">
        <Link href={"/income-dividend/create"}>
          <Button color="primary">Crear ingreso</Button>
        </Link>
      </section>
      <section className="mt-4">
        <IncomeDividendList items={items} />
      </section>
    </div>
  );
};

export default Page;
