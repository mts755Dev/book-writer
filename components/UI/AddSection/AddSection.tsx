"use client";

import CreateSectionInput from "@/components/common/CreateSectionInput/CreateSectionInput";
import SectionList from "../SectionList/SectionList";
import useAddSectionHook from "./useAddSection";

const AddSection = () => {
  const {
    sections,
    userDetail,
    addNewSectionHandler,
    editSectionHandler,
    deleteSectionHandler,
  } = useAddSectionHook();

  return (
    <>
      {(userDetail?.role === "author" ||
        userDetail?.permissions?.includes("add")) && (
        <CreateSectionInput
          actionType="ADD_NEW_SECTION"
          addSectionHandler={addNewSectionHandler}
        />
      )}
      <div className="m-5">
        <SectionList
          userDetail={userDetail}
          sections={sections}
          deleteSectionHandler={deleteSectionHandler}
          addSectionHandler={addNewSectionHandler}
          editSectionHandler={editSectionHandler}
        />
      </div>
    </>
  );
};

export default AddSection;
