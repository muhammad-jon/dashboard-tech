import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import editItemTaminot from 'features/taminot/editItemThunk';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ItemsDoc = () => {
  const taminotItems = useSelector((state) => state.taminotItems);
  const { order, loading } = taminotItems;
  console.log(order);

  const [item, setItem] = useState({
    itemName: order?.itemName,
    itemsGroupCode: order?.itemsGroupCode,
    category: order?.itemsGroupCode,
    valid: order?.valid,
  });

  function onHandleChangeItem(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  const dispatch = useDispatch();
  const toast = useToast();

  function onHandleEditItem() {
    dispatch(editItemTaminot({ itemCode: order.itemCode, ...item })).then(
      (el) => {
        if (el.meta.requestStatus === 'fulfilled') {
          toast({
            title: "Ma'lumotlar muvaffaqiyatli o'zgardi.",
            status: 'success',
          });
        }
      },
    );
  }

  return (
    <div>
      <Heading>Item docs</Heading>
      <Box
        display={'flex'}
        flexDirection={{ lg: 'row', md: 'column', base: 'column' }}
        gap={2}
        my={5}
      >
        <FormControl>
          <FormLabel>itemCode</FormLabel>
          <Input
            name="itemCode"
            onChange={(e) => onHandleChangeItem(e)}
            value={order?.itemCode}
            disabled
            size={'lg'}
            w={'100%'}
          />
        </FormControl>
        <FormControl>
          <FormLabel>itemName</FormLabel>
          <Input
            name="itemName"
            onChange={(e) => onHandleChangeItem(e)}
            value={item.itemName}
            size={'lg'}
            w={'100%'}
          />
        </FormControl>
        <FormControl>
          <FormLabel>itemType</FormLabel>
          <Input
            name="itemType"
            onChange={(e) => onHandleChangeItem(e)}
            value={order?.itemType}
            disabled
            size={'lg'}
            w={'100%'}
          />
        </FormControl>
        <FormControl>
          <FormLabel>itemsGroupCode</FormLabel>
          <Input
            name="itemsGroupCode"
            onChange={(e) => onHandleChangeItem(e)}
            value={item.itemsGroupCode}
            size={'lg'}
            w={'100%'}
          />
        </FormControl>
        <FormControl>
          <FormLabel>salesUnit</FormLabel>
          <Input
            name="salesUnit"
            onChange={(e) => onHandleChangeItem(e)}
            value={order?.salesUnit}
            disabled
            size={'lg'}
            w={'100%'}
          />
        </FormControl>
        <FormControl>
          <FormLabel>category </FormLabel>
          <Input
            name="category"
            onChange={(e) => onHandleChangeItem(e)}
            value={item.typeOfGoods}
            size={'lg'}
            w={'100%'}
          />
        </FormControl>
        <FormControl>
          <FormLabel>valid</FormLabel>
          <Input
            name="valid"
            onChange={(e) => onHandleChangeItem(e)}
            value={item.valid}
            size={'lg'}
            w={'100%'}
          />
        </FormControl>
      </Box>

      <Box mt={4}>
        <Button
          w={'7rem'}
          onClick={onHandleEditItem}
          colorScheme="green"
          isLoading={loading}
        >
          Edit
        </Button>
      </Box>
    </div>
  );
};

export default ItemsDoc;
