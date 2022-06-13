import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {add_user,updateImage} from '../../Redux/actions';

const loginUser=async(email,password)=>{
  
    var user_request_obj={
        success:false,
        failiure:false,
        failiure_message:null
    }
    try {
        await auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        if (e.code === 'auth/wrong-password') {
          //alert('Wrong password try again!');
          user_request_obj.failiure=true;
          user_request_obj.failiure_message="Wrong Password try again!";
          return user_request_obj
          //console.log("Wrong password try again")
        }
        if (e.code === 'auth/user-not-found') {
          //alert('No user registered with that email');
          //console.log("No user registered with that email");
          user_request_obj.failiure=true;
          user_request_obj.failiure_message="No user registered with this email!";
          return user_request_obj
        }
      }
    const savedUser = await firestore()
              .collection('Users')
              .doc(email)
              .get();
    
            //dispatch(add_user(savedUser._data));
    user_request_obj.success=true;
    console.log(savedUser);
    return user_request_obj;
}


export const ChangeDp=(loading,setLoading,dispatch,email)=>{
  ImagePicker.openPicker({
    mediaType: 'photo',
  }).then(image => {
    try {
      //loading;
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
  }).catch(err=>{
    console.log("No image selected!");
    setLoading(false);
  })
}


export {loginUser};