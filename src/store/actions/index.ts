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
