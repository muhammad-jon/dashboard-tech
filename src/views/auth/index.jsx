import React, { useState } from 'react';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuth from 'layouts/auth/Default';
// Assets
import illustration from 'assets/img/auth/auth.jpg';

import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import login from '../../features/auth/authThunk';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
    deviceId: 'string',
    token: 'string',
    language: 'uz',
  });

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    console.log(loginData);
  };

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginData.login === '' || loginData.password === '') {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    await dispatch(login(loginData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast({
          title: 'Success',
          description: 'Hello !!! ',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        return navigate('/');
      } else {
        toast({
          title: 'Yarol yoki login xato',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        return navigate('/auth');
      }
    });
  };

  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Login
          </Heading>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <HSeparator mb="20px" />

          <FormControl isRequired>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Login
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: '0px', md: '0px' }}
              type="text"
              placeholder="Login"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={handleInputChange}
              name="login"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Password"
                mb="24px"
                size="lg"
                type={show ? 'text' : 'password'}
                variant="auth"
                onChange={handleInputChange}
                name="password"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: 'pointer' }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Logging in..."
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
