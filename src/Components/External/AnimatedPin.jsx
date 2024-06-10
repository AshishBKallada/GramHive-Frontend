"use client";
import React from "react";
import { PinContainer } from "./3d-pin";

export function AnimatedPinDemo({ image }) {
  return (
    <div className="h-[25rem] w-full flex items-center justify-center mb-6  ">
        <a href={image.url}><PinContainer
        title="Myntra Fashion Sale"
        href={image.url}
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[30rem] h-[20rem] border border-teal-300">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-white text-slate-100">
            {image.caption}
          </h3>
          <div className="text-white !m-0 !p-0 font-normal">
            <span className="text-slate-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis at
              animi magnam ipsum fugiat aspernatur quam.
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-purple-400 via-purple-500 to-blue-600 h-32 w-32">
            <img
              src={image.imageFile}
              alt={image.caption || "Ad image"}
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </PinContainer></a>
      
    </div>
  );
}
