const initialState = {
  organizer: [],
};

const organizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORGANIZER':
      return {
        ...state,
        organizer: action.payload,
      };
    default:
      return state;
  }
};

export default organizerReducer;
