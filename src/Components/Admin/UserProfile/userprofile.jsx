import React from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";

function UserProfile({ user, setSelectedUser }) {
  const handleOpen = () => {
    setSelectedUser(null);
  };
  return (
    <Dialog
      className=" bg-gray-900 border borer-white"
      open={true}
      handler={handleOpen}
    >
      <DialogBody>
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center ml-4">
              <div className="relative">
                <img src={user.image} alt="" className="rounded-full" />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              <div className="py-6 px-3 mt-32 sm:mt-0">
                <button
                  className="bg-orange-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Warn
                </button>
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-1">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
                    463
                  </span>
                  <span className="text-sm text-gray-300">Followers</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
                    462
                  </span>
                  <span className="text-sm text-gray-300">Following</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
                    8
                  </span>
                  <span className="text-sm text-gray-300">Posts</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-400 mb-2">
              {user.name}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-300 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-300"></i>
              Los Angeles, California
            </div>
            <div className="mb-2 text-gray-300 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-gray-300"></i>
              Solution Manager - Creative Tim Officer
            </div>
            <div className="mb-2 text-gray-300">
              <i className="fas fa-university mr-2 text-lg text-gray-300"></i>
              {user?.website}
            </div>
          </div>
          <div className=" py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  {user?.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default UserProfile;
