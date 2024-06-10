import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function AdCards({ showCards,handleShowCards }) {
  return (
    <Dialog open={showCards} size={"lg"} handler={handleShowCards}>
      <DialogBody>
        <div className="ml-2 mt-4">
          <h2 class="mb-12 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-5xl">
            Ad Guidelines
          </h2>
          <div class="gr mx-auto max-w-2xxl items-stretch space-y-4 text-left sm:flex sm:space-y-0 sm:space-x-8 sm:text-center">
            <a
              class="flex w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10 sm:flex-col sm:hover:shadow-2xl"
              href="#"
              target="_blank"
            >
              <img
                class="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32"
                src="https://thumbs.dreamstime.com/z/intimidation-black-glyph-icon-verbal-bullying-harassment-violence-sign-web-page-mobile-app-button-logo-188199784.jpg"
                alt="Framework7"
              />
              <div>
                <div class="font-semibold text-black dark:text-white sm:mt-4 sm:mb-2">
                  Violence
                </div>
                <div class="text-sm opacity-75">
                  Ads must not promote or depict excessive violence or gore.
                </div>
              </div>
            </a>
            <a
              class="flex w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10 sm:flex-col sm:hover:shadow-2xl"
              href="#"
              target="_blank"
            >
              <img
                class="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32"
                src="https://img.freepik.com/free-vector/business-target-achievement-concept-young-businessman-is-happy-that-business-is-as-successful-as-arrow-that-shoots-accurately-into-center-target-vector-illustration_1150-60919.jpg"
                alt="Atropos"
              />
              <div>
                <div class="font-semibold text-black dark:text-white sm:mt-4 sm:mb-2">
                  Accuracy
                </div>
                <div class="text-sm opacity-75">
                  {" "}
                  Ensure all claims and statements are truthful and verifiable.
                </div>
              </div>
            </a>
            <a
              class="flex w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10 sm:flex-col sm:hover:shadow-2xl"
              href="#"
              target="_blank"
            >
              <img
                class="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32"
                src="https://assets.materialup.com/uploads/0e97c5f6-cdbf-48a4-94f0-d5992c4d3a59/preview.jpg"
                alt="Konsta UI"
              />
              <div>
                <div class="font-semibold text-black dark:text-white sm:mt-4 sm:mb-2">
                  Ad Review
                </div>
                <div class="text-sm opacity-75">
                  {" "}
                  All ads will be reviewed by our team to ensure compliance with
                  these guidelines.
                </div>
              </div>
            </a>{" "}
            <a
              class="flex w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10 sm:flex-col sm:hover:shadow-2xl"
              href="#"
              target="_blank"
            >
              <img
                class="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32"
                src="https://as1.ftcdn.net/v2/jpg/02/81/40/34/1000_F_281403423_Cm2eLHZ6fJpR8zjitpJ1U7zpH1vsOtBR.jpg"
                alt="Atropos"
              />
              <div>
                <div class="font-semibold text-black dark:text-white sm:mt-4 sm:mb-2">
                  Respect for Community
                </div>
                <div class="text-sm opacity-75">
                  Ads should respect the platform's community standards and
                  promote a positive user experience.
                </div>
              </div>
            </a>
          </div>
        </div>
      </DialogBody>
     
    </Dialog>
  );
}

export default AdCards;
