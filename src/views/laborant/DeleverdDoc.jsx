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
import startRewiew from 'features/laborant/startFinishThunk';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DeleveredDoc = () => {
  const laborantOrders = useSelector((state) => state.laborantOrders);
  const { order, loading, error } = laborantOrders;
  console.log(order);

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  function onHandleStart() {
    console.log('start');
    dispatch(
      startRewiew({ docEntry: order.docEntry, docNum: order.docNum, type: 1 }),
    ).then((el) => {
      if (el.meta.requestStatus === 'fulfilled') {
        toast({
          title: "Ma'lumotlar muvaffaqiyatli o'zgardi.",
          status: 'success',
        });
        navigate(-1);
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
      <Heading>laborant delevered docs</Heading>
      <Box
        flexWrap={'wrap'}
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
        <Button onClick={onHandleStart} isLoading={loading} colorScheme="green">
          Start
        </Button>
      </Box>
    </div>
  );
};

export default DeleveredDoc;
