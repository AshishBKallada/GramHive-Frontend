import { ReportUser } from "../../services/services";

export function useReportUser() {
  const reportUser = async (Id, category, reason, toast) => {
    try {
      const response = await ReportUser(Id, category, reason);
      if (response.data.success) {
        toast({
          title: "User was reported",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        return true;
      } else if (response.status === 201) {
        toast({
          title: "User was already reported",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        return true;
      } else {
        toast({
          title: "Failed to report user",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
    } catch (error) {
      console.error("Error reporting user:", error);
      toast({
        title: "An error occurred",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
  };

  return reportUser;
}
