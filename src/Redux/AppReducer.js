import {SET_USER_TOKEN, SET_THEME, ADD_USERS, LOCATION, DATE} from './Constants';

const initialState = {
  userToken: null,
  theme: 'dark',
  users: [],
  location: '',
  date : ''
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case ADD_USERS:
      return {
        ...state,
        users: action.payload,
      };
      case LOCATION:
        return {
          ...state,
          location: action.payload,
        };
        case DATE:
          return {
            ...state,
            date: action.payload,
          };
    default:
      return state;
  }
};

export default AppReducer;
