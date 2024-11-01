// chakra imports
import { Accordion, Box, Flex, Stack } from '@chakra-ui/react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import React from 'react';

// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;
  // SIDEBAR
  return (
    <Flex
      direction="column"
      height="100%"
      pt="25px"
      px="16px"
      borderRadius="30px"
    >
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box>
        <Accordion  defaultIndex={[0]} allowMultiple>
          <Links routes={routes} />
        </Accordion>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
