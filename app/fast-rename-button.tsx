"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineBedroomChild, MdOutlineDining } from "react-icons/md";
import { FaCouch, FaKitchenSet } from "react-icons/fa6";
import Image from "next/image";

const preselectedNames = [
  "Attic",
  "Bathroom",
  "Backroom",
  "Bedroom",
  "Breakfast Nook",
  "Dining Room",
  "Garage",
  "Kitchen",
  "Living Room",
  "Study",
  "Studio",
];

const FastRenameButton = ({ images }: { images: any[] }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [nameInput, setNameInput] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Automatically focus the input when the modal is opened or we move to the next image
  useEffect(() => {
    const focusInput = () => {
      if (modalOpen && inputRef.current) {
        inputRef.current.focus();
      }
    };
    focusInput();
  }, [modalOpen, currentImageIndex]);

  // Reset and close the modal
  const closeModal = () => {
    setNameInput("");
    setModalOpen(false);
    setCurrentImageIndex(0);
  };

  // Move to the next image, whether because the name was changed or the image was skipped
  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setNameInput("");
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      closeModal();
    }
  };

  // Change image name based on whatever name we pass in
  const changeImageName = (name: string) => {
    images[currentImageIndex].title = name;
    nextImage();
  };

  return (
    <>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className="text-white bg-teal-400 hover:bg-teal-300 rounded-md py-2 px-4"
      >
        Fast Rename
      </button>
      {modalOpen && (
        <div className="fixed inset-0 h-screen w-screen bg-black/25 flex items-center justify-center">
          <div className="bg-white max-w-lg rounded-lg p-4 text-gray-500">
            <h3 className="float-left text-xl font-semibold">{`Image ${
              currentImageIndex + 1
            } of ${images.length} - ${images[currentImageIndex].title}`}</h3>
            <button
              className="float-right rounded-full p-2 mb-2 hover:bg-gray-200"
              onClick={closeModal}
            >
              <AiOutlineClose />
            </button>

            <Image
              className="rounded-md mb-4"
              height={450}
              width={800}
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].title}
            />

            <div className="grid grid-cols-5 gap-2 mb-4">
              <button
                onClick={() => changeImageName("Kitchen")}
                className="hover:bg-teal-400 hover:text-white rounded-md border border-gray-200 p-2 gap-1 flex flex-col items-center justify-center"
              >
                <FaKitchenSet size={22} />
                <p className="text-xs">Kitchen</p>
              </button>
              <button
                onClick={() => changeImageName("Bathroom")}
                className="hover:bg-teal-400 hover:text-white rounded-md border border-gray-200 p-2 gap-1 flex flex-col items-center justify-center"
              >
                <FaKitchenSet size={22} />
                <p className="text-xs">Bathroom</p>
              </button>
              <button
                onClick={() => changeImageName("Living Room")}
                className="hover:bg-teal-400 hover:text-white rounded-md border border-gray-200 p-2 gap-1 flex flex-col items-center justify-center"
              >
                <FaCouch size={22} />
                <p className="text-xs">Living Room</p>
              </button>
              <button
                onClick={() => changeImageName("Bedroom")}
                className="hover:bg-teal-400 hover:text-white rounded-md border border-gray-200 p-2 gap-1 flex flex-col items-center justify-center"
              >
                <MdOutlineBedroomChild size={22} />
                <p className="text-xs">Bedroom</p>
              </button>
              <button
                onClick={() => changeImageName("Dining Room")}
                className="hover:bg-teal-400 hover:text-white rounded-md border border-gray-200 p-2 gap-1 flex flex-col items-center justify-center"
              >
                <MdOutlineDining size={22} />
                <p className="text-xs">Dining Room</p>
              </button>
            </div>

            <input
              placeholder="New image name"
              className="p-2 w-full outline-teal-600"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  changeImageName(nameInput);
                }
              }}
              ref={inputRef}
            />

            <div className="flex flex-col my-4 divide-y divide-gray-200 h-40 overflow-y-auto">
              {preselectedNames.map((name) => {
                return name
                  .toLowerCase()
                  .startsWith(nameInput.toLowerCase()) ? (
                  <button
                    key={name}
                    onClick={() => {
                      changeImageName(name);
                    }}
                    className="hover:bg-teal-400 hover:text-white text-left pl-2 py-1"
                  >
                    {name}
                  </button>
                ) : null;
              })}
            </div>

            <button
              onClick={nextImage}
              className="text-white bg-teal-400 hover:bg-teal-300 rounded-md py-2 px-4 float-right"
            >
              Skip
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FastRenameButton;
