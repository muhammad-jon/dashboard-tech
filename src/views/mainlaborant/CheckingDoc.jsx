import {
  Box,
  Button,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';

import { formatDate } from 'config';
import startFinish from 'features/laborant/startFinishThunk';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CheckingDoc = () => {
  const laborantOrders = useSelector((state) => state.laborantOrders);
  const { order, loading, error } = laborantOrders;
  const params = useParams();

  console.log(order);

  const dispatch = useDispatch();
  const toast = useToast();

  function onHandleStartFinish(type) {
    console.log('start');
    dispatch(
      startFinish({ docEntry: order.docEntry, docNum: order.docNum, type }),
    ).then((el) => {
      if (el.meta.requestStatus === 'fulfilled') {
        toast({
          title: "Ma'lumotlar muvaffaqiyatli o'zgardi.",
          status: 'success',
        });
      }

      if (el.meta.requestStatus === 'rejected') {
        toast({
          title: "Ma'lumotlar o'zgartirish imkoni bo'lmadi: " + error,
          status: 'error',
        });
      }
    });
  }

  return (
    <div>
      <Heading>laborant checking docs</Heading>
      <Box
        display={'flex'}
        flexDirection={{ lg: 'row', md: 'column', base: 'column' }}
        gap={2}
        my={5}
      >
        <Input
          disabled
          value={`name: ${order.cardName}`}
          size={'lg'}
          w={'100%'}
        />
        <Input
          disabled
          value={`Sana: ${formatDate(order.docDate)}`}
          size={'lg'}
          w={'100%'}
        />
        <Input
          disabled
          value={`Due date: ${formatDate(order.docDueDate)}`}
          size={'lg'}
          w={'100%'}
        />
        <Input
          disabled
          value={`Driver number: ${order.driverNumber}`}
          size={'lg'}
          w={'100%'}
        />
        <Input
          disabled
          value={`Total: ${order.docTotal}`}
          size={'lg'}
          w={'100%'}
        />
        <Input
          disabled
          value={`Currency: ${order.docCurrency}`}
          size={'lg'}
          w={'100%'}
        />
      </Box>

      <TableContainer>
        <Table variant="striped" colorScheme="green">
          <Thead>
            <Tr>
              <Th>item Code</Th>
              <Th>item Description</Th>
              <Th>quantity</Th>
              <Th>Measure unit </Th>
            </Tr>
          </Thead>
          <Tbody>
            {order.documentLines &&
              order.documentLines.map((doc, index) => (
                <Tr key={index}>
                  <Td>{doc.itemCode}</Td>
                  <Td>{doc.itemDescription}</Td>
                  <Td>{doc.quantity}</Td>
                  <Td>{doc.measureUnit}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box mt={4}>
        {params.status === '3' && (
          <Button
            onClick={() => onHandleStartFinish(2)}
            isLoading={loading}
            colorScheme="green"
          >
            Start
          </Button>
        )}
        {params.status === '7' && (
          <>
            <Button
              me={5}
              onClick={() => onHandleStartFinish(3)}
              isLoading={loading}
              colorScheme="green"
            >
              Start
            </Button>
            <Button
              onClick={() => onHandleStartFinish(4)}
              isLoading={loading}
              colorScheme="red"
            >
              Finish
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default CheckingDoc;
