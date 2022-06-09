import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import emailjs from 'emailjs-com';

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
    user_request_obj.success=true;
    console.log(savedUser);
    return user_request_obj;
}



export {loginUser};