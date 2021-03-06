import {Rooms} from '../scenes/Room';
import {
  ADD_USER,
  UPDATE_IMAGE,
  UPDATE_USER_DATA,
  CLEAR_USER_STATE,
  LOAD_ROOM_DATA,
  ALL_LOADED,
  REFRESH_ROOMS_LIST,
  PIN_POST,
  LIKE_POST,
  POST_COMMENT,
  DELETE_POST,
  DELETE_POST_ACTION,
  SET_USER,
  SET_MENTORS,
  SELECT_MENTOR,
} from './actions';

const initialState = {
  user: {},
  availability: [],
  saved: [],
  allLoaded: false,
  loading: true,
  pageNumber: 1,
  lastDocument: undefined,
  news: [],
  articles: [],
  mentors: [],
  selectedmentor: {},
  notification: [],
  savedPosts: [],
  Rooms: [],
  refreshing: false,
  pin_post: {},
};

function UserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      console.log('I am setuser');
      return {
        ...state,
        user: action.payload,
        lastDocument: undefined,
        refreshing: false,
        Rooms: [],
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload,
        lastDocument: undefined,
        refreshing: false,
      };
    case LIKE_POST:
      var list = [];
      //console.log("yoyoy")
      var index = state.Rooms.indexOf(action.payload.post);
      if (action.payload.post.likes.includes(state.user.email)) {
        list = action.payload.post.likes.filter(
          like => like != state.user.email,
        );
      } else {
        list = [...action.payload.post.likes, state.user.email];
      }
      var TempRooms = state.Rooms;
      //console.log(TempRooms)
      if (index == -1) {
        console.log('Post has been removed');
      } else {
        TempRooms[index].likes = list;
      }
      return {
        ...state,
        Rooms: [...TempRooms],
      };
    case POST_COMMENT:
      var list = action.payload.post.comments;
      //list = action.payload.post.comments.filter(comment => comment.commentid != action.payload.commentBody.commentid);
      list.push(action.payload.commentbody);
      var idx;
      for (const post of state.Rooms) {
        if (post.id == action.payload.postId) {
          idx = state.Rooms.indexOf(post);
          console.log('yes found index');
          break;
        }
      }
      //var idx=state.Rooms.indexOf();
      var tempRooms = state.Rooms;
      tempRooms[idx].comments = list;
      //pin_post
      //console.log("Comment check:"+list)
      return {
        ...state,
        Rooms: [...tempRooms],
        pin_post: {
          ...state.pin_post,
          comments: [...list],
        },
      };
    case UPDATE_IMAGE:
      return {
        ...state,
        user: {...state.user, image: action.payload},
      };
    case UPDATE_USER_DATA:
      console.log(action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          experience: action.payload.experience,
          skills: action.payload.skills,
          about: action.payload.about,
          industry: action.payload.industry,
          education: action.payload.education,
        },
      };
    case SET_MENTORS:
      return {
        ...state,
        mentors: action.payload,
      };
    case SELECT_MENTOR:
      return {
        ...state,
        selectedmentor: action.payload,
      };
    case CLEAR_USER_STATE:
      return {
        ...state,
        user: {},
      };
    case LOAD_ROOM_DATA:
      //console.log("dispatch obj:"+action.payload.lastdoc)
      const newposts = [];
      action.payload.list3.map((item, index) => {
        if (state.Rooms.indexOf(item) == -1) {
          newposts.push(item);
        } else {
          console.log('yes found');
        }
      });
      console.log(newposts.length);
      return {
        ...state,
        lastDocument: action.payload.lastdoc,
        Rooms: [...state.Rooms, ...newposts],
        allLoaded: true,
      };
    case REFRESH_ROOMS_LIST:
      return {
        ...state,
        refreshing: false,
        allLoaded: true,
        lastDocument: action.payload.lastdoc,
        Rooms: [...action.payload.list3],
        //Rooms:[]
      };
    case ALL_LOADED:
      //console.log("I am all loaded")
      return {
        ...state,
        allLoaded: action.payload,
        Rooms: [],
        lastDocument: undefined,
      };
    case PIN_POST: {
      return {
        ...state,
        pin_post: action.payload,
      };
    }
    case DELETE_POST:
      console.log('delete');
      var list = [];
      console.log(action.payload);
      var idx = state.Rooms.indexOf(action.payload);
      list = state.Rooms.filter(item => item.id != action.payload.id);
      console.log(idx);
      return {
        ...state,
        Rooms: [...list],
      };
    case DELETE_POST_ACTION:
      var list = [];
      state.Rooms.map(item => {
        if (item.id == action.payload.postId) {
          item.comments.map(comment => {
            if (comment.commentid != action.payload.commentId) {
              list.push(comment);
            }
          });
          item.comments = list;
        }
      });
      console.log('res:' + list);
      return {
        ...state,
        pin_post: {
          ...state.pin_post,
          comments: [],
        },
      };
    default:
      return state;
  }
}

export default UserReducer;
