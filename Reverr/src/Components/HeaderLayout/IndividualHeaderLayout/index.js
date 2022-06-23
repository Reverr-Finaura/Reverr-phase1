import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import { Header } from '../../HeaderComponents';
import { AppColors } from '../../../utils';
import {useNavigation} from '@react-navigation/native';
//import CalanderScreen from '../CalanderScreen/CalanderScreen';
//import ModelView from '../../Componants/ModelView';
//import {UserContext} from '../../App';
import { useSelector,useDispatch } from 'react-redux';

const IndividualHeaderLayout = props => {
  //const {state, dispatch} = useContext(UserContext);
  const state=useSelector(state=>state.UserReducer);
  //const mentorstate=useSelector(state=>state.MentorReducer);
  const [isOpen, setIsOpen] = useState(false);

  const navigation = useNavigation();
  //console.log(state.image);
  return (
    <View style={styles.screen}>
      <Header
        onPressDp={() => {
          // navigation.navigate(
          //   mentorstate && mentorstate?.mentor && mentorstate.mentor.userType === 'Mentor'
          //     ? 'MentorProfile'
          //     : 'Individual',
          // );
          if(state && state?.user && state.user.userType=='Individual'){
            navigation.navigate('IndividualProfile')
          }
        }}
        onPressCalander={() => {
          setIsOpen(true);
        }}
        onPressNoti={() => {
          //navigation.navigate('notification');
        }}
        onPressChat={() => {
          //navigation.navigate('Chat');
        }}
        DpUrl={state && state.image}
      />
      {/* <ModelView
        ShowModal={isOpen}
        onCloseModal={() => {
          setIsOpen(false);
        }}>
        <CalanderScreen
          onClose={() => {
            setIsOpen(false);
          }}
          setModel={setIsOpen}
        />
      </ModelView> */}
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
});

export {IndividualHeaderLayout};
