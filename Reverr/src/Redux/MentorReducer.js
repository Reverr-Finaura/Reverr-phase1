import {ADD_MENTOR, CLEAR_USER_STATE} from './MentorActions';
const initialState = {
  user: {},
  availability: [],
  saved: [],
  allLoaded: false,
  loading: true,
  pageNumber: 1,
  news: [],
  articles: [],
  notification: [],
  savedPosts: [],
};

function MentorReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MENTOR:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER_STATE:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
}

export default MentorReducer;
