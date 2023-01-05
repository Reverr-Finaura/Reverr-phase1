import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {IndividualHeaderLayout} from '../../Components';
import {MentorCardLayout} from '../../Components/Mentor-card-layout';
import styles from './styles';

import {useSelector} from 'react-redux';
import {MentorCard} from '../../Components/MentorCard';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {mentorCategory, mentorsDomains} from '../../dumy-Data/mentorsCategory';
import {AppColors} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import MentorAccountDetails from '../../dumy-Data/AllMentorsAccountDetails';
import axios from 'axios';

export const Mentor = () => {
  const [column, setColumn] = useState(2);
  const [mentorsList, setMentorsList] = useState();
  const[vendorArray,setvendorArray]=useState(null)
  
  
  const state = useSelector(state => state.UserReducer);
  // console.log(state.user,"user")
  var mc = mentorCategory;
  var newlist = [];
  const getMentors = async () => {
    const snapshot = await firestore()
      .collection('Users')
      .get()
      .then(res => {
        let AllUsers = res.docs.map(doc => doc.data());
        let mentors = AllUsers.filter(item => item.userType === 'Mentor');
        setMentorsList(mentors)
        let domains = mentors.map(item => item.domain);
        // console.log(domains, 'domains');
      });
  };
  
//GENERATE RANDOM UNIQUE ID
const uuid=()=>{
  const val1=Date.now().toString(36)
  const val2=Math.random().toString(36).substring(2)

  return val1+val2
}

const createAccountDatabase= ()=>{
  let ultimateArr=[]
  let accMentorName=[]

MentorAccountDetails.map((details)=>{
  mentorsList?.map((mentor)=>{
if(mentor?.name?.toLowerCase()===details?.mentorName?.toLowerCase()){
  if(!mentor?.mentorUniqueID){ 
  ultimateArr.push({...mentor,accountDetails:details.AccountDetail})
  }
}
    })
    
  })
  
  ultimateArr?.map((item)=>{
    accMentorName.push(item.email)
  })
  
  setvendorArray(ultimateArr)
 
 console.log("accMentorName",accMentorName)


//NEVER USE THIS!!!
//  ultimateArr.map((item)=>{
//   firestore().collection('AccountDataTesting').doc(item.email).set({...item,mentorUniqueID:uuid().slice(0,16)}).then(() => {console.log('User added!');
//   })
// })
}


//FOR CREATING ACCOUNT DETAILS OF MENTORS IN FIREBASE

useEffect(() => {
  createAccountDatabase();
  
}, [mentorsList]);


//FOR CREATING VENDORS IN CASHFREE DATABASE

useEffect(()=>{
  const createVendors=async()=>{
    if(vendorArray===null){return;}
    vendorArray.map(async(item)=>{
      if(item)
  {
    if(item.accountDetails.accountNumber!==""){
      const headers={
  "x-client-id":"21235619dae90a7c71fa82b24c653212",
  "x-client-secret":"b3fcd2aee2a93a9d7efedcd88936046a43506c5c",
  "Content-Type":"application/json"
      }
      const data={
        "email":item.email,
    "status": "ACTIVE",
    "bank": 
      {
        "accountNumber": item.accountDetails.accountNumber,
        "accountHolder": item.accountDetails.accountHolderName,
        "ifsc": item.accountDetails.ifscCode
      },
      
    
    "phone": item.mobile?item.mobile:item.phone,
    "name": item.name,
    "id": item.mentorUniqueID,
    "settlementCycleId":2
      }

      // await axios.post("https://api.cashfree.com/api/v2/easy-split/vendors",data,{headers: headers}).then((res)=>{console.log("added",res)}).catch((err)=>{
      //   console.log("err",err)
      // });
      return
    }
    const headers={
      "x-client-id":"21235619dae90a7c71fa82b24c653212",
      "x-client-secret":"b3fcd2aee2a93a9d7efedcd88936046a43506c5c",
      "Content-Type":"application/json"
          }
          const data={
            "email":item.email,
        "status": "ACTIVE",
        "upi": 
        {
          "vpa": item.accountDetails.upiId,
          "accountHolder": item.name
        },
          
        
        "phone": item.mobile?item.mobile:item.phone,
        "name": item.name,
        "id": item.mentorUniqueID,
        "settlementCycleId":2
          }
          
          // await axios.post("https://api.cashfree.com/api/v2/easy-split/vendors",data,{headers: headers}).then((res)=>{console.log("added",res)}).catch((err)=>{
          //   console.log("err",err)
          // })
   }
    }
  
   )
  }
  // createVendors()
},[vendorArray])

  useEffect(() => {
    getMentors();
    
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <IndividualHeaderLayout>
        <View style={{paddingBottom: '32%'}}>
          <View style={{alignItems: 'center', paddingVertical: '3%'}}>
            <Text style={{color: AppColors.FontsColor, fontSize: 22}}>
              Mentors Categories
            </Text>
          </View>
          <FlatList
            numColumns={column}
            data={mentorsDomains}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('MentorList', {
                    mentorCategory: item,
                  });
                }}
                style={styles.Card}
                activeOpacity={0.7}>
                <LinearGradient
                  colors={[AppColors.ActiveColor, AppColors.primarycolor]}
                  start={{x: -0, y: 1.3}}
                  end={{x: 1.3, y: 0.5}}
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}>
                  <Image source={item.image} style={styles.image} />
                  <View style={{width: '55%', justifyContent: 'center'}}>
                    <Text
                      style={{
                        color: AppColors.FontsColor,
                        textAlign: 'center',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>
      </IndividualHeaderLayout>
    </View>
  );
};
