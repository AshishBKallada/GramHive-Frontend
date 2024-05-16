"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../util";

export const ParallaxScroll = ({ images, className, handlePostDetails }) => {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div style={{overflowY: 'auto', WebkitOverflowScrolling:'touch',scrollbarWidth:'none'}}
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  max-w-5xl mx-auto gap-10 py-40 px-10"
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
              <div
                onClick={() => handlePostDetails(el)}
                className="h-80 w-full overflow-hidden rounded-lg gap-10 !m-0 !p-0"
              >
                <img
                  src={el.images[0]}
                  className="object-cover w-full h-full object-center object-left-top"
                  style={{ objectPosition: "center" }}
                  alt="thumbnail"
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <div
                onClick={() => handlePostDetails(el)}
                className="h-80 w-full overflow-hidden rounded-lg gap-10 !m-0 !p-0"
              >
                <img
                  src={el.images[0]}
                  className="object-cover w-full h-full object-center"
                  alt="thumbnail"
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <div
                onClick={() => handlePostDetails(el)}
                className="h-80 w-full overflow-hidden rounded-lg gap-10 !m-0 !p-0"
              >
                <img
                  src={el.images[0]}
                  className="object-cover w-full h-full object-center object-left-top"
                  style={{ objectPosition: "center" }}
                  alt="thumbnail"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
