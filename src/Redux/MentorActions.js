export const ADD_MENTOR = 'ADD_MENTOR';
export const CLEAR_USER_STATE = 'CLEAR_USER_STATE';

export const add_mentor = user => {
  try {
    return async dispatch => {
      console.log('add_user:' + user);
      dispatch(updateUserState(user));
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};

export const clearMentorState = () => dispatch => {
  dispatch({
    type: 'CLEAR_USER_STATE',
  });
};

export const updateUserState = user => {
  return {
    type: 'ADD_MENTOR',
    payload: user,
  };
};
