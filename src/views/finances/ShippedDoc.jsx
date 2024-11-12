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
import completeThePurchase from 'features/finance/completeThePurchaseThunk';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ShippedDoc = () => {
  const purchaseOrders = useSelector((state) => state.financeOrders);
  const { order, loading } = purchaseOrders;
  console.log(order);

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  function onHandleCompleteThePurchase(cardCode, branchId) {
    dispatch(completeThePurchase({ cardCode, branchId })).then((el) => {
      if (el.meta.requestStatus === 'fulfilled') {
        toast({
          title: 'Sucess',
          status: 'success',
        });
        navigate(-1);
      }

      if (el.meta.requestStatus === 'rejected') {
        toast({
          title: 'Error',
          status: 'error',
        });
      }
    });
  }

  return (
    <div>
      <Heading>Invoice item docs</Heading>
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
      <Box mt={4}>
        <Button
          isLoading={loading}
          me="4"
          colorScheme="red"
          onClick={() =>
            onHandleCompleteThePurchase(order.cardCode, order.branchId)
          }
        >
          Zavershit zakupku
        </Button>
      </Box>
    </div>
  );
};

export default ShippedDoc;
