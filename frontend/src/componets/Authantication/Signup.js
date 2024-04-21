import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react';
axi

function Signup() {

    const [show, setShow] = useState(false);
    const [name, setName] = useState()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
console.log(pic, "===pic===");
    const toast = useToast()
    const handleClick = () =>{
        setShow(!show)
    }
    const postDetails = (pics) => {
      setLoading(true);
      if (pics === undefined) {
        toast({
          title: "Please select an image.",
          description: "We've created your account for you.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      if(pics.type === "image/jpeg"  || pics.type === "image/png"){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "du5bvvdpv");
        fetch("https://api.cloudinary.com/v1_1/du5bvvdpv/image/upload", {
          method:"post",
          body:data,
        }).then((res)=> res.json())
        .then((data)=>{
                    console.log(data);

          setPic(data.url.toString());
          setLoading(false)
        }).catch((err) => {
          console.log(err);
          setLoading(false)
        })
      }else{
         toast({
           title: "Please select an image.",
           description: "We've created your account for you.",
           status: "warning",
           duration: 5000,
           isClosable: true,
         });
         setLoading(false);
         return
      }
    };
  const submitHandler = async () => {
setLoading(true);
if(!name || !email || !password || !confirmpassword ){
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
    const {data} = await axios.post()
  } catch (error) {
    
  }

  };
  return (
    <VStack color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
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
      <FormControl id="pic" isRequired>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input type="file" onChange={(e) => postDetails(e.target.files[0])} />
      </FormControl>
      <Button
        color="white"
        w="100%"
        bg="darkslateblue"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Submit
      </Button>
    </VStack>
  );
}

export default Signup;
