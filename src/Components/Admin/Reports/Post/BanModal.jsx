import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useToast } from "@chakra-ui/react";
import { BanPost } from "../../../../services/services";

function BanModal({isBan, postId, open, setShowBanModal }) {
  const toast = useToast();
  const handleOpen = () => setShowBanModal((prev) => !prev);
  const handleBan = async (postId) => {
    try {
      const { success, message } = await BanPost(postId);
      if (success) {
        handleOpen();
        toast({
          title: message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        handleOpen();
        toast({
          title: message,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {}
  };
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>
        <Typography variant="h5" color="blue-gray">
          Ban this Post ?
        </Typography>
      </DialogHeader>
      <DialogBody divider className="grid place-items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-16 w-16 text-red-500"
        >
          <path
            fillRule="evenodd"
            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
            clipRule="evenodd"
          />
        </svg>
        <Typography color="red" variant="h4">
          Are you sure to ban this post !
        </Typography>
        <Typography className="text-center font-normal">
          The selected post will be banned, and the user will be notified about
          this action. (Any post which is against the community guidelines
          should be banned.)
        </Typography>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" color="blue-gray" onClick={handleOpen}>
          Close
        </Button>
        <Button className="bg-red-900" onClick={() => handleBan(postId)}>
          {isBan? "Unban" : "Ban"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default BanModal;
