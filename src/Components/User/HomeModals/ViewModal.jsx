import { Button } from "@material-tailwind/react";
import React from "react";

function ViewModal({ replies, setView }) {
  return (
    <div>
      <Button className="bg-teal-300" onClick={() => setView(false)}>
        <i className="fa fa-mail-reply"></i>
      </Button>
      <div class="flex flex-col gap-3 mt-2 h-60 overflow-y-auto">
        {!replies.length > 0 ? (
          <div className="text-center mb-6">
            <img
              className="w-56 h-56 mx-auto -mt-8"
              src="https://static.vecteezy.com/system/resources/previews/005/006/031/non_2x/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg"
              alt="No replies found"
            />{" "}
            <p className="text-xxl text-gray-500 dark:text-gray-300">
              No replies yet
            </p>
          </div>
        ) : (
          replies.map((reply) => (
            <div class="flex flex-col gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 text-gray-800 dark:text-gray-200">
              <div class="flex justify-between">
                <div class="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={reply.authorId.image}
                    alt=""
                  />
                  <span>{reply.authorId.username}</span>
                </div>
              </div>
              <div class="text-sm"> {reply.content}</div>
              <div class="flex justify-between text-xs">
                <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewModal;
