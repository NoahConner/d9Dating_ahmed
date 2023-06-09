import {
  SET_USER_TOKEN,
  SET_THEME,
  ADD_USERS,
  LOCATION,
  DATE,
  SET_USER_DATA,
  SET_ORGANIZATION,
  POST_LOCATION,
  SET_STORIES,
  SET_EXIST,
  SET_STORYID,
  SET_STORY_COLOR,
  SET_FTOKEN,
  ADD_SOCKET_USERS,
  USERLOC,
} from './Constants';

const initialState = {
  userToken: null,
  fToken: null,
  theme: 'dark',
  users: [],
  socketUsers: [],
  location: '',
  userLoc: '',
  date: '',
  userData: {},
  userPassword: '',
  organization: [],
  postLocation: '',
  stories: [],
  exist: '',
  storyID: '',
  storyColor: 'green',
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case SET_FTOKEN:
      return {
        ...state,
        fToken: action.payload,
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
    case ADD_SOCKET_USERS:
      return {
        ...state,
        socketUsers: action.payload,
      };
    case LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case USERLOC:
      return {
        ...state,
        userLoc: action.payload,
      };
    case DATE:
      return {
        ...state,
        date: action.payload,
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case SET_ORGANIZATION:
      return {
        ...state,
        organization: action.payload,
      };
    case POST_LOCATION:
      return {
        ...state,
        postLocation: action.payload,
      };
    case SET_STORIES:
      return {
        ...state,
        stories: action.payload,
      };
    case SET_EXIST:
      return {
        ...state,
        exist: action.payload,
      };
    case SET_STORYID:
      return {
        ...state,
        storyID: action.payload,
      };
    case SET_STORY_COLOR:
      return {
        ...state,
        storyColor: action.payload,
      };

    default:
      return state;
  }
};

export default AppReducer;
