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
import { setOrder } from 'features/yetkaziberuvchi/ordersSlice';
import fetchPurchaseOrders from 'features/yetkaziberuvchi/ordersThunk';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NewOrders = () => {
  const [page, setPage] = useState(0);
  const [cardName, setCardName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const purchaseOrders = useSelector((state) => state.purchaseOrders);
  let isLoading = purchaseOrders.loading;

  console.log(purchaseOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchPurchaseOrders({ page, cardName, startDate, endDate, status: 1 }),
    );
  }, [page, cardName, startDate, endDate]);

  const navigate = useNavigate();

  function openDoc(docInfo) {
    dispatch(setOrder(docInfo));
    return navigate('neworderdoc');
  }

  return (
    <div>
      <Heading>New orders</Heading>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Lorem, ipsum.</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
                <Th>action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {purchaseOrders.data &&
                purchaseOrders.data.map((order, index) => (
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
                    <Td>
                      <Box onClick={onOpen}>
                        <EditIcon /> Edit
                      </Box>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default NewOrders;
