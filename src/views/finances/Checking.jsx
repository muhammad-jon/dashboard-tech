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
import fetchPurchaseInvoices from 'features/yetkaziberuvchi/invoiceThunk';
import { setOrder } from 'features/yetkaziberuvchi/ordersSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Checking = () => {
  const [page, setPage] = useState(0);
  const [cardName, setCardName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const purchaseInvoices = useSelector((state) => state.purchaseInvoices);
  let isLoading = purchaseInvoices.loading;

  console.log(purchaseInvoices);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPurchaseInvoices({ page, cardName, startDate, endDate }));
  }, [page, cardName, startDate, endDate]);

  const navigate = useNavigate();

  function openDoc(docInfo) {
    dispatch(setOrder(docInfo));
    return navigate('paymentdoc');
  }

  return (
    <div>
      <Heading>Purchase invoices</Heading>
      <Box display={'flex'} gap={2} my={5}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            onChange={(el) => setCardName(el.target.value)}
            placeholder="Search"
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
                <Th>Doc date</Th>
                <Th>Cash Sum</Th>
                <Th>Cash Sum FC</Th>
                <Th>Doc Currency</Th>
                <Th>Doc</Th>
              </Tr>
            </Thead>
            <Tbody>
              {purchaseInvoices.data &&
                purchaseInvoices.data.map((invoice, index) => (
                  <Tr
                    cursor={'pointer'}
                    key={index}
                    onClick={() => openDoc(invoice)}
                  >
                    <Td>{formatDate(invoice.docDate)}</Td>
                    <Td>{invoice.cardCode}</Td>

                    <Td>{invoice.docTotal}</Td>
                    <Td>{invoice.docCurrency}</Td>
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

export default Checking;
