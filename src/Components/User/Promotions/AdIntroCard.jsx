import React, { useState } from "react";
import AdCards from "./AdCards";

function AdIntroCard() {
  const [showCards, setShowCards] = useState(false);
  const handleShowCards = () => setShowCards((prev) => !prev);
  return (
    <div>
      {showCards && (
        <AdCards showCards={showCards} handleShowCards={handleShowCards} />
      )}
      <section class="py-6 bg-white sm:py-10 lg:py-16">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-5xl">
          <div class="grid items-center grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-16">
            <div>
              <img
                class="w-full max-w-sm mx-auto"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/integration/2/services-icons.png"
                alt=""
              />
            </div>

            <div class="text-center lg:text-left">
              <h2 class="text-2xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl">
                Grow business with promotions.
              </h2>
              <p class="mt-4 text-sm text-gray-600 sm:text-base">
                "Boost your business growth by strategically targeting the right
                audience with data-driven ads. Increase brand visibility, drive
                traffic, and enhance sales through effective advertising
                campaigns."
              </p>
              <div onClick={() => setShowCards(true)}>
                <a
                  title=""
                  class="inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md mt-6 hover:bg-blue-700 focus:bg-blue-700"
                  role="button"
                >
                  {" "}
                  Check Ad Guidelines{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdIntroCard;
