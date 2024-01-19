import { useState } from "react";

export default function useSectionList() {
  const [sectionId, setSectionId] = useState<string>("");
  const [changedSection, setChangedSection] = useState<string>("");
  const [editingId, setEditingId] = useState<string>("");
  const clearSelectedId = () => {
    setSectionId("");
  };

  return {
    sectionId,
    editingId,
    changedSection,
    setChangedSection,
    setEditingId,
    setSectionId,
    clearSelectedId,
  };
}
