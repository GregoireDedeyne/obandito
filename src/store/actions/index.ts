import { createAction } from '@reduxjs/toolkit';
const LOGOUT = 'LOGOUT';
export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';

export const logout = createAction(LOGOUT);

export const SET_DECODED_TOKEN = 'SET_DECODED_TOKEN';
export const setDecodedToken = createAction(
  SET_DECODED_TOKEN,
  (token, decodedToken) => ({
    payload: { token, decodedToken },
  })
);

export const setSelectedTab = createAction(SET_SELECTED_TAB, (selectedTab) => ({
  payload: selectedTab,
}));
