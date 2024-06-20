import React, { useEffect, useState } from "react";
import Story from "../../Components/User/Story/Story";
import { CardStackDemo } from "../../Components/User/stackCard/stackCard";
import SidebarTest from "../../Components/User/Sidebar/SidebarTest";
const PostCard = React.lazy(() =>
  import("../../Components/User/Post/PostCard")
);
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useToast } from "@chakra-ui/react";
import { sendReport } from "../../services/services";
import ChatBot from "../../Components/User/ChatBot/ChatBot";
import { Notes } from "../../Components/User/HomeModals/Notes";
import Suggestions from "../../Components/User/Suggestions/Suggestions";

function Home() {
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState();
  const toast = useToast();
  const [showBot, setShowBot] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleReportSubmit = async () => {
    const response = await sendReport(report);
    if (response.data.success) {
      handleOpen();
      toast({
        title: "Report submitted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      handleOpen();
      toast({
        title: "Failed to submit report",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div className="overflow-y-hidden">
        <div className="fixed left-0 top-0">
          <SidebarTest />
        </div>
        <div className="ml-[24%] sticky top-0">
          <div className="flex justify-between items-center relative">
            <Story />
            <div className="flex items-end space-y-4">
              <button className="w-24 h-24" onClick={handleOpen}>
                <img
                  src="https://media.istockphoto.com/id/1276662661/vector/feedback-speech-bubble-icon-vector-design.jpg?s=612x612&w=0&k=20&c=_zkKd_Am_djsPmfBJC4rOao_ulnecADEk08e5BrO7YQ="
                  alt=""
                />
              </button>
              <button
                onClick={() => setShowNoteModal((prev) => !prev)}
                className="w-16 h-16"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKOHUCDffl2LDh9wrpjyOKl12IBA4t1EwRcPWI-0x84aSCr6jyb6nPi-Btr_-S9Jdrb-A&usqp=CAU"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>

        <div
          className="scroll-smooth overflow-scroll"
          style={{
            display: "flex",
            marginLeft: "24%",
            overflowY: "scroll",
            height: "calc(100vh - 8rem)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div style={{ flex: "1 1 auto", marginRight: "16px" }}>
            <PostCard />
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ flex: "0 0 auto" }} className="fixed top-[250px] right-[50px]">
              <CardStackDemo />
            </div>
          </div>
          {showBot && <ChatBot showBot={showBot} setShowBot={setShowBot} />}
          {showNoteModal && (
            <Notes
              showNoteModal={showNoteModal}
              setShowNoteModal={setShowNoteModal}
            />
          )}
        </div>
      </div>
      <button
        className="w-20 h-20 rounded-full"
        style={{
          position: "fixed",
          bottom: "4px",
          right: "0px",
          zIndex: 1000,
        }}
        onClick={() => setShowBot(true)}
      >
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/007/225/199/small_2x/robot-chat-bot-concept-illustration-vector.jpg"
          alt="AI Bot"
          className="w-full h-full"
        />
      </button>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>
            <Typography variant="h5" color="blue-gray">
              Report something !
            </Typography>
          </DialogHeader>
        </div>
        <div className="flex justify-center items-center">
          <img
            className="w-24 h-24"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpoI79d4joS-flgvT106wD1uqWUrKEhxa24taxxTM9vg&s"
            alt=""
          />
        </div>
        <DialogBody>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Write to us :
            </Typography>
            <Textarea
              onChange={(e) => setReport(e.target.value)}
              label="Message"
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="teal" onClick={handleReportSubmit}>
            send message
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Home;
