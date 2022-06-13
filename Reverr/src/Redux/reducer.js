import { ADD_USER,UPDATE_IMAGE,UPDATE_USER_DATA,CLEAR_USER_STATE} from "./actions";
const initialState={
    user:{},
    availability:[],
    saved:[],
    allLoaded:false,
    loading:true,
    pageNumber:1,
    news:[],
    articles:[],
    mentors:[],
    notification:[]
}

function UserReducer(state=initialState,action){
    console.log("hello")
    switch(action.type){
        case ADD_USER:
            return {
                ...state,
                user:action.payload
            }
        case UPDATE_IMAGE:
            return {
                ...state,
                user:{...state.user,image:action.payload}
            }
        case UPDATE_USER_DATA:
            console.log(action.payload);
            return {
                ...state,
                user:{...state.user,name:action.payload.name,experience:action.payload.experience,skills:action.payload.skills,about:action.payload.about,industry:action.payload.industry,education:action.payload.education}
            }
        case CLEAR_USER_STATE:
            return {
                ...state,
                user:{}
            }
        default:
            return state;
    }
}

export default UserReducer;