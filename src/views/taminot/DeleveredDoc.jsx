import {
  Box,
  Button,
  Heading,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { formatDate } from 'config';

import React from 'react';
import { useSelector } from 'react-redux';

const DeleveredDoc = () => {
  const purchaseOrders = useSelector((state) => state.purchaseOrders);
  const { order } = purchaseOrders;
  console.log(order);

  return (
    <div>
      <Heading>Delevered order docs</Heading>
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
        <Button me="4" colorScheme="green">
          Any action
        </Button>
        <Button colorScheme="green">Any action</Button>
      </Box>
    </div>
  );
};

export default DeleveredDoc;
