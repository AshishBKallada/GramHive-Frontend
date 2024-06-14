import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MainContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import {
    Dialog,
    DialogHeader,
    DialogBody,
  } from "@material-tailwind/react";

function ChatBot({ showBot, setShowBot }) {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello ! I am Turbo GPT",
      sender: "ChatGPT",
      direction:'ougoing'
    },
  ]);

  const handleSend = async (msg) => {
    const newMsg = {
      message: msg,
      sender: "user",
    };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setTyping(true);

    await processMsgToChatGPT(updatedMessages);
  };
  console.log('MESSAGES',messages);

  const processMsgToChatGPT = async (chatMessages) => {
    let apiMessages = chatMessages.map((msgObj) => {
      let role = "";
      if (msgObj.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: msgObj.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like I am 10 years old",
    };

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [systemMessage,
        ...apiMessages],
    };

    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };

  return (
    <Dialog 
    open={showBot} 
    handler={() => setShowBot(prev => !prev)}
    size="xs"
    className="fixed top-0 -right-5 mt-16 mr-16 w-80"
  ><DialogHeader className="bg-teal-500 text-white relative flex items-start justify-between">
  <div>
    <div className="relative">
      TurboGram
    </div>
    <span className="ml-4 text-sm">powered by GramHive</span>
  </div>
  <img 
    className="w-10 h-10 rounded-full"
    src="https://t4.ftcdn.net/jpg/05/22/45/47/360_F_522454763_AhlOA9VzGEoAdc7jrGk2HIYUBIRU1WFd.jpg"
    alt=""
  />
</DialogHeader>


      <DialogBody>
        <div style={{ height: '500px' }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                typingIndicator={
                  typing ? <TypingIndicator content="Typing" /> : null
                }
              >
                {messages.map((msg, i) => {
                  return <Message key={i} model={msg} />;
                })}
              </MessageList>
              <MessageInput placeholder="Type here..." onSend={handleSend} />
            </ChatContainer>
          </MainContainer>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default ChatBot;
