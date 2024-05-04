import React from "react";
import { WavyBackground } from "../../Components/User/external/wavy-backgroubd";

export function Story() {
    return (
        <>
            <WavyBackground>
                <div className="flex items-center justify-between mt-10 mx-10"> 
                    <div className="w-[15%]"> 
                        <img src="https://fontmeme.com/permalink/240503/a20fc36e9e5a60622290363c573ebead.png" alt="" />
                    </div>
                    <div className="ml-4 "> 
                        <a href="">
                            <button
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border-white bg-GRAY-500 text-white shadow-md shadow-gray-500 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                type="button"
                            >
                                Close
                            </button>
                        </a>
                    </div>
                </div>
            </WavyBackground>
        </>
    );
}
