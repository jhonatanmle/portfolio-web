"use client";

import { Ticket } from "@/interfaces/Ticket";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { IncomeFormData } from "../../../features/income-dividend/types";
import { NOW_DATE_FORMAT } from "@/shared/constants";
import { incomeFormAdapter } from "@/features/income-dividend/adapters";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Props = {
  tickets?: Ticket[];
};

export const IncomeForm = ({ tickets = [] }: Props) => {
  const router = useRouter();
  const clientSupabase = createClientComponentClient();
  const { register, handleSubmit, formState } = useForm<IncomeFormData>({
    defaultValues: {
      date: NOW_DATE_FORMAT,
      brokerPaymentDate: NOW_DATE_FORMAT,
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    const payload = incomeFormAdapter(formData);

    const { data: dividend } = await clientSupabase
      .from("Dividend")
      .insert([payload])
      .select();

    router.push("/income-dividend");
  });

  return (
    <div>
      <h3>Ingrese Dividendos</h3>
      <br />
      <Divider />
      <br />
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap gap-4">
          <Select
            {...register("ticketId", {
              required: true,
            })}
            items={tickets}
            label="Seleccione el ticket"
          >
            {(ticket) => <SelectItem key={ticket.id}>{ticket.name}</SelectItem>}
          </Select>
          <Input
            {...register("amount", {
              required: true,
              valueAsNumber: true,
            })}
            label="Monto"
            description="Ingrese el monto"
          />
          <Input
            {...register("taxes", {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            label="Impuesto"
            defaultValue={"30"}
            description="Ingrese % de impuesto"
          />
          <Input
            {...register("date")}
            type="date"
            label="Fecha de dividendo"
            placeholder="Fecha de dividendo"
            variant="faded"
          />
          <Input
            {...register("brokerPaymentDate")}
            type="date"
            label="Fecha de pago en broker"
            placeholder="Fecha de pago en broker"
            variant="faded"
          />
          <Button color="primary" type="submit" isDisabled={!formState.isValid}>
            Registrar
          </Button>
        </div>
      </form>
    </div>
  );
};
