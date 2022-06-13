import { ADD_MENTOR,CLEAR_USER_STATE } from "./MentorActions";
const initialState={
    mentor:{},
    availability:[],
    saved:[],
    allLoaded:false,
    loading:true,
    pageNumber:1,
    news:[],
    articles:[],
    notification:[]
}

function MentorReducer(state=initialState,action){
    console.log("hello")
    switch(action.type){
        case ADD_MENTOR:
            return{
                ...state,
                mentor:action.payload
            }
        case CLEAR_USER_STATE:
            return {
                ...state,
                mentor:{}
            }
        default:
            return state;
    }
}

export default MentorReducer;