import { createReducer } from '@reduxjs/toolkit';
import { logout, setDecodedToken, updateToken } from '../actions';

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
    role: '',
  },
  token: '',
  islogged: false,
};

const decodedTokenReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDecodedToken, (state, action) => {
      // console.log("Payload de l'action setDecodedToken:", action.payload);
      state.decodedData = action.payload.decodedToken;
      state.token = action.payload.token;
      state.islogged = true;
      // console.log('state.decodedData:', state.decodedData);
      // console.log('state.token:', state.token);
    })
    .addCase(logout, (state) => {
      state.islogged = false;
      state.decodedData = initialState.decodedData;
      state.token = '';
    })
    .addCase(updateToken, (state, action) => {
      state.decodedData.image_url = action.payload.newImg;
    });
});

export default decodedTokenReducer;
