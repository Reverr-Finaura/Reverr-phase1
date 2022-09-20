import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';
// import { SavedCourses } from '../Components/SavedCourses';
export const ADD_USER = 'ADD_USER';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const Passed_User = 'Passed_User';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const CLEAR_USER_STATE = 'CLEAR_USER_STATE';
export const LOAD_ROOM_DATA = 'LOAD_ROOM_DATA';
export const ALL_LOADED = 'ALL_LOADED';
export const REFRESH_ROOMS_LIST = 'REFRESH_ROOMS_LIST';
export const LIKE_POST = 'LIKE_POST';
export const POST_COMMENT = 'POST_COMMENT';
export const PIN_POST = 'PIN_POST';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_ACTION = 'DELETE_POST_ACTION';
export const SET_USER = 'SET_USER';
export const SET_MENTORS = 'SET_MENTORS';
export const SELECT_MENTOR = 'SELECT_MENTOR';
export const LIKE_MENTOR = 'LIKE_MENTOR';
export const UNLIKE_MENTOR = 'UNLIKE_MENTOR';
export const Matched_People = 'Matched_People';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';
export const SAVE_ARTICLE = 'SAVE_ARTICLE';
export const REMOVE_COURSE = 'REMOVE_COURSE';
export const SAVE_COURSE = 'SAVE_COURSE';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const REMOVE_NOTIFICATION_INSTANCE = 'REMOVE_NOTIFICATION_INSTANCE';
export const UPDATE_APPOINTMENT_INSTANCE = 'UPDATE_APPOINTMENT_INSTANCE';
export const LOAD_CARDS = 'LOAD_CARDS';
export const REMOVE_TOP_CARD = 'REMOVE_TOP_CARD';
export const RemoveTopCard = () => {
  try {
    return async dispatch => {
      dispatch({
        type: 'REMOVE_TOP_CARD',
      });
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};
export const Load_Card = (
  lastDocument,
  email,
  na,
  passedEmails,
  matchedpeople,
) => {
  try {
    if (passedEmails.length == 0 || matchedpeople.length == 0) {
      passedEmails.push(email), matchedpeople.push(email);
    }

    //var lastcard=undefined;
    return async dispatch => {
      var list4 = [];
      //  await firestore().collection('Users').orderBy('createdAt', 'desc');
      // filtering data by email here
      let query = await firestore()
        .collection('Users')
        .orderBy('email')
        .where('email', 'not-in', [...passedEmails, ...matchedpeople]);
      if (lastDocument !== undefined) {
        query = query.startAfter(lastDocument);
        console.log('last->' + lastDocument.name);
      }
      // if (lastcard !== undefined) {
      //   query = query.startAfter(lastDocument);
      //   console.log("last->"+lastDocument.name);
      // }
      await query
        .limit(15)
        .get()
        // .onSna
        .then(async querySnapshot => {
          var lastdoc = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(doc => {
            let card = doc.data();
            card.id = doc.id;
            // console.log("what is card ",card)
            if (card) {
              list4.push(card);
            }

            //console.log(list3);
          });
          // console.log("list4",list4)
          // console.log("list 4 is",list4)
          dispatch({
            type: 'LOAD_CARDS',
            payload: {list4, lastDocument: lastdoc},
          });


       
          await firestore()
            .collection('Users')
            .doc(email)
            .update({
              no_of_swipe: na + 5,
            });
          // console.log("Card has benn called")
        })
        .catch(e => {
          console.log(e.message);
          throw new Error('Error at vibe');
        });
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};

export const RemoveNotificationInstance = index => {
  try {
    return async dispatch => {
      dispatch({
        type: 'REMOVE_NOTIFICATION_INSTANCE',
        payload: index,
      });
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};

export const UpdateApointmentInstance = index => {
  try {
    return async dispatch => {
      dispatch({
        type: 'UPDATE_APPOINTMENT_INSTANCE',
        payload: index,
      });
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};

export const RemoveNotification = (email, obj, index) => {
  try {
    return async dispatch => {
      await firestore()
        .collection('Users')
        .doc(email)
        .update({
          notifications: firestore.FieldValue.arrayRemove(obj),
        });
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        payload: index,
      });
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};

export const removeCourse = id => {
  try {
    return async dispatch => {
      dispatch({
        type: 'REMOVE_COURSE',
        payload: id,
      });
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};

export const saveCourse = id => {
  try {
    return async dispatch => {
      dispatch({
        type: 'SAVE_COURSE',
        payload: id,
      });
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};

export const SaveArticle = id => {
  try {
    return async dispatch => {
      dispatch({
        type: 'SAVE_ARTICLE',
        payload: id,
      });
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};

export const RemoveArticle = id => {
  try {
    return async dispatch => {
      dispatch({
        type: 'REMOVE_ARTICLE',
        payload: id,
      });
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};

export const LikeMentor = email => {
  try {
    return async dispatch => {
      dispatch({
        type: 'LIKE_MENTOR',
        payload: email,
      });
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};

export const UnLikeMentor = email => {
  try {
    return async dispatch => {
      dispatch({
        type: 'UNLIKE_MENTOR',
        payload: email,
      });
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};

export const add_user = user => {
  try {
    return async dispatch => {
      console.log('add_user:' + user);
      var udata = [];
      var basket;
      if (user.userType == 'Mentor') {
        for (var i = 0; i < user?.clients?.length; i++) {
          basket = await firestore()
            .collection('Users')
            .doc(user?.clients[i])
            .get();
          udata.push(basket.data());
        }
      } else {
        for (var i = 0; i < user?.mentors?.length; i++) {
          basket = await firestore()
            .collection('Users')
            .doc(user?.mentors[i])
            .get();
          udata.push(basket.data());
        }
      }
      dispatch(updateUserState(user, udata));
    };
  } catch (e) {
    dispatch({
      type: Error,
      error: 'error',
    });
  }
};

export const refresh_rooms_list = () => {
  try {
    var lastdoc = null;
    var obj = null;
    return async dispatch => {
      let list3 = [];
      let query = await firestore()
        .collection('Posts')
        .orderBy('createdat', 'desc');

      await query
        .limit(8)
        .get()
        // .onSna
        .then(async querySnapshot => {
          lastdoc = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(doc => {
            let post = doc.data();
            post.id = doc.id;
            list3.push(post);
            //console.log(list3);
          });
          for (const post of list3) {
            //   list3.forEach(async post => {
            let response = await post.postedby.get();
            response = response.data();
            delete response.password;
            post.postedby = response;

            if (post.comments.length > 0)
              for (var i = 0; i < post.comments.length; i++) {
                let commentor = await post.comments[i].commentedby.get();
                commentor = commentor.data();
                delete commentor.password;
                post.comments[i].commentedby = commentor;
              }
          }
          obj = {
            list3: list3,
            lastdoc: lastdoc,
          };
          //console.log("Hello1);
          if (obj.lastdoc && list3[0]?.postedby?.name) {
            //console.log("actions>>")
            //console.log(obj.list3[0]);
            dispatch(Refresh_data(obj));
          }
        });

      //console.log("Hello2:"+obj);
    };
  } catch (e) {
    console.log('error:' + e);
    dispatch({
      type: 'Error',
      error: 'error',
    });
  }
};

export const Refresh_data = obj => {
  return {
    type: 'REFRESH_ROOMS_LIST',
    payload: obj,
  };
};

export const clearUserState = () => dispatch => {
  dispatch({
    type: 'CLEAR_USER_STATE',
  });
};
export const updateUserData = data => {
  try {
    return async dispatch => {
      //console.log(img);
      dispatch(update_data(data));
    };
  } catch (e) {
    dispatch({
      type: 'Error',
      error: 'error',
    });
  }
};
export const update_data = data => {
  console.log('data: ' + data.name);
  return {
    type: 'UPDATE_USER_DATA',
    payload: data,
  };
};
export const setMentorList = mentors => {
  return {
    type: 'SET_MENTORS',
    payload: mentors,
  };
};
export const setMentorProfile = mentor => {
  return {
    type: SELECT_MENTOR,
    payload: mentor,
  };
};
export const updateImage = img => {
  try {
    return async dispatch => {
      //console.log(img);
      dispatch(Imageupload(img));
    };
  } catch (e) {
    dispatch({
      type: 'Error',
      error: 'error',
    });
  }
};

export const Imageupload = img => {
  return {
    type: 'UPDATE_IMAGE',
    payload: img,
  };
};

const deletePostFunction = post => {
  const {image} = post;
  const postId = post.id;

  if (image != null && image != '') {
    const storageRef = storage().refFromURL(image);
    const imageRef = storage().ref(storageRef.fullPath);

    imageRef
      .delete()
      .then(() => {
        console.log(`${image} has been deleted successfully.`);
        deleteFirestoreData(postId);
      })
      .catch(e => {
        console.log('Error while deleting the image. ', e);
      });
    // If the post image is not available
  } else {
    deleteFirestoreData(postId);
  }
};

const deleteFirestoreData = postId => {
  firestore()
    .collection('Posts')
    .doc(postId)
    .delete()
    .then(() => {
      Alert.alert('Post deleted!', 'Your post has been deleted successfully!');
      //setDeleted(true);
      //setPosts(posts => [...posts.filter(post => post.id != postId)]);
    })
    .catch(e => console.log('Error deleting post.', e));
};

export const deletePost = (post, postId) => {
  try {
    return async dispatch => {
      dispatch(delete_post_from_rooms(post));
      deletePostFunction(post);
    };
  } catch (e) {
    dispatch({
      type: 'Error',
      error: 'error',
    });
  }
};

export const delete_post_from_rooms = post => {
  return {
    type: 'DELETE_POST',
    payload: post,
  };
};
export const load_freshroom_data = lastDocument => {
  try {
    var lastdoc = null;
    var obj = null;
    return async dispatch => {
      let list3 = [];
      let query = await firestore()
        .collection('Posts')
        .orderBy('createdat', 'desc');

      await query
        .limit(7)
        // .get()
        .onSnapshot(querySnapshot => {
          lastdoc = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(doc => {
            let post = doc.data();
            post.id = doc.id;
            list3.push(post);
            //console.log(list3);
          });
          list3.forEach(async post => {
            let response = await post.postedby.get();
            response = response.data();
            delete response.password;
            post.postedby = response;

            if (post.comments.length > 0)
              for (var i = 0; i < post.comments.length; i++) {
                let commentor = await post.comments[i].commentedby.get();
                commentor = commentor.data();
                delete commentor.password;
                post.comments[i].commentedby = commentor;
              }
          });
          obj = {
            list3: list3,
            lastdoc: lastdoc,
          };

          if (obj.lastdoc) {
            console.log(obj.list3);
            console.log('fresh request made');
            dispatch(fresh_room_Data(obj));
          }
        });
    };
  } catch (e) {
    console.log('error:' + e);
    dispatch({
      type: 'Error',
      error: 'error',
    });
  }
};
export const fresh_room_Data = obj => {
  return {
    type: 'LOAD_FRESHROOM_DATA',
    payload: obj,
  };
};

export const set_allLoaded = value => dispatch => {
  dispatch({
    type: 'ALL_LOADED',
    payload: value,
  });
};
export const load_room_data = lastDocument => {
  try {
    var lastdoc = null;
    var obj = null;
    return async dispatch => {
      let list3 = [];
      let query = await firestore()
        .collection('Posts')
        .orderBy('createdat', 'desc');
      if (lastDocument !== undefined) {
        query = query.startAfter(lastDocument);
      }
      await query
        .limit(8)
        .get()
        // .onSna
        .then(async querySnapshot => {
          lastdoc = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(doc => {
            let post = doc.data();
            post.id = doc.id;
            list3.push(post);
            //console.log(list3);
          });
          for (const post of list3) {
            //   list3.forEach(async post => {
            let response = await post.postedby.get();
            response = response.data();
            delete response.password;
            post.postedby = response;
            //console.log("response:"+post.postedby.name)
            if (post.comments.length > 0) {
              for (var i = 0; i < post.comments.length; i++) {
                let commentor = await post.comments[i].commentedby.get();
                commentor = commentor.data();
                delete commentor.password;
                post.comments[i].commentedby = commentor;
              }
            }
          }
          obj = {
            list3: list3,
            lastdoc: lastdoc,
          };
          //console.log("Hello1);
          if (obj.lastdoc && obj.list3.length >= 0) {
            //console.log("actions>>")
            //console.log(obj.list3[0]);
            dispatch(load_Data(obj));
          }
        });

      console.log('Hello2:' + obj);
    };
  } catch (e) {
    console.log('error:' + e);
    dispatch({
      type: 'Error',
      error: 'error',
    });
  }
};

export const like_post = (postId, post, email) => {
  try {
    return async dispatch => {
      dispatch(like_a_single_post(postId, post));
      await firestore()
        .collection('Posts')
        .doc(postId)
        .update({
          likes: firestore.FieldValue.arrayUnion(email),
        });
    };
  } catch (e) {
    console.log('error:' + e);
    dispatch({
      type: 'Error',
      error: 'error',
    });
  }
};

export const setUser = data => {
  try {
    return async dispatch => {
      //const user=await firestore().collection('Users').doc(email).get();
      //console.log(user);
      var udata = [];
      var basket;
      if (data.userType == 'Mentor') {
        for (var i = 0; i < data?.clients?.length; i++) {
          basket = await firestore()
            .collection('Users')
            .doc(data?.clients[i])
            .get();
          udata.push(basket.data());
        }
      } else {
        for (var i = 0; i < data.mentors.length; i++) {
          basket = await firestore()
            .collection('Users')
            .doc(data?.mentors[i])
            .get();
          udata.push(basket.data());
        }
      }
      dispatch({
        type: 'SET_USER',
        payload: {data, udata},
      });
    };
  } catch (e) {
    console.log('error:' + e);
    dispatch({
      type: 'Error',
      error: 'error',
    });
  }
};

const deleteCommentPost = async (postId, post, commentid) => {
  var list = [];
  list = post.comments.filter(comment => comment.commentid != commentid);

  // console.log(list);

  try {
    await firestore()
      .collection('Posts')
      .doc(postId)
      .update({comments: list})
      .then(() => {
        alert('Comment has been deleted');
      })
      .catch(e => {
        console.log(e);
      });
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = (postId, post, commentId) => {
  try {
    return async dispatch => {
      dispatch(delete_Comment_from_pin_post(postId, post, commentId));
      deleteCommentPost(postId, post, commentId);
    };
  } catch (e) {
    console.log('error:' + e);
    dispatch({
      type: 'Error',
      error: 'error',
    });
  }
};

export const delete_Comment_from_pin_post = (postId, post, commentId) => {
  return {
    type: 'DELETE_POST_ACTION',
    payload: {postId, post, commentId},
  };
};

export const pushComment = (postId, post, commentbody) => {
  try {
    return async dispatch => {
      await firestore()
        .collection('Posts')
        .doc(postId)
        .update({
          comments: firestore.FieldValue.arrayUnion(commentbody),
        })
        .then(res => {
          //console.log("res:"+res);
          dispatch(postComment(postId, post, commentbody));
        })
        .catch(e => {
          console.log('error:' + e);
          dispatch({
            type: 'Error',
            error: 'error',
          });
        });
    };
  } catch (e) {
    console.log('error:' + e);
    dispatch({
      type: 'Error',
      error: 'error',
    });
  }
};

export const postComment = (postId, post, commentbody) => {
  return {
    type: 'POST_COMMENT',
    payload: {postId, post, commentbody},
  };
};

export const pin_post = item => {
  // dispatch({
  //     type:"PIN_POST",
  //     payload:id
  // })
  try {
    return async dispatch => {
      //await firestore().collection('Posts').get('')
      dispatch(pin_an_item(item));
    };
  } catch (e) {
    console.log('error:' + e);
    dispatch({
      type: 'Error',
      error: 'error',
    });
  }
};
export const pin_an_item = item => {
  return {
    type: 'PIN_POST',
    payload: item,
  };
};
export const like_a_single_post = (postId, post) => {
  return {
    type: 'LIKE_POST',
    payload: {postId, post},
  };
};
export const load_Data = obj => {
  return {
    type: 'LOAD_ROOM_DATA',
    payload: obj,
  };
};

export const updateUserState = (user, udata) => {
  return {
    type: 'ADD_USER',
    payload: {user, udata},
  };
};
export const passedUser = data => {
  console.log('data of array is', data);

  return {
    type: 'Passed_User',
    payload: data,
  };
};

export const matchedpeople = matchedarray => {
  return {
    type: 'Matched_People',
    payload: matchedarray,
  };
};
