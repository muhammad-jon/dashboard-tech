import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EditIcon,
  Search2Icon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import Loading from 'components/loading/Loading';
import { formatDate } from 'config';
import fetchCeoOrders from 'features/ceo/ordersThunk';
import { setOrder } from 'features/yetkaziberuvchi/ordersSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Completed = () => {
  const [page, setPage] = useState(0);
  const [cardName, setCardName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const deleveredOrders = useSelector((state) => state.ceoOrders);
  let isLoading = deleveredOrders.loading;

  console.log(deleveredOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCeoOrders({ page, status: 4 }));
  }, [page]);

  const navigate = useNavigate();

  function openDoc(docInfo) {
    dispatch(setOrder(docInfo));
    return navigate('completeddoc');
  }

  return (
    <div>
      <Heading>Completed</Heading>
      <Box display={'flex'} gap={2} my={5}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            onChange={(el) => setCardName(el.target.value)}
            placeholder="Search by card name"
          />
        </InputGroup>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="datetime-local"
          onChange={(event) => setStartDate(event.target.value)}
        />
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="datetime-local"
          onChange={(event) => setEndDate(event.target.value)}
        />

        <Button
          onClick={() => {
            page > 0 && setPage(page - 1);
          }}
        >
          <ArrowLeftIcon />
        </Button>
        <Text mt={2}>{page}</Text>
        <Button
          onClick={() => {
            page >= 0 && setPage(page + 1);
          }}
        >
          <ArrowRightIcon />
        </Button>
      </Box>

      {isLoading ? (
        <Loading />
      ) : (
        <TableContainer>
          <Table variant="striped" colorScheme="green">
            <Thead>
              <Tr>
                <Th>Doc num</Th>
                <Th>Card name</Th>
                <Th>Doc date</Th>
                <Th>Doc due date</Th>
                <Th>Description</Th>
                <Th>Doc total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {deleveredOrders.data &&
                deleveredOrders.data.map((order, index) => (
                  <Tr
                    key={index}
                    cursor={'pointer'}
                    onClick={() => openDoc(order)}
                  >
                    <Td>{order.docNum}</Td>
                    <Td>{order.cardName}</Td>
                    <Td>{formatDate(order.docDate)}</Td>
                    <Td>{formatDate(order.docDueDate)}</Td>
                    <Td>{order.documentLines[0].itemDescription}</Td>
                    <Td>{order.docTotal}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Completed;
