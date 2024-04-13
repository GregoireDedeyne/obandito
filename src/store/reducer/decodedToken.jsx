import { createReducer } from '@reduxjs/toolkit';
import {
  logout,
  setDecodedToken,
  setSelectedTab,
  updateToken,
} from '../actions';

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
  selectedTab: 0,
};

const decodedTokenReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDecodedToken, (state, action) => {
      state.decodedData = action.payload.decodedToken;
      state.token = action.payload.token;
      state.islogged = true;
    })
    .addCase(logout, (state) => {
      state.islogged = false;
      state.decodedData = initialState.decodedData;
      state.token = '';
    })

    .addCase(setSelectedTab, (state, action) => {
      state.selectedTab = action.payload;
    })
    .addCase(updateToken, (state, action) => {
      state.decodedData.image_url = action.payload.newImg;
    });
});

export default decodedTokenReducer;
