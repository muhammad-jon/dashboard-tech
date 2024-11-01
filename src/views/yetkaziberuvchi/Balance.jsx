import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import fetchBalance from 'features/yetkaziberuvchi/balanceThunk';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Balance = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBalance());
  }, []);

  let businessPartners = useSelector((state) => state.balance.data);

  return (
    <div>
      <Heading>Balance</Heading>
      <TableContainer mt={5}>
        <Table variant="striped" colorScheme="green">
          <Thead>
            <Tr>
              <Th>{'group Code'}</Th>
              <Th>{'card Name'}</Th>
              <Th>{'current Account Balance'}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {businessPartners &&
              businessPartners.data.map((el) => {
                return (
                  <Tr key={el.cardCode}>
                    <Td>{el.groupCode}</Td>
                    <Td>{el.cardName}</Td>
                    <Td>{el.currentAccountBalance}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Balance;
