'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { useForm } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { WalletCreateItemForm } from '@/features/wallet/types';
import { findTicketInformation } from '@/features/ticket/services';
import { useState } from 'react';
import { TicketDetailInformation } from '@/features/ticket/types';
import { Divider } from '@nextui-org/divider';

export default function WalletCreateButtonModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, reset, handleSubmit, formState } =
    useForm<WalletCreateItemForm>();
  const [dividendFuture, setDividendFuture] =
    useState<TicketDetailInformation | null>();
  const [fetching, setFetching] = useState<boolean>();

  const onSubmit = handleSubmit(async ({ ticket, amount }) => {
    setFetching(true);
    setDividendFuture(null);

    try {
      const response = await findTicketInformation(
        ticket?.toUpperCase(),
        amount
      );

      setDividendFuture(response);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  });

  const resetForm = () => {
    reset();
    setDividendFuture(null);
  };

  return (
    <>
      <Button color='primary' onClick={onOpen}>
        Simular
      </Button>
      <Modal
        backdrop='blur'
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        onClose={() => {
          resetForm();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={onSubmit}>
              <ModalHeader className='flex flex-col gap-1'>Simular</ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-y-6'>
                  <Input
                    {...register('ticket', {
                      required: true,
                    })}
                    label='Ticket'
                    labelPlacement='inside'
                    variant='bordered'
                    placeholder='Ingrese ticket'
                    maxLength={4}
                  />
                  <Input
                    {...register('amount', {
                      required: true,
                      valueAsNumber: true,
                    })}
                    type='number'
                    defaultValue=''
                    label='Monto'
                    labelPlacement='inside'
                    variant='bordered'
                    placeholder='Ingrese cantidad'
                    maxLength={5}
                  />
                  <Button
                    color='primary'
                    isDisabled={!formState.isValid}
                    type='submit'
                    isLoading={fetching}
                  >
                    Calcular
                  </Button>
                  <Button
                    color='danger'
                    variant='faded'
                    onPress={() => {
                      resetForm();
                    }}
                  >
                    Limpiar
                  </Button>
                  <Divider />
                  <div className='flex justify-between flex-wrap'>
                    <div>Precio:</div>
                    <div>{dividendFuture?.latestPrice}</div>
                  </div>
                  <div className='flex justify-between flex-wrap'>
                    <div>Dividendo:</div>
                    <div>{dividendFuture?.dividendMonthly}</div>
                  </div>
                  <div className='flex justify-between flex-wrap'>
                    <div>Dividendo Anual:</div>
                    <div>{dividendFuture?.dividendYearly}</div>
                  </div>
                  <div className='flex justify-between flex-wrap'>
                    <div>Dividendo Mensual:</div>
                    <div>{dividendFuture?.dividendMonthly}</div>
                  </div>
                  <div className='flex justify-between flex-wrap'>
                    <div>Cantidad:</div>
                    <div>{dividendFuture?.quantity}</div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cerrar
                </Button>
                <Button color='primary' isDisabled={!formState.isValid && !dividendFuture}>
                  Agregar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
