export const ADD_USER='ADD_USER';
export const UPDATE_IMAGE='UPDATE_IMAGE';
export const UPDATE_USER_DATA='UPDATE_USER_DATA';
export const CLEAR_USER_STATE='CLEAR_USER_STATE';
export const add_user=(user)=>{
    try{
        return async dispatch=>{
            console.log("add_user:"+user);
            dispatch(updateUserState(user));
        }

    }catch(e){
        dispatch({
            type:Error,
            error:"error"
        })
    }
}
export const clearUserState=()=>dispatch=>{
    dispatch({
        type:'CLEAR_USER_STATE'
    })
}
export const updateUserData=(data)=>{
    try{
        return async dispatch=>{
            //console.log(img);
            dispatch(update_data(data));
        }
    }catch(e){
        dispatch({
            type:'Error',
            error:"error"
        })
    } 
}
export const update_data=(data)=>{
    console.log("data: "+data.name)
    return ({
        type:'UPDATE_USER_DATA',
        payload:data
    })
}
export const updateImage=(img)=>{
    try{
        return async dispatch=>{
            //console.log(img);
            dispatch(Imageupload(img))
        }
    }catch(e){
        dispatch({
            type:'Error',
            error:"error"
        })
    }
}

export const Imageupload=(img)=>{
    return ({
        type:"UPDATE_IMAGE",
        payload:img
    })
}

export const updateUserState=(user)=>{
    return ({
        type:'ADD_USER',
        payload:user
    })
}