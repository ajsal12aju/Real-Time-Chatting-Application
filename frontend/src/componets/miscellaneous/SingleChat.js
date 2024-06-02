import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../../config/ChatLogics';
import ProfileModal from './profileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';
import './style.css'
import ScrollebleChat from './ScrollebleChat';
import io from "socket.io-client"
import Lottie from "lottie-react";
import animationData from './typing.json'

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
      const {
        selectedChat,
        setSelectedChat,
        user,
        notification,
        setNotification,
      } = ChatState();
  console.log(notification, "+++notification+++");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(false);
  const [loading, setLoading] = useState();
  const [socketConnectted, setSocketConnectted] = useState(false)
  const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false);


    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings:{
        preserveAspectRatio: "xMidYMid slice" 
      }
    };


    const toast = useToast();

useEffect(() => {
  socket = io(ENDPOINT);
  socket.emit("setup", user);
  socket.on("connected", () => setSocketConnectted(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));


}, []);


  const fetchMessages = async ()=> {
    if(!selectedChat) return

    try {
      const config = {
        headers: {
         
          Authorization: `Bearer ${user.token}`,
        },
      };

        const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
        setMessages(data)
        setLoading(false);
 
        socket.emit("join chat", selectedChat._id)

    } catch (error) {
       toast({
         title: "Error Occurred",
         description: "Failed to load the search results.",
         status: "error",
         duration: 3000,
         isClosable: true,
         position: "top-left",
       });
    }
  } 

  useEffect(() => {
  fetchMessages();
  selectedChatCompare = selectedChat
  }, [selectedChat])

  console.log(notification, "====notification====");

useEffect(() => {
    socket.on("message recieved", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (event) => {
     if(event.key === "Enter" && newMessage){
        socket.emit("stop typing", selectedChat._id);
      try {
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },             
            };
                        setNewMessage("");

            const { data } = await axios.post(
              "/api/message",
              {
                content: newMessage,
                chatId: selectedChat._id,
              },
              config
            );

            socket.emit("new message", data);
            setMessages([...messages, data]);
      } catch (error) {
          toast({
            title: "Error Occurred",
            description: "Failed to load the search results.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-left",
          });
      }
     }
  }


  const typingHandler = (e) => {
    setNewMessage(e.target.value)

    if(!socketConnectted) return;

    if(!typing){
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if(timeDiff >= timerLength && typing){
        socket.emit("stop typing", selectedChat._id)
        setTyping(false)
      }

    }, timerLength)
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat?.chatName.toUpperCase()}

                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflow="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <>
                <div className="messages">
                  <ScrollebleChat messages={messages} />
                </div>
              </>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBotton: "15px", marginLeft: 0 }}
                  />{" "}
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                backgroundColor="#E0E0E0"
                placeholder="Enter a message"
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start a chatting
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat


// import {
//   Box,
//   FormControl,
//   IconButton,
//   Input,
//   Spinner,
//   Text,
//   useToast,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { ChatState } from "../../Context/ChatProvider";
// import { ArrowBackIcon } from "@chakra-ui/icons";
// import { getSender, getSenderFull } from "../../config/ChatLogics";
// import ProfileModal from "./profileModal"; // Ensure correct file name
// import UpdateGroupChatModal from "./UpdateGroupChatModal"; // Ensure correct file name
// import axios from "axios";
// import "./style.css";
// import ScrollebleChat from "./ScrollebleChat"; // Ensure correct file name
// import io from "socket.io-client";
// import Lottie from "lottie-react"; // Correct import
// import animationData from "./typing.json";

// const ENDPOINT = "http://localhost:5000";
// var socket, selectedChatCompare;

// function SingleChat({ fetchAgain, setFetchAgain }) {
//   const { selectedChat, setSelectedChat, user, notification, setNotification } =
//     ChatState();

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState();
//   const [socketConnectted, setSocketConnectted] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

//   const toast = useToast();

//   useEffect(() => {
//     socket = io(ENDPOINT);
//     socket.emit("setup", user);
//     socket.on("connected", () => setSocketConnectted(true));
//     socket.on("typing", () => setIsTyping(true));
//     socket.on("stop typing", () => setIsTyping(false));
//   }, []);

