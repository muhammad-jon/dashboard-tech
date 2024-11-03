import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EditIcon,
  Search2Icon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
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
  useToast,
} from '@chakra-ui/react';
import Loading from 'components/loading/Loading';
import { formatDate } from 'config';
import addItemToTaminot from 'features/taminot/addItemThunk';
import fetchTaminotItems from 'features/taminot/itemsThunk';
import { setOrder } from 'features/taminot/itemsSlice';
import fetchPurchaseOrders from 'features/yetkaziberuvchi/ordersThunk';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Items = () => {
  const [page, setPage] = useState(0);
  const [cardName, setCardName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [item, setItem] = useState({
    itemName: 'test',
    itemsGroupCode: 100,
    category: 'TOZ2',
    itemType: 'itItems',
    uoMGroupEntry: 0,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const taminotItems = useSelector((state) => state.taminotItems);
  let isLoading = taminotItems.loading;

  const toast = useToast();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchTaminotItems({ page, cardName, startDate, endDate, status: 1 }),
    ).then((el) => {
      if (el.meta.requestStatus === 'fulfilled') {
        toast({
          title: "Ma'lumotlar muvaffaqiyatli yuklandi.",
          status: 'success',
        });
      }
    });
  }, [page, cardName, startDate, endDate]);

  const onHandleAddItem = () => {
    dispatch(addItemToTaminot(item)).then((el) => {
      if (el.meta.requestStatus === 'fulfilled') {
        toast({
          title: "Ma'lumotlar muvaffaqiyatli qo'shildi.",
          status: 'success',
        });
        onClose();
      }
    });
  };

  const navigate = useNavigate();

  function openDoc(docInfo) {
    dispatch(setOrder(docInfo));
    return navigate('doc');
  }

  function onHandleChangeItem(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <Box display={'flex'} gap={2} my={5}>
        <Button ms={'auto'} onClick={onOpen} colorScheme="green">
          Add new
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Item name</FormLabel>
                <Input
                  value={item.itemName}
                  onChange={(e) => onHandleChangeItem(e)}
                  name="itemName"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Item group</FormLabel>
                <Input
                  value={item.itemsGroupCode}
                  onChange={(e) => onHandleChangeItem(e)}
                  name="itemsGroupCode"
                  type="number"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input
                  value={item.category}
                  onChange={(e) => onHandleChangeItem(e)}
                  name="category"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Item type</FormLabel>
                <Input
                  value={item.itemType}
                  onChange={(e) => onHandleChangeItem(e)}
                  name="itemType"
                />
              </FormControl>
              <FormControl>
                <FormLabel>uoMGroupEntry</FormLabel>
                <Input
                  value={item.uoMGroupEntry}
                  onChange={(e) => onHandleChangeItem(e)}
                  name="uoMGroupEntry"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={onHandleAddItem}
                isLoading={isLoading}
                variant="solid"
                colorScheme="green"
              >
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
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
                <Th> itemCode</Th>
                <Th> items Group Code</Th>
                <Th> item Name</Th>
                <Th> category</Th>
                <Th> sales Unit</Th>
                <Th> type Of Goods</Th>
                <Th> valid</Th>
              </Tr>
            </Thead>
            <Tbody>
              {taminotItems.data &&
                taminotItems.data.map((item, index) => (
                  <Tr
                    key={index}
                    cursor={'pointer'}
                    onClick={() => openDoc(item)}
                  >
                    <Td>{item.itemCode}</Td>
                    <Td>{item.itemsGroupCode}</Td>
                    <Td>{item.itemName}</Td>
                    <Td>{item.category}</Td>
                    <Td>{item.salesUnit}</Td>
                    <Td>{item.typeOfGoods}</Td>
                    <Td>{item.valid}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Items;
