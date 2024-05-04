import React from 'react';

const Chat = () => {
  return (
    <>
      <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center bg-gray-200">
        <div className="flex items-center">
          <div>
            <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" alt="Expendables 4" />
          </div>
          <div className="ml-4">
            <p className="text-grey-darkest">
              David Beckham
            </p>
            <p className="text-grey-darker text-xs mt-1">
              Andrés, Tom, Harrison, Arnold, Sylvester
            </p>
          </div>
        </div>

        <div className="flex">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".5" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
          </div>
          <div className="ml-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".5" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg>
          </div>
          <div className="ml-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
          </div>
        </div>
      </div>
      <div className="flex-1  mt-4"  style={{ overflowY: 'scroll', maxHeight: '640px' }}>
        <div className="h-full">
          <div className="grid pb-11">
            <div class="flex gap-2.5 mb-4">
              <img src="https://pagedone.io/asset/uploads/1710412177.png" alt="Shanay image" class="w-10 h-11" />
              <div class="grid">
                <h5 class="text-gray-900 text-sm font-semibold leading-snug pb-1">Shanay cruz</h5>
                <div class="w-max grid">
                  <div class="px-3.5 py-2 bg-gray-100 rounded justify-start  items-center gap-3 inline-flex">
                    <h5 class="text-gray-900 text-sm font-normal leading-snug">Guts, I need a review of work. Are you ready?</h5>
                  </div>
                  <div class="justify-end items-center inline-flex mb-2.5">
                    <h6 class="text-gray-500 text-xs font-normal leading-4 py-1">05:14 PM</h6>
                  </div>
                </div>
                <div class="w-max grid">
                  <div class="px-3.5 py-2 bg-gray-100 rounded justify-start items-center gap-3 inline-flex">
                    <h5 class="text-gray-900 text-sm font-normal leading-snug">Let me know</h5>
                  </div>
                  <div class="justify-end items-center inline-flex mb-2.5">
                    <h6 class="text-gray-500 text-xs font-normal leading-4 py-1">05:14 PM</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-2.5 justify-end">
            <div class="">
              <div class="grid mb-2" >
                <h5 class="text-right text-gray-900 text-sm font-semibold leading-snug pb-1">You</h5>
                <div class="px-3 py-2 bg-indigo-600 rounded">
                  <h2 class="text-white text-sm font-normal leading-snug">Yes, let’s see, send your work here</h2>
                </div>
                <div class="justify-start items-center inline-flex">
                  <h3 class="text-gray-500 text-xs font-normal leading-4 py-1">05:14 PM</h3>
                </div>
              </div>
              <div class="justify-center">
                <div class="grid w-fit ml-auto">
                  <div class="px-3 py-2 bg-indigo-600 rounded ">
                    <h2 class="text-white text-sm font-normal leading-snug">Anyone on for lunch today</h2>
                  </div>
                  <div class="justify-start items-center inline-flex">
                    <h3 class="text-gray-500 text-xs font-normal leading-4 py-1">You</h3>
                  </div>
                </div>
              </div>
            </div>
            <img src="https://pagedone.io/asset/uploads/1704091591.png" alt="Hailey image" class="w-10 h-11" />
          </div>

        </div>

        <div className="h-full">
          <div className="grid pb-11">
            <div class="flex gap-2.5 mb-4">
              <img src="https://pagedone.io/asset/uploads/1710412177.png" alt="Shanay image" class="w-10 h-11" />
              <div class="grid">
                <h5 class="text-gray-900 text-sm font-semibold leading-snug pb-1">Shanay cruz</h5>
                <div class="w-max grid">
                  <div class="px-3.5 py-2 bg-gray-100 rounded justify-start  items-center gap-3 inline-flex">
                    <h5 class="text-gray-900 text-sm font-normal leading-snug">Guts, I need a review of work. Are you ready?</h5>
                  </div>
                  <div class="justify-end items-center inline-flex mb-2.5">
                    <h6 class="text-gray-500 text-xs font-normal leading-4 py-1">05:14 PM</h6>
                  </div>
                </div>
                <div class="w-max grid">
                  <div class="px-3.5 py-2 bg-gray-100 rounded justify-start items-center gap-3 inline-flex">
                    <h5 class="text-gray-900 text-sm font-normal leading-snug">Let me know</h5>
                  </div>
                  <div class="justify-end items-center inline-flex mb-2.5">
                    <h6 class="text-gray-500 text-xs font-normal leading-4 py-1">05:14 PM</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-2.5 justify-end">
            <div class="">
              <div class="grid mb-2" >
                <h5 class="text-right text-gray-900 text-sm font-semibold leading-snug pb-1">You</h5>
                <div class="px-3 py-2 bg-indigo-600 rounded">
                  <h2 class="text-white text-sm font-normal leading-snug">Yes, let’s see, send your work here</h2>
                </div>
                <div class="justify-start items-center inline-flex">
                  <h3 class="text-gray-500 text-xs font-normal leading-4 py-1">05:14 PM</h3>
                </div>
              </div>
              <div class="justify-center">
                <div class="grid w-fit ml-auto">
                  <div class="px-3 py-2 bg-indigo-600 rounded ">
                    <h2 class="text-white text-sm font-normal leading-snug">Anyone on for lunch today</h2>
                  </div>
                  <div class="justify-start items-center inline-flex">
                    <h3 class="text-gray-500 text-xs font-normal leading-4 py-1">You</h3>
                  </div>
                </div>
              </div>
            </div>
            <img src="https://pagedone.io/asset/uploads/1704091591.png" alt="Hailey image" class="w-10 h-11" />
          </div>

        </div>
      </div>
      <div class="w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between mt-0">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <g id="User Circle">
              <path id="icon" d="M6.05 17.6C6.05 15.3218 8.26619 13.475 11 13.475C13.7338 13.475 15.95 15.3218 15.95 17.6M13.475 8.525C13.475 9.89191 12.3669 11 11 11C9.6331 11 8.525 9.89191 8.525 8.525C8.525 7.1581 9.6331 6.05 11 6.05C12.3669 6.05 13.475 7.1581 13.475 8.525ZM19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C6.44365 19.25 2.75 15.5563 2.75 11C2.75 6.44365 6.44365 2.75 11 2.75C15.5563 2.75 19.25 6.44365 19.25 11Z" stroke="#4F46E5" stroke-width="1.6" />
            </g>
          </svg>
          <input class="grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none " placeholder="Type here..." />
        </div>
        <div class="flex items-center gap-2">
          <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <g id="Attach 01">
              <g id="Vector">
                <path d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675" stroke="#9CA3AF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675" stroke="black" stroke-opacity="0.2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675" stroke="black" stroke-opacity="0.2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </g>
            </g>
          </svg>
          <button class="items-center flex px-3 py-2 bg-indigo-600 rounded-full shadow ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g id="Send 01">
                <path id="icon" d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z" stroke="white" stroke-width="1.6" stroke-linecap="round" />
              </g>
            </svg>
            <h3 class="text-white text-xs font-semibold leading-4 px-2">Send</h3>
          </button>
        </div>
      </div>

    </>
  );
};

export default Chat;
