import {
  Box,
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

const DeleveredDoc = () => {
  const mainLaborantOrders = useSelector((state) => state.mainLaborantOrders);
  const { order } = mainLaborantOrders;
  console.log(order);

  return (
    <div>
      <Heading>laborant delevered docs</Heading>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
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
    </div>
  );
};

export default DeleveredDoc;