//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const { data } = await axios.get(
//         `/api/message/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);
//       setLoading(false);

//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       toast({
//         title: "Error Occurred",
//         description: "Failed to load the messages.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//         position: "top-left",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//     selectedChatCompare = selectedChat;
//   }, [selectedChat]);

//   useEffect(() => {
//     socket.on("message received", (newMessageReceived) => {
//       if (
//         !selectedChatCompare ||
//         selectedChatCompare._id !== newMessageReceived.chat._id
//       ) {
//         if(!notification.includes(newMessageReceived)){
//           setNotification([newMessageReceived, ...notification])
//           setFetchAgain(!fetchAgain)
//         }
//       } else {
// setMessages([...messages, newMessageReceived]);      }
//     });
//   });

//   const sendMessage = async (event) => {
//     if (event.key === "Enter" && newMessage) {
//       socket.emit("stop typing", selectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
//         setNewMessage("");

//         const { data } = await axios.post(
//           "/api/message",
//           {
//             content: newMessage,
//             chatId: selectedChat._id,
//           },
//           config
//         );

//         socket.emit("new message", data);
//         setMessages([...messages, data]);
//       } catch (error) {
//         toast({
//           title: "Error Occurred",
//           description: "Failed to send the message.",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//           position: "top-left",
//         });
//       }
//     }
//   };

//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnectted) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }

//     let lastTypingTime = new Date().getTime();
//     const timerLength = 3000;

//     setTimeout(() => {
//       const timeNow = new Date().getTime();
//       const timeDiff = timeNow - lastTypingTime;

//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   return (
//     <>
//       {selectedChat ? (
//         <>
//           <Text
//             fontSize={{ base: "28px", md: "30px" }}
//             pb={3}
//             px={2}
//             w="100%"
//             fontFamily="work sans"
//             display="flex"
//             justifyContent={{ base: "space-between" }}
//             alignItems="center"
//           >
//             <IconButton
//               display={{ base: "flex", md: "none" }}
//               icon={<ArrowBackIcon />}
//               onClick={() => setSelectedChat("")}
//             />
//             {!selectedChat.isGroupChat ? (
//               <>
//                 {getSender(user, selectedChat.users)}
//                 <ProfileModal user={getSenderFull(user, selectedChat.users)} />
//               </>
//             ) : (
//               <>
//                 {selectedChat?.chatName.toUpperCase()}

//                 <UpdateGroupChatModal
//                   fetchAgain={fetchAgain}
//                   setFetchAgain={setFetchAgain}
//                   fetchMessages={fetchMessages}
//                 />
//               </>
//             )}
//           </Text>
//           <Box
//             display="flex"
//             flexDir="column"
//             justifyContent="flex-end"
//             p={3}
//             bg="#E8E8E8"
//             w="100%"
//             h="100%"
//             borderRadius="lg"
//             overflow="hidden"
//           >
//             {loading ? (
//               <Spinner
//                 size="xl"
//                 w={20}
//                 h={20}
//                 alignSelf="center"
//                 margin="auto"
//               />
//             ) : (
//               <div className="messages">
//                 <ScrollebleChat messages={messages} />
//               </div>
//             )}
//             <FormControl onKeyDown={sendMessage} isRequired mt={3}>
//               {isTyping ? (
//                 <div>
//                   <Lottie
//                     animationData={animationData}
//                     style={{ width: 70, marginBottom: 15, marginLeft: 0 }}
//                   />
//                 </div>
//               ) : null}
//               <Input
//                 variant="filled"
//                 bg="#E0E0E0"
//                 placeholder="Enter a message"
//                 onChange={typingHandler}
//                 value={newMessage}
//               />
//             </FormControl>
//           </Box>
//         </>
//       ) : (
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           h="100%"
//         >
//           <Text fontSize="3xl" pb={3} fontFamily="Work sans">
//             Click on a user to start chatting
//           </Text>
//         </Box>
//       )}
//     </>
//   );
// }

// export default SingleChat;
