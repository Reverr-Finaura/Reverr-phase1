import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
//import {add_user,updateImage} from '../../Redux/actions';
import {updateImage} from '../../Redux/actions';

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

export const SavePost = async (item, email, posts) => {
  const res = await firestore()
    .collection('Users')
    .doc(email)
    .update({savedPosts: [...posts, item.id]});
};

export const RemovePost = async (item, email, posts) => {
  const res = await firestore()
    .collection('Users')
    .doc(email)
    .update({savedPosts: [...posts.filter(arti => arti != item.id)]});
};

export const AddGalleryImage = setfileUrl => {
  ImagePicker.openPicker({
    mediaType: 'photo',
  })
    .then(image => {
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
            /*  dispatch({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore().collection('Users').doc(userEmail).update({
            image: imgURL,
          }); */
          })
          .catch(e => {
            console.log('error not selected file');
          });
      } catch (error) {
        alert('Cancel');
      }
    })
    .catch(e => {
      console.log('error not selected file');
    });
};
export const AddCameraImage = setfileUrl => {
  ImagePicker.openCamera({
    mediaType: 'photo',
  })
    .then(image => {
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

            /*  dispatch({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore().collection('Users').doc(userEmail).update({
            image: imgURL,
          }); */
          })
          .catch(e => {
            console.log('error not selected file');
          });
      } catch (error) {
        alert('Cancel');
        return null;
      }
    })
    .catch(e => {
      console.log('error not selected file');
    });
};

export const AddGalleryVideo = setVideoUrl => {
  ImagePicker.openPicker({
    mediaType: 'video',
  })
    .then(video => {
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
            /*  dispatch({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore().collection('Users').doc(userEmail).update({
            image: imgURL,
          }); */
          })
          .catch(e => {
            console.log('error not selected file');
          });
      } catch (error) {
        alert('Cancel');
      }
    })
    .catch(e => {
      console.log('error not selected file');
    });
};
export const AddCameraVideo = setVideoUrl => {
  ImagePicker.openCamera({
    mediaType: 'video',
  })
    .then(image => {
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
            return imgURL;
            /*  dispatch({type: 'UPDATEPHOTO', payload: imgURL});
          await firestore().collection('Users').doc(userEmail).update({
            image: imgURL,
          }); */
          })
          .catch(e => {
            console.log('error not selected file');
          });
      } catch (error) {
        alert('Cancel');
        return null;
      }
    })
    .catch(e => {
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
        createdAt: date + '-' + month + '-' + year,
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

  return t._docs;
};

export {loginUser};
