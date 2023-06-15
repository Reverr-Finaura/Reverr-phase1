import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
const initialState = {
  testing: 'this is testing data',
  userDetails: [],
};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTest: (state, action) => {
      state.testing = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    getRoomData: async (state, action) => {

      console.log("sdkskdjsijdjsi");
     await firestore()
        .collection('Posts')
        .orderBy('createdat', 'desc')
        .get()
        .then(async querySnapshot => {
          // let  lastdoc = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(doc => {
            // let post = doc.data();
            // post.id = doc.id;
            // list3.push(post);
            console.log(doc);
          });
        });
    },
  },
});
export const {setTest, setUserDetails, getRoomData} = appSlice.actions;

export default appSlice.reducer;
