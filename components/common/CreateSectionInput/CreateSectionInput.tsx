import { useState } from "react";
import { CreateSectionInputProps } from "./types";

const CreateSectionInput = ({
  actionType,
  sectionId,
  onClearHandler,
  addSectionHandler,
}: CreateSectionInputProps) => {
  const [sectionName, setSectionName] = useState("");
  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={sectionName}
        placeholder="Add a section"
        className="p-2 text-black outline-none w-[400px]"
        onChange={(e) => setSectionName(e.target.value)}
        autoFocus={true}
      />
      <button
        type="button"
        onClick={() => {
          setSectionName("");
          addSectionHandler(actionType, sectionName, sectionId);
          onClearHandler?.();
        }}
        className="p-2 bg-[#4179B8]"
        disabled={!sectionName}
      >
        Add
      </button>
    </div>
  );
};

export default CreateSectionInput;
