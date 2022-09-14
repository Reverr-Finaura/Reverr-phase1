import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {AppColors} from '../../../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import {ChangeDp} from '../../utils/fireBaseFunctions';
import {ChangeDp} from '../../../utils/FirebaseFunctionality';
import {useNavigation} from '@react-navigation/native';
import {EditCard, CustomButton, BackButton} from '../../../Components/index';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './style';
import {updateUserData} from '../../../Redux/actions';
const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const EditProfile = () => {
  const state = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const [Name, setName] = useState(state?.user && state?.user?.name);
  const [About, setAbout] = useState(
    state?.user && state?.user?.about == '' ? '>/s<' : state?.user?.about,
  );
  const [Industry, setIndustry] = useState(
    state?.user && state?.user?.industry == '' ? '>/s<' : state?.user?.industry,
  );
  const [loading, setLoading] = useState(false);

  const [ex1, setEx1] = useState(
    state?.user && state?.user?.experience && state?.user?.experience.length > 0
      ? state.user.experience[0]
      : '>/s<',
  );
  const [ex2, setEx2] = useState(
    state?.user && state?.user?.experience && state?.user?.experience.length > 1
      ? state?.user?.experience[1]
      : '>/s<',
  );
  const [ex3, setEx3] = useState(
    state?.user && state?.user?.experience && state?.user?.experience.length > 2
      ? state?.user?.experience[2]
      : '>/s<',
  );

  const [sk1, setSk1] = useState(
    state?.user && state?.user?.skills && state?.user?.skills.length > 0
      ? state?.user?.skills[0]
      : '>/s<',
  );
  const [sk2, setSk2] = useState(
    state?.user && state?.user?.skills && state?.user?.skills.length > 1
      ? state?.user?.skills[1]
      : '>/s<',
  );
  const [sk3, setSk3] = useState(
    state?.user && state?.user?.skills && state?.user?.skills.length > 2
      ? state?.user?.skills[2]
      : '>/s<',
  );
  // const [sk4,setSk4] = useState(state&&state.skills&&state.skills>2?state.skills[3]:'>/s<');
  // const [sk5,setSk5] = useState(state&&state.skills&&state.skills>2?state.skills[4]:'>/s<');

  const [ed1, setEd1] = useState(
    state?.user && state?.user?.education && state?.user?.education.length > 0
      ? state.user?.education[0]
      : '>/s<',
  );
  const [ed2, setEd2] = useState(
    state?.user && state?.user?.education && state?.user?.education.length > 1
      ? state.user.education[1]
      : '>/s<',
  );
  const [ed3, setEd3] = useState(
    state?.user && state?.user?.education && state?.user?.education.length > 2
      ? state?.user?.education[2]
      : '>/s<',
  );

  const navigation = useNavigation();
  const AllowPermission = async () => {
    console.log('call here');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message:
            'Reverr App needs access to your camera ' +
            'so you can  post pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ChangeDp(setLoading, dispatch, state?.user?.email);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const saveChanges = async () => {
    var abt = About == '>/s<' ? '' : About;
    var ind = Industry == '>/s<' ? '' : Industry;

    const Experience = [
      ex1 == '>/s<' ? '' : ex1,
      ex2 == '>/s<' ? '' : ex2,
      ex3 == '>/s<' ? '' : ex3,
    ];
    const Skills = [
      sk1 == '>/s<' ? '' : sk1,
      sk2 == '>/s<' ? '' : sk2,
      sk3 == '>/s<' ? '' : sk3,
    ]; //sk4,sk5
    const Education = [
      ed1 == '>/s<' ? '' : ed1,
      ed2 == '>/s<' ? '' : ed2,
      ed3 == '>/s<' ? '' : ed3,
    ];

    const data = {
      name: Name,
      experience: Experience,
      skills: Skills,
      about: abt,
      industry: ind,
      education: Education,
    };
    await firestore()
      .collection('Users')
      .doc(state.user.email)
      .update(data)
      .then(() => {
        dispatch(updateUserData(data));
        if (state.user.userType == 'Mentor') {
          navigation.navigate('MentorProfile');
        } else {
          navigation.navigate('IndividualProfile');
        }
      })
      .catch(err => {
        alert('Problem while updating data!');
      })
      .catch(err => {
        alert('Problem while updating data!');
      });
    //dispatch({type: 'UPDATE', payload: data});
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <BackButton
          IconSize={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text
          style={{
            color: AppColors.FontsColor,
            fontFamily: 'Poppins-Regular',
            marginStart: Width / 4.5,
            fontSize: 22,
          }}>
          Edit Profile
        </Text>
      </View>
      <ScrollView style={styles.mainContainer}>
        <EditCard
          value={Name}
          Title="Name"
          style={styles.name}
          onChangeText={n => {
            setName(n);
          }}
        />
        <EditCard
          Title="About"
          onChangeText={a => {
            setAbout(a);
          }}
          value={About == '>/s<' ? 'Enter About' : About}
        />
        <EditCard
          Title="Industry"
          value={Industry == '>/s<' ? 'Enter Your Industry' : Industry}
          style={[
            styles.name,
            {marginTop: Height / 90, color: AppColors.infoFonts},
          ]}
          onChangeText={i => {
            setIndustry(i);
          }}
        />
        <EditCard
          Title="Experience"
          onChangeText={e => {
            setEx1(e);
          }}
          value={ex1 == '>/s<' ? 'Enter Experience' : ex1}
        />
        <EditCard
          onChangeText={e => {
            setEx2(e);
          }}
          value={ex2 == '>/s<' ? 'Enter Experience' : ex2}
        />
        <EditCard
          onChangeText={e => {
            setEx3(e);
          }}
          value={ex3 == '>/s<' ? 'Enter Experience' : ex3}
        />
        <EditCard
          Title="Skills"
          onChangeText={e => {
            setSk1(e);
          }}
          value={sk1 == '>/s<' ? 'Enter Skill' : sk1}
        />
        <EditCard
          onChangeText={e => {
            setSk2(e);
          }}
          value={sk2 == '>/s<' ? 'Enter Skill' : sk2}
        />
        <EditCard
          onChangeText={e => {
            setSk3(e);
          }}
          value={sk3 == '>/s<' ? 'Enter Skill' : sk3}
        />
        {/* <EditCard
           
           onChangeText={e => {
             setSk4(e);
           }}
           value={sk4 == '>/s<' ? 'Enter Skill' :  sk4}
         />
         <EditCard
           
           onChangeText={e => {
             setSk5(e);
           }}
           value={sk5 == '>/s<' ? 'Enter Skill' :  sk5}
         /> */}
        <EditCard
          Title="Education"
          onChangeText={e => {
            setEd1(e);
          }}
          value={ed1 == '>/s<' ? 'Enter Education' : ed1}
        />
        <EditCard
          onChangeText={e => {
            setEd2(e);
          }}
          value={ed2 == '>/s<' ? 'Enter Education' : ed2}
        />
        <EditCard
          onChangeText={e => {
            setEd3(e);
          }}
          value={ed3 == '>/s<' ? 'Enter Education' : ed3}
        />
      </ScrollView>
      <CustomButton
        Title="Save Changes"
        onPress={() => saveChanges()}
        style={{marginBottom: '4%'}}
      />
      <View style={styles.dp}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: state.user && state.user.image}}
        />
      </View>
      <ActivityIndicator
        animating={loading}
        style={styles.loader}
        size="large"
        color="white"
      />
      <TouchableOpacity
        style={styles.camera}
        onPress={() => {
          AllowPermission();
        }}>
        <Icon name="camera" size={15} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export {EditProfile};
