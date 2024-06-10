"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Input, Button } from "@material-tailwind/react";
import { sendNoteReply } from "../../services/services";
import { useToast } from "@chakra-ui/react";

export const CardStack = ({ items, offset, scaleFactor }) => {
  const [reply, setReply] = useState(null);
  const [error, setError] = useState(false);
  const toast = useToast();

  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);
  const intervalRef = useRef(null);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleSubmit = async (noteId) => {
    try {
      if (!reply) {
        setError(true);
        return;
      }
      const response = await sendNoteReply(noteId, reply);
      if (response.data.success) {
        setReply(" ");
        toast({
          title: "Reply send !",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to send reply !",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {}
  };

  const startFlipping = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCards((prevCards) => {
        if (prevCards.length === 0) return prevCards;
        const newArray = [...prevCards];
        const lastElement = newArray.pop();
        if (lastElement !== undefined) {
          newArray.unshift(lastElement);
        }
        return newArray;
      });
    }, 5000);
  };

  const handleCardHover = (isHovered) => {
    if (isHovered) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      startFlipping();
    }
  };

  return (
    <div className="relative h-64 w-60 md:h-60 md:w-96">
      {cards.length > 0 &&
        cards.map((card, index) => (
          <motion.card
            key={card.id}
            className="absolute dark:bg-black bg-white h-60 w-60 md:h-72 md:w-96 rounded-3xl p-4 shadow-xl border border-1 border-teal-100 shadow-black/[0.2] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{ transformOrigin: "top center" }}
            onMouseEnter={() => handleCardHover(true, index)}
            onMouseLeave={() => handleCardHover(false, index)}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              "{card.note}"
              <div className="font-normal text-neutral-700 dark:text-neutral-200 flex items-center mt-4">
                <span>
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={card.userId.image}
                    alt=""
                  />
                </span>
                <div>
                  <p className="text-neutral-500 font-medium dark:text-white">
                    {card.userId.username}
                  </p>
                  <p className="text-neutral-400 font-normal dark:text-neutral-200">
                    {card.userId.name}
                  </p>
                </div>
              </div>

              {error && (
                <p className="error-message text-red-500">
                  Please enter a reply.
                </p>
              )}
            </div>
            <div className="flex">
              {index === 0 && (
                <Input
                  onChange={(e) => {
                    setReply(e.target.value);
                    setError(false);
                  }}
                  label="Reply"
                  value={reply}
                />
              )}
              <Button
                onClick={() => handleSubmit(card._id)}
                className="bg-teal-500 ml-2"
              >
                <i className="fa fa-location-arrow"></i>
              </Button>
            </div>
            <div className="text-neutral-400 font-normal dark:text-neutral-200"></div>
          </motion.card>
        ))}
    </div>
  );
};
 