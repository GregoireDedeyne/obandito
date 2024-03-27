import { createAction } from '@reduxjs/toolkit';
import dataEvents from '../../data/dataEvents.json';
import dataBands from '../../data/dataBands.json';

const GET_EVENTS = 'GET_EVENTS';
const GET_BANDS = 'GET_BANDS';

export const getEvents = createAction(GET_EVENTS, () => ({
  payload: dataEvents,
}));

export const getBands = createAction(GET_BANDS, () => ({
  payload: dataBands,
}));

// export const SET_DECODED_TOKEN = 'SET_DECODED_TOKEN';
// export const setDecodedToken = createAction(SET_DECODED_TOKEN);

export const SET_DECODED_TOKEN = 'SET_DECODED_TOKEN';
export const setDecodedToken = createAction(
  SET_DECODED_TOKEN,
  (token, decodedToken) => ({
    payload: { token, decodedToken },
  })
);
