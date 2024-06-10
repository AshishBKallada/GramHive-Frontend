import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Textarea,
} from "@material-tailwind/react";

import { sentReportFeedback } from "../../../services/services";
import { useToast } from "@chakra-ui/react";

function ReportFeedback({ reportFeedback, setReportFeedback }) {
  const toast = useToast();
  const [reason, setReason] = useState("");

  const handleOpen = () => setReportFeedback((prev) => !prev);

  const handleReportFeedback = async () => {
    const data = {
      postId: reportFeedback, 
      reason: reason,
    };
  
    try {
      const response = await sentReportFeedback(data); 
      console.log('reeeeeeeeeeeeee',response);
  
      if (response.status === 201) {
        setReportFeedback(null);
        toast({
          title: "Request submitted!",
          description: "Your feedback has been submitted successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else if (response.status === 203) {
        setReportFeedback(null);

        const message = response.data.message || "Feedback already submitted"; 
        toast({
          title: message,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      } else {
        setReportFeedback(null);

        console.error("Unexpected error:", response); 
        toast({
          title: "Failed to submit request!",
          status: "error", 
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
        setReportFeedback(null);

      console.error("Error submitting report:", error);
      toast({
        title: "An error occurred!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  
  return (
    <div>
      <Dialog
        size="xs"
        open={reportFeedback}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Submit a feedback to unban Post ?
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your reason or justification below.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Your Reason
            </Typography>
            <Textarea
              onChange={(e) => setReason(e.target.value)}
              label="Reason"
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-teal-300 text-white"
              onClick={handleReportFeedback}
              fullWidth
            >
              Submit
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Let us know why you believe your post was banned. Did you
              accidentally violate a guideline?
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}

export default ReportFeedback;
