import { createReducer } from '@reduxjs/toolkit';
import { setDecodedToken } from '../actions';

const initialState = {
  decodedData: {
    id: null,
    mail: '',
    name: '',
    image_url: '',
    address: '',
    city: '',
    region: '',
    zip_code: '',
    description: '',
  },
  token: '',
};

const decodedTokenReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDecodedToken, (state, action) => {
    console.log("Payload de l'action setDecodedToken:", action.payload);
    state.decodedData = action.payload.decodedToken;
    state.token = action.payload.token;
    console.log('state.decodedData:', state.decodedData);
    console.log('state.token:', state.token);
  });
});

export default decodedTokenReducer;
