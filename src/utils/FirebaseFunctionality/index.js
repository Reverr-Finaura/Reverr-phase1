import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
//import {add_user,updateImage} from '../../Redux/actions';
import {setUser, updateImage, updateUserState} from '../../Redux/actions';
import {useDispatch} from 'react-redux';

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();

const loginUser = async (email, password) => {
  var user_request_obj = {
    success: false,
    failiure: false,
    failiure_message: null,
  };
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    if (e.code === 'auth/wrong-password') {
      //alert('Wrong password try again!');
      user_request_obj.failiure = true;
      user_request_obj.failiure_message = 'Wrong Password try again!';
      return user_request_obj;
      //console.log("Wrong password try again")
    }
    if (e.code === 'auth/user-not-found') {
      //alert('No user registered with that email');
      //console.log("No user registered with that email");
      user_request_obj.failiure = true;
      user_request_obj.failiure_message = 'No user registered with this email!';
      return user_request_obj;
    }
  }
  const savedUser = await firestore().collection('Users').doc(email).get();

  //dispatch(add_user(savedUser._data));
  user_request_obj.success = true;
  console.log(savedUser);
  return user_request_obj;
};

export const ChangeDp = (setLoading, dispatch, email) => {
  ImagePicker.openPicker({
    mediaType: 'photo',
  })
    .then(image => {
      console.log(image);
      try {
        setLoading(true);
        const url = image.path;
        const fileUrl = url.substring(url.lastIndexOf('/') + 1);
        storage()
          .ref('Images/' + fileUrl)
          .putFile(url)
          .then(async () => {
            var imgURL = await storage()
              .ref('Images/' + fileUrl)
              .getDownloadURL();
            console.log('url', imgURL);
            setLoading(false);
            dispatch(updateImage(imgURL));
            await firestore()
              .collection('Users')
              .doc(email)
              .update({
                image: imgURL,
              })
              .then(() => {
                alert('changed');
                setLoading(false);
              });
          });
      } catch (error) {
        alert('Cancel');
        setLoading(false);
      }
    })
    .catch(err => {
      console.log('No image selected!');
      setLoading(false);
    });
};

// export const SavePost = async (item, email, posts) => {
//   const res = await firestore()
//     .collection('Users')
//     .doc(email)
//     .update({savedPosts: [...posts, item.id]});
// };

// export const RemovePost = async (item, email, posts) => {
//   const res = await firestore()
//     .collection('Users')
//     .doc(email)
//     .update({savedPosts: [...posts.filter(arti => arti != item.id)]});
// };

export const AddGalleryImage = (setfileUrl, setLoader) => {
  ImagePicker.openPicker({
    mediaType: 'photo',
  })
    .then(image => {
      setLoader(true);
      try {
        const url = image.path;
        const fileUrl = url.substring(url.lastIndexOf('/') + 1);
        storage()
          .ref('Images/' + fileUrl)
          .putFile(url)
          .then(async () => {
            var imgURL = await storage()
              .ref('Images/' + fileUrl)
              .getDownloadURL();
            setfileUrl(imgURL);
            console.log(imgURL);
            setLoader(false);
            /*  dispatch({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore().collection('Users').doc(userEmail).update({
            image: imgURL,
          }); */
          })
          .catch(e => {
            setLoader(false);
            console.log('error not selected file');
          });
      } catch (error) {
        setLoader(false);
        alert('Cancel');
      }
    })
    .catch(e => {
      setLoader(false);
      console.log('error not selected file');
    });
};
export const AddCameraImage = (setfileUrl, setLoader) => {
  ImagePicker.openCamera({
    mediaType: 'photo',
  })
    .then(image => {
      setLoader(true);
      try {
        const url = image.path;
        const fileUrl = url.substring(url.lastIndexOf('/') + 1);
        storage()
          .ref('Images/' + fileUrl)
          .putFile(url)
          .then(async () => {
            var imgURL = await storage()
              .ref('Images/' + fileUrl)
              .getDownloadURL();
            setfileUrl(imgURL);
            console.log(imgURL);
            setLoader(false);

            /*  dispatch({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore().collection('Users').doc(userEmail).update({
            image: imgURL,
          }); */
          })
          .catch(e => {
            setLoader(false);
            console.log('error not selected file');
          });
      } catch (error) {
        setLoader(false);
        alert('Cancel');
        return null;
      }
    })
    .catch(e => {
      setLoader(false);
      console.log('error not selected file');
    });
};

