import React from 'react';

function MessageList() {
  return (
    <>
      <div className=" flex-1 overflow-hidden flex h-full w-500px float-left">
        <div className=" w-5/5 flex-2 flex-col pr-6">
          <div className="search flex-2 pb-6 px-2">
              <div class='mt-6 max-w-md mx-auto'>
                <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                  <div class="grid place-items-center h-full w-12 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <input
                    class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search something.." />
                </div>
              </div></div>         

          <div className="flex-1 h-full overflow-y-scroll px-2">
            <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
              <div className="flex-2">
                <div className="w-12 h-12 relative">
                  <img className="w-12 h-12 rounded-full mx-auto" src="https://randomuser.me/api/portraits/women/44.jpg" alt="chat-user" />
                  <span className="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                </div>
              </div>
              <div className="flex-1 px-2">
                <div className="truncate w-32"><span className="text-gray-800">Ryann Remo</span></div>
                <div><small className="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div className="flex-2 text-right">
                <div><small className="text-gray-500">15 April</small></div>
                <div>
                  <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                    23
                  </small>
                </div>
              </div>
            </div>
            <div class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img class="w-12 h-12 rounded-full mx-auto" src="https://randomuser.me/api/portraits/men/32.jpg" alt="chat-user" />
                  <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div class="truncate w-32"><span class="text-gray-800">Karp Bonolo</span></div>
                <div><small class="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div class="flex-2 text-right">
                <div><small class="text-gray-500">15 April</small></div>
                <div>
                  <small class="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                    10
                  </small>
                </div>
              </div>
            </div>
            <div class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md border-l-4 border-red-500">
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img class="w-12 h-12 rounded-full mx-auto" src="https://randomuser.me/api/portraits/women/63.jpg" alt="chat-user" />
                  <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div class="truncate w-32"><span class="text-gray-800">Mercedes Yemelyan</span></div>
                <div><small class="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div class="flex-2 text-right">
                <div><small class="text-gray-500">15 April</small></div>
              </div>
            </div>
            <div class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img class="w-12 h-12 rounded-full mx-auto" src="https://randomuser.me/api/portraits/men/46.jpg" alt="chat-user" />
                  <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div class="truncate w-32"><span class="text-gray-800">Cadi Kajetán</span></div>
                <div><small class="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div class="flex-2 text-right">
                <div><small class="text-gray-500">15 April</small></div>
              </div>
            </div>
            <div class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img class="w-12 h-12 rounded-full mx-auto" src="https://randomuser.me/api/portraits/men/47.jpg" alt="chat-user" />
                  <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div class="truncate w-32"><span class="text-gray-800">Rina Samuel</span></div>
                <div><small class="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div class="flex-2 text-right">
                <div><small class="text-gray-500">15 April</small></div>
              </div>
            </div>
            <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
              <div className="flex-2">
                <div className="w-12 h-12 relative">
                  <img className="w-12 h-12 rounded-full mx-auto" src="https://randomuser.me/api/portraits/women/44.jpg" alt="chat-user" />
                  <span className="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                </div>
              </div>
              <div className="flex-1 px-2">
                <div className="truncate w-32"><span className="text-gray-800">Ryann Remo</span></div>
                <div><small className="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div className="flex-2 text-right">
                <div><small className="text-gray-500">15 April</small></div>
                <div>
                  <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                    23
                  </small>
                </div>
              </div>
            </div>
            <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
              <div className="flex-2">
                <div className="w-12 h-12 relative">
                  <img className="w-12 h-12 rounded-full mx-auto" src="https://randomuser.me/api/portraits/women/44.jpg" alt="chat-user" />
                  <span className="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                </div>
              </div>
              <div className="flex-1 px-2">
                <div className="truncate w-32"><span className="text-gray-800">Ryann Remo</span></div>
                <div><small className="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div className="flex-2 text-right">
                <div><small className="text-gray-500">15 April</small></div>
                <div>
                  <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                    23
                  </small>
                </div>
              </div>
            </div>
            <div class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img class="w-12 h-12 rounded-full mx-auto" src="https://randomuser.me/api/portraits/men/46.jpg" alt="chat-user" />
                  <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div class="truncate w-32"><span class="text-gray-800">Cadi Kajetán</span></div>
                <div><small class="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div class="flex-2 text-right">
                <div><small class="text-gray-500">15 April</small></div>
              </div>
            </div>
            <div class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img class="w-12 h-12 rounded-full mx-auto" src="https://randomuser.me/api/portraits/men/46.jpg" alt="chat-user" />
                  <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div class="truncate w-32"><span class="text-gray-800">Cadi Kajetán</span></div>
                <div><small class="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div class="flex-2 text-right">
                <div><small class="text-gray-500">15 April</small></div>
              </div>
            </div>
            {/* More entries */}
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageList;
