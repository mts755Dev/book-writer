"use client";

import { AppActions, SectionsListType } from "@/components/UI/AddSection/types";
import {
  ADD_NEW_SECTION,
  ADD_SUB_SECTION,
  DELETE_SECTION,
  EDIT_SECTION,
  USER_LOGIN,
  USER_LOGOUT,
} from "@/constants/actions";
import { createContext, Dispatch, useReducer } from "react";

function addSection(
  data: SectionsListType[],
  payload: any
): SectionsListType[] {
  const { id, parentId, name } = payload || {};
  return data.map((item: SectionsListType) => {
    if (item.id === parentId) {
      return {
        ...item,
        subSections: [...(item.subSections || []), { id, name }],
      };
    }
    if (item.subSections && item.subSections.length > 0) {
      return {
        ...item,
        subSections: addSection(item.subSections, payload),
      };
    }
    return item;
  });
}

function editSection(
  data: SectionsListType[],
  payload: any
): SectionsListType[] {
  const { id, name } = payload || {};
  return data.map((item: SectionsListType) => {
    if (item.id === id) {
      return {
        ...item,
        name,
      };
    }
    if (item.subSections && item.subSections.length > 0) {
      return {
        ...item,
        subSections: editSection(item.subSections, payload),
      };
    }
    return item;
  });
}

function deleteSection(
  data: SectionsListType[],
  payload: any
): SectionsListType[] {
  return data.filter((item: SectionsListType) => {
    if (item.id === payload.id) {
      return false;
    } else if (item?.subSections && item.subSections.length > 0) {
      item.subSections = deleteSection(item.subSections, payload);
    }
    return true;
  });
}

type AppStateType = {
  sections: SectionsListType[];
  token?: string | null;
  user?: {
    id: number;
    email: string;
    name: string;
    role?: string;
    permissions?: [];
  } | null;
};

const initialState: AppStateType = {
  sections: [],
  token: null,
  user: null,
};

const reducer = (state: any, action: AppActions) => {
  const { id, name, token, user } = action.payload || {};
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user, token };

    case USER_LOGOUT:
      return { ...state, token: null, user: null };

    case ADD_NEW_SECTION:
      return { ...state, sections: [...state.sections, { id, name }] };

    case ADD_SUB_SECTION:
      return { ...state, sections: addSection(state.sections, action.payload) };

    case EDIT_SECTION:
      return {
        ...state,
        sections: editSection(state.sections, action.payload),
      };

    case DELETE_SECTION:
      return {
        ...state,
        sections: deleteSection(state.sections, action.payload),
      };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: any;
  dispatch: Dispatch<AppActions>;
}>({ state: initialState, dispatch: () => null });

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