export const AddGalleryVideo = (setVideoUrl, setLoader) => {
  ImagePicker.openPicker({
    mediaType: 'video',
  })
    .then(video => {
      setLoader(true);
      try {
        const url = video.path;
        const fileUrl = url.substring(url.lastIndexOf('/') + 1);
        storage()
          .ref('Videos/' + fileUrl)
          .putFile(url)
          .then(async () => {
            var vidURL = await storage()
              .ref('Videos/' + fileUrl)
              .getDownloadURL();
            console.log(vidURL);
            setVideoUrl(vidURL);
            setLoader(false);
            /*  dispatch({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore().collection('Users').doc(userEmail).update({
            image: imgURL,
          }); */
          })
          .catch(e => {
            setLoader(false);
            console.log('error not selected file');
          });
      } catch (error) {
        setLoader(false);
        alert('Cancel');
      }
    })
    .catch(e => {
      setLoader(false);
      console.log('error not selected file');
    });
};
export const AddCameraVideo = (setVideoUrl, setLoader) => {
  ImagePicker.openCamera({
    mediaType: 'video',
  })
    .then(image => {
      setLoader(true);
      try {
        const url = image.path;
        const fileUrl = url.substring(url.lastIndexOf('/') + 1);
        storage()
          .ref('Videos/' + fileUrl)
          .putFile(url)
          .then(async () => {
            var imgURL = await storage()
              .ref('Videos/' + fileUrl)
              .getDownloadURL();
            // console.log(imgURL);
            setVideoUrl(imgURL);
            setLoader(false);
            /*  dispatch({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore().collection('Users').doc(userEmail).update({
            image: imgURL,
          }); */
          })
          .catch(e => {
            setLoader(false);
            console.log('error not selected file');
          });
      } catch (error) {
        setLoader(false);
        alert('Cancel');
        return null;
      }
    })
    .catch(e => {
      setLoader(false);
      console.log('error not selected file');
    });
};

export const SendMessage = (currentcUser, sendTo, message, ref) => {
  firestore()
    .collection('Messages')
    .doc(currentcUser.email)
    .collection(
      currentcUser && currentcUser.userType == 'Mentor'
        ? 'YourClients'
        : 'YourMentors',
    )
    .doc(sendTo.email)
    .update({
      messages: firestore.FieldValue.arrayUnion({
        msg: message,
        createdAt: firestore.Timestamp.fromDate(new Date()),
        sendBy: currentcUser.email,
      }),
    })
    .then(() => {
      ref.current.scrollToEnd();
      firestore()
        .collection('Messages')
        .doc(sendTo.email)
        .collection(
          sendTo && sendTo.userType == 'Mentor' ? 'YourClients' : 'YourMentors',
        )
        .doc(currentcUser.email)
        .update({
          messages: firestore.FieldValue.arrayUnion({
            msg: message,
            createdAt: date + '-' + month + '-' + year,
            sendBy: currentcUser.email,
          }),
        });
    });
};
export const ReciveMessage = async (currentcUser, sendTo, setmsg) => {
  const Allmsg = await firestore()
    .collection('Messages')
    .doc(currentcUser.email)
    .collection(
      currentcUser && currentcUser.userType == 'Mentor'
        ? 'YourClients'
        : 'YourMentors',
    )
    .doc(sendTo.email)
    .get();
  setmsg(Allmsg._data.messages);
};

export const getPost = async () => {
  let postdata = '';
  let t = await firestore().collection('Posts').get();
  console.log(t, 'kdjksdsiodo');
  return t._docs;
};

export const ConnectToSocial = async (
  currentcUseremail,
  toUserEmail,
  setLoading,
) => {
  let userData = [];
  setLoading(true);
  await firestore()
    .collection('Users')
    .doc(currentcUseremail)
    .update({
      sendRequests: firestore.FieldValue.arrayUnion(toUserEmail),
    })
    .then(async () => {
      await firestore()
        .collection('Users')
        .doc(toUserEmail)
        .update({
          recivedRequests: firestore.FieldValue.arrayUnion(currentcUseremail),
        });
    })
    .then(async () => {
      await firestore()
        .collection('Users')
        .doc(currentcUseremail)
        .get()
        .then(inst => {
          //console.log(inst);
          // dispatch(setUser(inst._data));
          userData = inst._data;
        });
      setLoading(false);
    });
  return userData;
};

