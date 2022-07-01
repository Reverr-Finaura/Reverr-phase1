import firestore from '@react-native-firebase/firestore';
import {setMentorList} from '../actions';

export const mentorService = async dispatch => {
  console.log('Called');

  try {
    const mentors = [];
    await firestore()
      .collection('Mentors')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const {name, industry, bio, domain} = doc.data();
          mentors.push({
            id: doc.id,
            name,
            industry,
            bio,
            domain,
          });
        });
      });
    dispatch(setMentorList(mentors));
  } catch {
    err => console.log(err);
  }
};
