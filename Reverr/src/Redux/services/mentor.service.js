import firestore from '@react-native-firebase/firestore';
import {setMentorList} from '../actions';

export const mentorService = async dispatch => {
  console.log('Called');

  try {
    const mentors = [];
    await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data=doc.data();
          if(data.userType=='Mentor'){
          mentors.push({
            ...data,
            id:data.email
          });
        }
        });
      });
    dispatch(setMentorList(mentors));
  } catch {
    err => console.log(err);
  }
};
