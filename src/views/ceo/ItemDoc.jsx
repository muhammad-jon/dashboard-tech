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
} from '@chakra-ui/react';

import { formatDate } from 'config';

import React from 'react';
import { useSelector } from 'react-redux';

const ItemDoc = () => {
  const purchaseOrders = useSelector((state) => state.purchaseOrders);
  const { order } = purchaseOrders;
  console.log(order);

  return (
    <div>
      <Heading>Item docs</Heading>
      <Box
        display={'flex'}
        flexDirection={{ lg: 'row', md: 'column', base: 'column' }}
        gap={2}
        my={5}
      >
        <Input disabled value={`№ ${order.docEntry}`} size={'lg'} w={'100%'} />
        <Input
          disabled
          value={`Name: ${order.cardName}`}
          size={'lg'}
          w={'100%'}
        />
        <Input
          disabled
          value={`Date: ${formatDate(order.docDate)}`}
          size={'lg'}
          w={'100%'}
        />
        <Input
          disabled
          value={`Doc Due Date: ${formatDate(order.docDueDate)}`}
          size={'lg'}
          w={'100%'}
        />
        <Input
          disabled
          value={`Driver Number: ${order.uDriverNumber}`}
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
              <Th>Measure Unit </Th>
              <Th>unit Price</Th>
              <Th>Line total</Th>
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
                  <Td>{doc.unitPrice}</Td>
                  <Td>{doc.lineTotal}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ItemDoc;
