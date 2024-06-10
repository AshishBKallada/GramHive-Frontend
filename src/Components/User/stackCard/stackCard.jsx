"use client";
import { useEffect, useState } from "react";
import { cn } from "../../../../util";
import { CardStack } from "../../External/card-stack";
import { getNotes } from "../../../services/services";

export function CardStackDemo() {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await getNotes();
    if (response.data) {
      setNotes(response.data);
    } else {
    }
  };
  return (
    <div className="mr-20 h-[16rem] flex items-center justify-center w-full">
     {notes && <CardStack items={notes} />} 
    </div>
  );
}

export const Highlight = ({ children, className }) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-teal-300 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: (
      <p>
        These cards are amazing, <Highlight>I want to use them</Highlight> in my
        project. Framer motion is a godsend ngl tbh fam 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: (
      <p>
        I dont like this Twitter thing,{" "}
        <Highlight>deleting it right away</Highlight> because yolo. Instead, I
        would like to call it <Highlight>X.com</Highlight> so that it can easily
        be confused with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: (
      <p>
        The first rule of
        <Highlight>Fight Club</Highlight> is that you do not talk about fight
        club. The second rule of
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
];
