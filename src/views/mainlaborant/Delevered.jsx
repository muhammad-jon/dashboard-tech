import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Search2Icon,
  TimeIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Loading from 'components/loading/Loading';
import { formatDate } from 'config';
import { setOrder } from 'features/laborant/ordersSlice';
import getMainLaborantOrders from 'features/mainlaborant/mainLaborantOrdersThunk';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Delevered = () => {
  const [page, setPage] = useState(0);
  const [cardName, setCardName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const laborantOrders = useSelector((state) => state.laborantOrders);
  let isLoading = laborantOrders.loading;

  console.log(laborantOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getMainLaborantOrders({ page, cardName, startDate, endDate, status: 2 }),
    );
  }, [page, cardName, startDate, endDate]);

  const navigate = useNavigate();

  function openDoc(docInfo) {
    dispatch(setOrder(docInfo));
    return navigate('doc');
  }

  return (
    <div>
      <Heading>Delevered</Heading>
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
                <Th>Timer</Th>
              </Tr>
            </Thead>
            <Tbody>
              {laborantOrders.data &&
                laborantOrders.data.map((order, index) => (
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
                    <Td>{order.timer1}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Delevered;
