import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../../HeaderComponents';
import {AppColors} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import {ModelView} from '../../ModelView';
import {useSelector, useDispatch} from 'react-redux';
import {CalanderScreen} from '../../../scenes/CalenderScreen';
const IndividualHeaderLayout = props => {
  //const {state, dispatch} = useContext(UserContext);
  const state = useSelector(state => state.UserReducer);
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
          //if(state && state?.user && state.user.userType=='Individual'){
          navigation.navigate('IndividualProfile');
          //}
        }}
        onPressCalander={() => {
          setIsOpen(true);
        }}
        onPressNoti={() => {
          navigation.navigate('Notification');
        }}
        onPressChat={() => {
          navigation.navigate('Messages');
        }}
        DpUrl={state.user && state.user.image}
      />
      {/* <CalanderScreen /> */}
      <ModelView
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
      </ModelView>
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
