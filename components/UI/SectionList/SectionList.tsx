"use client";

import CreateSectionInput from "@/components/common/CreateSectionInput/CreateSectionInput";
import useSectionList from "./useSectionList";
import { SectionsListType } from "../AddSection/types";
import { SectionListTypes } from "./types";

const SectionList = ({
  userDetail,
  sections,
  addSectionHandler,
  deleteSectionHandler,
  editSectionHandler,
}: SectionListTypes) => {
  const {
    sectionId,
    editingId,
    setEditingId,
    changedSection,
    setChangedSection,
    setSectionId,
    clearSelectedId,
  } = useSectionList();

  return (
    <>
      {sections?.map((section: SectionsListType, idx: number) => (
        <>
          <div key={section.id}>
            <div className="flex items-center justify-between">
              {editingId === section.id ? (
                <div className="flex items-center gap-5 m-2 ml-6">
                  <input
                    type="text"
                    value={changedSection}
                    placeholder="Add a section"
                    className="p-2 text-black outline-none w-[400px]"
                    onChange={(e) => setChangedSection(e.target.value)}
                    autoFocus={true}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      editSectionHandler(changedSection, editingId);
                      setEditingId("");
                    }}
                    className="p-2 bg-[#2DBB4A]"
                    disabled={!changedSection}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-black">
                    {idx + 1}. {section.name}
                  </p>
                  <div className="flex items-center gap-5 m-2 ml-6">
                    {(userDetail?.role === "author" ||
                      userDetail?.permissions?.includes("edit")) && (
                      <button
                        type="button"
                        className="p-2 bg-[#4179B8]"
                        onClick={() => {
                          setChangedSection(section.name);
                          setEditingId(section.id);
                        }}
                      >
                        Edit
                      </button>
                    )}

                    {(userDetail?.role === "author" ||
                      userDetail?.permissions?.includes("delete")) && (
                      <button
                        type="button"
                        className="p-2 bg-[black]"
                        onClick={() => deleteSectionHandler(section.id)}
                      >
                        Delete
                      </button>
                    )}

                    {(userDetail?.role === "author" ||
                      userDetail?.permissions?.includes("add")) && (
                      <button
                        type="button"
                        className="p-2 bg-[#4179B8]"
                        onClick={() => setSectionId(section.id)}
                      >
                        Add Sub Section
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
            {sectionId === section.id && (
              <div className="ml-10">
                <CreateSectionInput
                  onClearHandler={clearSelectedId}
                  actionType="ADD_SUB_SECTION"
                  sectionId={section.id}
                  addSectionHandler={addSectionHandler}
                />
              </div>
            )}
          </div>
          {section?.subSections && section?.subSections?.length > 0 && (
            <div className="ml-10">
              <SectionList
                userDetail={userDetail}
                sections={section.subSections}
                deleteSectionHandler={deleteSectionHandler}
                addSectionHandler={addSectionHandler}
                editSectionHandler={editSectionHandler}
              />
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default SectionList;
