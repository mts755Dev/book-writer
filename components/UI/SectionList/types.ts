import { ActionTypes, SectionsListType } from "../AddSection/types";

export type SectionListTypes = {
  userDetail: { role: string; permissions?: string[] };
  sections: SectionsListType[];
  addSectionHandler(
    actionType: ActionTypes,
    value: string,
    parentSectionId?: string
  ): void;
  deleteSectionHandler(id: string): void;
  editSectionHandler(value: string, id: string): void;
};
