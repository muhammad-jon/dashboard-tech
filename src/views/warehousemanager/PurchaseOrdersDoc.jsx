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
import packOrderWarehouse from 'features/warehousemanager/packOrderThunk';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PurchaseOrdersDoc = () => {
  const purchaseOrders = useSelector((state) => state.warehouseOrders);
  const { order, loading } = purchaseOrders;
  console.log(order);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  function packOrder() {
    dispatch(
      packOrderWarehouse({
        docNum: order.docNum,
        data: {
          cardCode: order.cardCode, //bundan oldingi documentdan olinadi
          branchId: order.branchId, //  // Bundan oldingi documentdagi BranchId beriladi
          documentLines: [
            {
              baseType: 22, //Har doim shunday beriladi
              baseEntry: order.docEntry, // Bundan oldingi Documentni DocEntry si berilishi kerek
              baseLine:
                order.documentLines.length !== 0
                  ? order.documentLines.length - 1
                  : 0, // Bundan oldingi Documentni LineNum berilishi kerek
            },
          ],
        },
      }),
    ).then((el) => {
      if (el.meta.requestStatus === 'fulfilled') {
        toast({
          title: 'Muvoffaqiyatli',
          status: 'success',
        });
        navigate(-1);
      }

      if (el.meta.requestStatus === 'rejected') {
        toast({
          title: 'Xatolik ',
          status: 'error',
        });
      }
    });
  }

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
      <Box mt={4}>
        <Button isLoading={loading} onClick={packOrder} colorScheme="green">
          Otgruzit
        </Button>
      </Box>
    </div>
  );
};

export default PurchaseOrdersDoc;
