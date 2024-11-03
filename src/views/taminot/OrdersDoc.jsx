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
import markAsDelevered from 'features/taminot/markAsDeleveredThunk';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OrdersDoc = () => {
  const purchaseOrders = useSelector((state) => state.purchaseOrders);
  const taminotItems = useSelector((state) => state.taminotItems);
  const { order } = purchaseOrders;
  const { loading } = taminotItems;
  console.log(order);

  const dispatch = useDispatch();
  const toast = useToast();

  const onHandleSend = () => {
    dispatch(
      markAsDelevered({ docEntry: order?.docEntry, docNum: order?.docNum }),
    ).then((el) => {
      if (el.meta.requestStatus === 'fulfilled') {
        toast({
          title: "Ma'lumotlar muvaffaqiyatli o'zgardi.",
          status: 'success',
        });
      }
    });
  };

  return (
    <div>
      <Heading>order docs</Heading>
      <Box
        display={'flex'}
        flexDirection={{ lg: 'row', md: 'column', base: 'column' }}
        gap={2}
        my={5}
      >
        <Input disabled value={`№ ${order.docEntry}`} size={'lg'} w={'100%'} />
        <Input
          disabled
          value={`Ism: ${order.cardName}`}
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
          value={`Sum: ${order.docTotal}`}
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
              <Th>unit Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {order.documentLines &&
              order.documentLines.map((doc, index) => (
                <Tr key={index}>
                  <Td>{doc.itemCode}</Td>
                  <Td>{doc.itemDescription}</Td>
                  <Td>{doc.quantity}</Td>
                  <Td>{doc.unitPrice}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box onClick={onHandleSend} mt={4}>
        <Button isLoading={loading} colorScheme="green">
          Mark as delevered
        </Button>
      </Box>
    </div>
  );
};

export default OrdersDoc;
