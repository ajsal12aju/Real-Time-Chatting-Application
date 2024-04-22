import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import {useHistory} from "react-router-dom"

function Login() {
      const [show, setShow] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const toast = useToast()
 const history = useHistory()


  const handleClick = () => {
    setShow(!show);
  };
  // const postDetails = () => {};
  const submitHandler = async () => {
    setLoading(true);
if( !email || !password ){
  toast({
    title: "Please fill all the feilds.",
    description: "We've created your account for you.",
    status: "warning",
    duration: 5000,
    isClosable: true,
  });
  setLoading(false);
}
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/login",
      {email, password },
      config
    );
  toast({
    title: "Login Successfull.",
    description: "We've created your account for you.",
    status: "success",
    duration: 5000,
    isClosable: true,
  });
  localStorage.setItem("userInfo", JSON.stringify(data))
  setLoading(false);
  history.push('/chats')
  } catch (error) {
     toast({
       title: "Error Occuerd.",
       description: "We've created your account for you.",
       status: "warning",
       duration: 5000,
       isClosable: true,
     });
       setLoading(false);
  }
  };
  return (
    <VStack color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        w="100%"
        bg="darkslateblue"
        color="white"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        w="100%"
        bg="red"
        color="white"
        style={{ marginTop: 15 }}
        onClick={()=>{
          setEmail("guest@Example.com")
          setPassword("123456")
        }}
      >
        Get Gust User Credentials
      </Button>
    </VStack>
  );
}

export default Login;
