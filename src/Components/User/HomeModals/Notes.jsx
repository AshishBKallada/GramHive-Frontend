import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useToast } from "@chakra-ui/react";
import { addNote, deleteNote, getNote } from "../../../services/services";
import ViewModal from "./ViewModal";

export function Notes({ showNoteModal, setShowNoteModal }) {
  const [note, setNote] = useState("");
  const [currNote, setCurrNote] = useState(null);
  const [error, setError] = useState(null);
  const [view, setView] = useState(false);

  const toast = useToast();

  const handleOpen = () => setShowNoteModal((prev) => !prev);

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    const response = await getNote();
    console.log("CURR NOTE", response.data);
    setCurrNote(response.data);
  };
  const handleChange = (event) => {
    setNote(event.target.value);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!note.trim()) {
      setError("Please enter a note.");
      return;
    }
    const response = await addNote(note);
    if (response.data.success) {
      handleOpen();
      toast({
        title: "New Note added !",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error while adding note !",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteNote = async () => {
    const response = await deleteNote();
    if (response.data) {
      handleOpen();
      toast({
        title: " Note deleted !",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      handleOpen();
      toast({
        title: "Failed to  delete note !",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Dialog open={showNoteModal} handler={handleOpen}>
        <DialogHeader>
          {currNote ? (view ? "Replies" : "My Note") : "Notes"}
        </DialogHeader>
        <DialogBody>
          {view ? (
            <ViewModal replies={currNote?.replies} setView={setView} />
          ) : !currNote ? (
            <div className="mb-10 -mt-7">
              <Typography color="gray" variant="lead">
                Add a note, will delete after 24 hrs!
              </Typography>
              <Textarea
                label="Add Note"
                value={note}
                onChange={handleChange}
                error={!!error}
                helperText={error}
                className="mr-10"
              />
              {note.length > 50 && (
                <p className="error-text">
                  Note exceeds character limit (250).
                </p>
              )}
            </div>
          ) : (
            <div class="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
              <div>
                <h3 class="text-gray-800 dark:text-gray-100 leading-7 font-semibold w-11/12">
                  {currNote?.note}
                </h3>
              </div>
              <div>
                <div class="mb-3 flex items-center flex-no-wrap">
                  <p className="dark:text-gray-100 text-sm  text-gray-800 mr-2">
                    Reactions :
                  </p>
                  {currNote?.replies?.map((reply) => (
                    <div class="w-6 h-6 bg-cover bg-center rounded-md">
                      <img
                        src={reply.authorId.image}
                        alt="read by Alia"
                        class="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white dark:border-gray-700 shadow"
                      />
                    </div>
                  ))}
                  <Button
                    onClick={() => setView(true)}
                    className="ml-2 bg-teal-300"
                  >
                    View
                  </Button>
                </div>
                <div class="flex items-center justify-between text-gray-800">
                  <p class="dark:text-gray-100 text-sm">
                    Added on : {new Date(currNote?.createdAt).toLocaleString()}
                  </p>
                  <button
                    onClick={handleDeleteNote}
                    class="w-8 h-8 rounded-full dark:bg-gray-100 dark:text-gray-800 bg-red-500 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:animate-pulse"
                    aria-label="delete note"
                    role="button"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogBody>
        {!currNote && (
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="teal" onClick={handleSubmit}>
              <span>Add Note</span>
            </Button>
          </DialogFooter>
        )}
      </Dialog>
    </>
  );
}
