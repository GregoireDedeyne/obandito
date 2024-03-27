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
};

const decodedTokenReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDecodedToken, (state, action) => {
    console.log("Payload de l'action:", action.payload);
    state.decodedData = action.payload;
    console.log('state.decodedData:', state.decodedData);
  });
});

export default decodedTokenReducer;
