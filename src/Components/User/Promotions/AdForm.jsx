import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useToast } from "@chakra-ui/react";
import { addNewAd, confirmPayment } from "../../../services/services";
import LoadingSpinner from "../../External/LoadingSpinner";

export function AdForm({ openAdModal, setOpenAdModal }) {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([
    { imageFile: null, caption: "", url: "" },
  ]);
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (images != null) {
      const newRate = images.length * 1000;
      setRate(newRate);
    }
  }, [images]);
  const handleOpen = () => setOpenAdModal(!openAdModal);

  const handleInputChange = (index, event) => {
    const { name, value, files } = event.target;
    const values = [...images];

    if (name === "imageFile") {
      values[index][name] = files[0];
      values[index].url = URL.createObjectURL(files[0]);
    } else {
      values[index][name] = value;
    }

    setImages(values);
  };

  const handleAddFields = () => {
    if (images.length < 5) {
      setImages([...images, { imageFile: null, caption: "", url: "" }]);
    }
  };

  const handleRemoveFields = (index) => {
    const values = [...images];
    values.splice(index, 1);
    setImages(values);
  };

  const handleAdSubmit = async () => {
    const newAd = {
      title,
      images,
      rate,
    };

    try {
      setLoading(true);
      const response = await addNewAd(newAd);

      if (!response.data) {
        setLoading(false);
        throw new Error("Failed to create order");
      }

      setLoading(false);
      const orderData = response.data.order;
      const Id = response.data.Id;

      const res = await loadRazorpayScript();
      if (!res) {
        toast({
          title: "Razorpay SDK failed to load",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const options = {
        key: "rzp_test_bccs3wITCd60bv",
        amount: orderData.rate,
        currency: orderData.currency,
        name: "GarmHive",
        description: "By continuing you accept to promote your content",
        order_id: orderData.id,
        handler: async (response) => {
          setOpenAdModal(false);
          try {
            const res = await confirmPayment(Id);
            if (res) {
              toast({
                title: "Promotion successful",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Payment failed!",
                status: "warning",
                duration: 3000,
                isClosable: true,
              });
            }
            await verifyPayment(response);
          } catch (error) {
            console.error("Error during payment verification:", error);
            toast({
              title: "Payment verification failed",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during submission:", error);
      // toast({
      //   title: "An error occurred",
      //   description: error.message,
      //   status: "warning",
      //   duration: 3000,
      //   isClosable: true,
      // });
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  return (
    <>
      <Dialog size={"xl"} open={openAdModal} handler={handleOpen}>
        {loading && <LoadingSpinner />}
        <DialogHeader>Add Promotion.</DialogHeader>
        <DialogBody>
          <Input
            label="Title"
            size="lg"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          {images.map((imageField, index) => (
            <div
              key={index}
              className="flex flex-row items-center mb-4 space-x-4"
            >
              <input
                type="file"
                name="imageFile"
                onChange={(event) => handleInputChange(index, event)}
                className="mb-2"
              />
              {imageField.url && (
                <img
                  src={imageField.url}
                  alt={`preview-${index}`}
                  className="h-20 w-20 rounded border border-teal"
                />
              )}
              <Input
                label="Caption"
                name="caption"
                size="lg"
                value={imageField.caption}
                onChange={(event) => handleInputChange(index, event)}
                className="flex-1"
              />
              <Input
                label="Image URL"
                name="url"
                size="lg"
                onChange={(event) => handleInputChange(index, event)}
                className="flex-1"
              />
              <Button
                variant="text"
                color="red"
                onClick={() => handleRemoveFields(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          {images.length < 5 && (
            <Button className="mt-4" onClick={handleAddFields}>
              Add More Images
            </Button>
          )}
          <p className="text-red-500"> Rs. {rate ? rate : ""}</p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleAdSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
