import { createAction } from '@reduxjs/toolkit';
const LOGOUT = 'LOGOUT';

export const logout = createAction(LOGOUT);

const SET_DECODED_TOKEN = 'SET_DECODED_TOKEN';

export const setDecodedToken = createAction(
  SET_DECODED_TOKEN,
  (token, decodedToken) => ({
    payload: { token, decodedToken },
  })
);

const UPDATE_TOKEN = 'UPDATE_TOKEN';

export const updateToken = createAction(UPDATE_TOKEN, (newImg) => ({
  payload: { newImg },
}));
