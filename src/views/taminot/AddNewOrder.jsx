import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  VStack,
  Stack,
  IconButton,
  Heading,
  useToast,
  Select,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import addOrderToTaminot from 'features/taminot/addOrderThunk';
import getDepartments from 'features/taminot/getDepartments';
import getPartners from 'features/taminot/getPartners';
import getItemsByWarehouseAndPrice from 'features/taminot/getItemsByWarehouseAndPrice';
import getWareHouses from 'features/taminot/getWareHouses';

export default function AddNewOrder() {
  const { loading, error } = useSelector((state) => state.taminotItems);

  const [formData, setFormData] = useState({
    cardCode: '0001',
    cardName: 'test',
    docDate: '2024-10-22T07:25:53.288Z',
    docCurrency: '',
    docDueDate: '2024-10-22T07:25:53.288Z',
    branchId: '',
    documentLines: [
      {
        itemCode: '',
        itemDescription: '',
        unitPrice: 0,
        quantity: 0,
        warehouseCode: '',
      },
    ],
  });

  // Handle top-level input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle documentLines input changes
  const handleLineChange = (index, field, value) => {
    const newLines = [...formData.documentLines];
    newLines[index][field] = value;
    setFormData((prev) => ({ ...prev, documentLines: newLines }));
  };

  // Add a new line to documentLines
  const addLine = () => {
    setFormData((prev) => ({
      ...prev,
      documentLines: [
        ...prev.documentLines,
        {
          itemCode: '',
          itemDescription: '',
          unitPrice: 0,
          quantity: 0,
          warehouseCode: '',
        },
      ],
    }));
  };

  // Remove a line from documentLines
  const removeLine = (index) => {
    setFormData((prev) => ({
      ...prev,
      documentLines: prev.documentLines.filter((_, i) => i !== index),
    }));
  };
  const dispatch = useDispatch();
  const toast = useToast();

  // Handle form submission (for demonstration purposes)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    dispatch(addOrderToTaminot(formData)).then((el) => {
      if (el.meta.requestStatus === 'fulfilled') {
        toast({
          title: "Ma'lumotlar muvaffaqiyatli qo'shildi.",
          status: 'success',
        });
      }

      if (el.meta.requestStatus === 'rejected') {
        toast({
          title: "Ma'lumotlar qo'shishni imkoni bo'lmadi: " + error,
          status: 'error',
        });
      }
    });
    // Here you could send `formData` to your API or further process it.
  };

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getPartners());
    dispatch(getItemsByWarehouseAndPrice());
    dispatch(getWareHouses());
  }, []);

  const { departments, partners, warehouse, warehouses } = useSelector(
    (state) => state.taminotItems,
  );

  return (
    <Box p={5} maxW="600px" mx="auto">
      <Heading>Add new order</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          {/* Top-level Fields */}
          <FormControl>
            <FormLabel>Card Code</FormLabel>

            <Select
              name="cardCode"
              value={formData.cardCode}
              onChange={handleChange}
            >
              <option selected value="">
                Select card code
              </option>
              {partners &&
                partners.map((el, i) => (
                  <option key={i} value={el.cardCode}>
                    {el.cardName}
                  </option>
                ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Card Name</FormLabel>
            <Input
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Document Date</FormLabel>
            <Input
              type="datetime-local"
              name="docDate"
              value={formData.docDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Document Currency</FormLabel>

            <Select
              name="docCurrency"
              value={formData.docCurrency}
              onChange={handleChange}
            >
              <option value="" selected disabled>
                Select currensy
              </option>
              <option value="UZS">UZS</option>
              <option value="USD">USD</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Document Due Date</FormLabel>
            <Input
              type="datetime-local"
              name="docDueDate"
              value={formData.docDueDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <Select
              name="branchId"
              value={formData.branchId}
              onChange={handleChange}
            >
              <option value="">Select Branch</option>
              {departments &&
                departments.map((el, i) => (
                  <option key={i} value={el.bplid}>
                    {el.bplName}
                  </option>
                ))}
            </Select>
          </FormControl>

          {/* Document Lines */}
          <Box>
            <FormLabel>Document Lines</FormLabel>
            {formData.documentLines.map((line, index) => (
              <Stack
                key={index}
                direction="row"
                align="center"
                spacing={2}
                mb={2}
              >
                <FormControl>
                  <FormLabel>Item Code</FormLabel>

                  <Select
                    onChange={(e) =>
                      handleLineChange(index, 'itemCode', e.target.value)
                    }
                  >
                    <option selected disabled value="">
                      Select Item
                    </option>
                    {warehouse &&
                      warehouse.map((el, i) => {
                        return (
                          <option key={i} value={el.itemCode}>
                            {el.itemCode}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Item Description</FormLabel>
                  <Input
                    value={line.itemDescription}
                    onChange={(e) =>
                      handleLineChange(index, 'itemDescription', e.target.value)
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Unit Price</FormLabel>
                  <NumberInput
                    value={line.unitPrice}
                    onChange={(valueString) =>
                      handleLineChange(
                        index,
                        'unitPrice',
                        parseFloat(valueString) || 0,
                      )
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput
                    value={line.quantity}
                    onChange={(valueString) =>
                      handleLineChange(
                        index,
                        'quantity',
                        parseInt(valueString) || 0,
                      )
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Warehouse Code</FormLabel>

                  <Select
                    onChange={(e) =>
                      handleLineChange(index, 'warehouseCode', e.target.value)
                    }
                  >
                    <option value="">select warehouse code</option>
                    {warehouses &&
                      warehouses.map((el, i) => {
                        return (
                          <option key={i} value={el.warehouseCode}>
                            {el.warehouseName}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>

                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => removeLine(index)}
                  aria-label="Remove line"
                />
              </Stack>
            ))}

            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={addLine}
              mt={3}
            >
              Add Line
            </Button>
          </Box>

          {/* Submit Button */}
          <Button isLoading={loading} colorScheme="green" type="submit" mt={4}>
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
