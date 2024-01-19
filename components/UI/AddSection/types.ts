export type ActionTypes =
  | "USER_LOGIN"
  | "USER_LOGOUT"
  | "ADD_NEW_SECTION"
  | "ADD_SUB_SECTION"
  | "EDIT_SECTION"
  | "DELETE_SECTION";

export type SectionsListType = {
  id: string;
  name: string;
  subSections?: SectionsListType[];
};

export type SectionStateType = {
  sections: SectionsListType[];
};

export type AppActions = {
  type: ActionTypes;
  payload?: any;
};
