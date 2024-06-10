import { ReportPost } from "../../services/services";

export function useReportPost() {
  const reportPost = async (Id, category, reason, toast) => {
    try {
      const response = await ReportPost(Id, category, reason);
      if (response.status === 200) {
        toast({
          title: "Post was reported",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        return true;
      } else if (response.status === 201) {
        toast({
          title: "Post was already reported",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        return true;
      } else {
        toast({
          title: "Failed to report post",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        return false;
      }
    } catch (error) {
      console.error("Error reporting post:", error);
      toast({
        title: "An error occurred",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return false;
    }
  };

  return reportPost;
}
