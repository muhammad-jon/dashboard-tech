import { Box, Button } from '@chakra-ui/react';
import React from 'react';

const Loading = () => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Button
        isLoading
        loadingText="Loading..."
        colorScheme="teal"
        variant="outline"
      ></Button>
    </Box>
  );
};

export default Loading;
