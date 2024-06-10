import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useToast } from "@chakra-ui/react";
import { ReportPost,ReportUser } from "../../../services/services";

function ConfirmModal({
  type,
  Id,
  category,
  reason,
  confirmModal,
  setConfirmModal,
  setReasonModal,
  setReportModal,
}) {
  const handleOpen = () => setConfirmModal((prev) => !prev);
  const toast = useToast();

  const handleReportSubmit = async () => {
    let response;

    if (type === "post") {
      response = await ReportPost(Id, category, reason);
    } else if (type === "user") {
      response = await ReportUser(Id, category, reason);
    }

    if (response.success) {
      setConfirmModal(false);
      setReasonModal(false);
      setReportModal(false);
      toast({
        title: response.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setConfirmModal(false);
      setReasonModal(false);
      setReportModal(false);
      toast({
        title: response.message,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Dialog open={confirmModal} handler={handleOpen}>
      <DialogHeader>Confirm Reporting?</DialogHeader>

      <DialogBody className="flex items-center">
        <img
          className="w-20 h-20 mr-4"
          src="https://thumbs.dreamstime.com/b/caution-icon-sign-flat-style-isolated-warning-symbol-your-web-site-logo-app-ui-design-vector-illustration-92961182.jpg"
          alt="Warning"
        />
        <p>
          Are you sure you want to report this? Reporting helps us maintain a
          safe and positive environment for everyone.
        </p>
      </DialogBody>

      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Back</span>
        </Button>
        <Button onClick={handleReportSubmit} variant="gradient" color="green">
          <span>Continue</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ConfirmModal;
