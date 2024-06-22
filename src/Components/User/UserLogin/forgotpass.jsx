import React, { useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useToast } from "@chakra-ui/react";
import { sendResetPassMail } from "../../../services/services";

function ForgotPasswordModal({ handleOpen }) {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSendMail = async () => {
    try {
        const { data } = await sendResetPassMail(email);
        if (data.success) {
            toast({
                title: "Mail sent successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Failed to send mail.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        }
    } catch (error) {
        console.error('Error sending reset password email:', error);
        toast({
            title: "An error occurred.",
            description: error.response?.data?.message || "Failed to send password reset email.",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }
};

  return (
    <Dialog size="md" open={true} handler={handleOpen}>
      <DialogBody>
      <main id="content" role="main" class="w-full  max-w-md mx-auto p-6">
    <div class="mt-7 bg-white  rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-700 border-1 border-teal-300">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Remember your password?
            <a class="text-blue-600 decoration-2 hover:underline font-medium" href="#">
              Login here
            </a>
          </p>
        </div>

        <div class="mt-5">
          <form>
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                <div class="relative">
                  <input
                  onChange={(e)=>setEmail(e.target.value)}
                   type="email" id="email" name="email" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                </div>
                <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
              </div>
              <button
              onClick={handleSendMail}
              type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Reset password</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <p class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
      <a class="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#" target="_blank">
        
        Need Help ?
      </a>
      <a class="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#">
        
        Contact us!
      </a>
    </p>
  </main>
      </DialogBody>
    </Dialog>
  );
}

export default ForgotPasswordModal;
