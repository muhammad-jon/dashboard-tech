import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
  return (
    <Flex align="center" direction="column">
      <Heading mb={10}>Muhammad</Heading>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
