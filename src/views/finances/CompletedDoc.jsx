import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';

import { formatDate } from 'config';
import payForPurchase from 'features/finance/payForPurchaseThunk';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CompletedDoc = () => {
  const [summa, setSumma] = useState('');
  const financeOrders = useSelector((state) => state.financeOrders);
  const { order, loading, error } = financeOrders;
  console.log(order);

  const toast = useToast();
  const dispatch = useDispatch();

  function onHandlePayForCard(arg) {
    if (summa > 0) {
      dispatch(payForPurchase(arg));
    } else toast({ title: 'enter valid value', type: 'error' });
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
        <InputGroup>
          <Input
            placeholder="Enter summa"
            type="number"
            value={summa}
            onChange={(e) => setSumma(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              isLoading={loading}
              colorScheme="green"
              onClick={() =>
                onHandlePayForCard({
                  cardCode: order.cardCode,
                  docCurrency: order.docCurrency,
                  branchId: order.branchId,
                  docEntry: order.docEntry,
                  cash: summa,
                })
              }
            >
              Pay
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text color={'orange'}>{error}</Text>
      </Box>
    </div>
  );
};

export default CompletedDoc;