export const CancelRequest = async (
  currentcUseremail,
  toUserEmail,
  setLoading,
) => {
  let userData = [];
  setLoading(true);
  await firestore()
    .collection('Users')
    .doc(currentcUseremail)
    .update({
      sendRequests: firestore.FieldValue.arrayRemove(toUserEmail),
    })
    .then(async () => {
      await firestore()
        .collection('Users')
        .doc(toUserEmail)
        .update({
          recivedRequests: firestore.FieldValue.arrayRemove(currentcUseremail),
        });
    })
    .then(async () => {
      await firestore()
        .collection('Users')
        .doc(currentcUseremail)
        .get()
        .then(inst => {
          //console.log(inst);
          // dispatch(setUser(inst._data));
          userData = inst._data;
        });
      setLoading(false);
    });
  return userData;
};
export const rejectRequest = async (
  currentcUseremail,
  toUserEmail,
  setLoading,
) => {
  let userData = [];
  setLoading(true);
  await firestore()
    .collection('Users')
    .doc(currentcUseremail)
    .update({
      recivedRequests: firestore.FieldValue.arrayRemove(toUserEmail),
    })
    .then(async () => {
      await firestore()
        .collection('Users')
        .doc(toUserEmail)
        .update({
          sendRequests: firestore.FieldValue.arrayRemove(currentcUseremail),
        });
    })
    .then(async () => {
      await firestore()
        .collection('Users')
        .doc(currentcUseremail)
        .get()
        .then(inst => {
          //console.log(inst);
          // dispatch(setUser(inst._data));
          userData = inst._data;
        });
      setLoading(false);
    });
  return userData;
};
export const ApprovedReq = async (
  currentcUseremail,
  toUserEmail,
  setLoading,
) => {
  let userData = [];
  setLoading(true);
  await firestore()
    .collection('Users')
    .doc(currentcUseremail)
    .update({
      network: firestore.FieldValue.arrayUnion(toUserEmail),
    })
    .then(async () => {
      await firestore()
        .collection('Users')
        .doc(toUserEmail)
        .update({
          network: firestore.FieldValue.arrayUnion(currentcUseremail),
        });
    })
    .then(async () => {
      await firestore()
        .collection('Users')
        .doc(currentcUseremail)
        .update({
          recivedRequests: firestore.FieldValue.arrayRemove(toUserEmail),
        });
    })
    .then(async () => {
      await firestore()
        .collection('Users')
        .doc(toUserEmail)
        .update({
          sendRequests: firestore.FieldValue.arrayRemove(currentcUseremail),
        });
    })
    .then(async () => {
      setLoading(false);
      await firestore()
        .collection('Messages')
        .doc(currentcUseremail)
        .collection('Networks')
        .doc(toUserEmail)
        .set({
          messages: [
            {
              createdAt: '',
              msg: '',
              sendBy: '',
            },
          ],
        })
        .then(async () => {
          await firestore()
            .collection('Messages')
            .doc(toUserEmail)
            .collection('Networks')
            .doc(currentcUseremail)
            .set({
              messages: [
                {
                  createdAt: '',
                  msg: '',
                  sendBy: '',
                },
              ],
            })
            .then(async () => {
              await firestore()
                .collection('Users')
                .doc(currentcUseremail)
                .get()
                .then(inst => {
                  console.log(inst._data, 'inst');
                  // dispatch(setUser(inst._data));
                  userData = inst._data;
                });
              setLoading(false);
            });
        });
    });
  return userData;
};

export const fetchInitialData = async ({setData, setIsLoading}) => {
  setIsLoading(true);
  const querySnapshot = await firestore().collection('Posts').limit(10).get();
  const d = querySnapshot.docs.map(doc => ({...doc.data()}));
  setData(d);
  setIsLoading(false);
};

export const fetchMoreData = async ({setData, setIsLoading}) => {
  setIsLoading(true);
  const lastItem = data[data.length - 1];
  const querySnapshot = await firestore()
    .collection('Posts')
    .startAfter(lastItem)
    .limit(10)
    .get();
  const newData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  setData([...data, ...newData]);
  setIsLoading(false);
};

export const savePost = async (postID, currentUserEmail) => {
  console.log(postID, currentUserEmail);
  let userData = [];
  await firestore()
    .collection('Posts')
    .doc(postID)
    .update({
      saved: firestore.FieldValue.arrayUnion(currentUserEmail),
    })
    .then(async () => {
      await firestore()
        .collection('Users')
        .doc(currentUserEmail)
        .update({
          saved: firestore.FieldValue.arrayUnion(postID),
        })
        .then(async () => {
          await firestore()
            .collection('Users')
            .doc(currentUserEmail)
            .get()
            .then(inst => {
              console.log(inst._data, 'inst');
              // dispatch(setUser(inst._data));
              userData = inst._data;
            });
        });
    });
  return userData;
};

export const unsavePost = async (postID, currentUserEmail) => {
  let userData = [];
  await firestore()
    .collection('Posts')
    .doc(postID)
    .update({
      saved: firestore.FieldValue.arrayRemove(currentUserEmail),
    })
    .then(async () => {
      await firestore()
        .collection('Users')
        .doc(currentUserEmail)
        .update({
          saved: firestore.FieldValue.arrayRemove(postID),
        })
        .then(async () => {
          await firestore()
            .collection('Users')
            .doc(currentUserEmail)
            .get()
            .then(inst => {
              console.log(inst._data, 'inst');
              // dispatch(setUser(inst._data));
              userData = inst._data;
            });
        });
    });
  return userData;
};

export const sharePost = async (postID, currentUserEmail) => {
  let userData = [];
  await firestore()
    .collection('posts')
    .doc(postID)
    .update({
      share: firestore.FieldValue.arrayUnion(currentUserEmail),
    })
    .then(async () => {
      console.log('shared');
    });
};

export {loginUser};
