import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import React from 'react'

function Signup() {
  return (
    <VStack>
      <FormControl>
        <FormLabel></FormLabel>
        <Input placeholder='Enter Your name' />
      </FormControl>
    </VStack>
  );
}

export default Signup;
