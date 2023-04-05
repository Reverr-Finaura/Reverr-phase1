import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AboutMeSection from "../Components/components/AboutMeSection";
import FindMeOn from "../Components/components/FindMeOn";
import LineBar from "../Components/components/LineBar";
import ProfileTitle from "../Components/components/ProfileTitle";
import RegularHeader from "../Components/components/RegularHeader";
import WhyHere from "../Components/components/WhyHere";
import Theme from "../utils/Theme";


function Profile(){

  const navigation = useNavigation();

    const [selectedText, setSelectedText] = useState('about'); 

    const handleTextClick = (text) => {
      switch (text) {
        case 'posts':
          setSelectedText('posts');
          break;
        case 'about':
          setSelectedText('about');
          break;
      }
    };
  
    
    return(
    <View style={styles.container}>

       <RegularHeader leftHandlePress={()=>navigation.goBack()} title="Profile"/>

       <ScrollView>
       <View style={styles.wrapper}>
       <LinearGradient colors={['#3D85E3', '#79C0F2']} style={styles.imgborder}>
       <Image source={Theme.userguy} style={styles.img} />
       </LinearGradient>
        <View style={{marginTop:20,flexDirection:'row',alignItems:'center'}}>
            <Text style={styles.usertitle}>Jatin Khurana</Text>
            <Image source={Theme.verify} style={styles.verify} />
        </View>
        <Text style={styles.tag}>@jatinkhurana</Text>
       </View>


       <View style={styles.tabWrapper}>
        <TouchableOpacity style={[styles.activeStyle,{borderBottomColor:selectedText === 'posts' ? Theme.primaryColor : 'rgba(5,5,5,0)',}]} onPress={() => handleTextClick('posts')}>
        <Text style={[styles.text,{color:selectedText === 'posts' ? Theme.primaryColor : '#FFF'}]}>Posts</Text>
        </TouchableOpacity>
        <View style={{width:35}}/>
        <TouchableOpacity style={[styles.activeStyle,{borderBottomColor:selectedText === 'about' ? Theme.primaryColor : 'rgba(5,5,5,0)'}]} onPress={() => handleTextClick('about')}>
        <Text style={[styles.text,{color:selectedText === 'about' ? Theme.primaryColor : '#FFF'}]}>About</Text>
        </TouchableOpacity>
     </View>


      <AboutMeSection/>

      <View style={{paddingHorizontal:20}}>
      <LineBar/>
      </View>

      <WhyHere/>

      <View style={{paddingHorizontal:20}}>
      <LineBar/>
      </View>

      <ProfileTitle title='Currently' textOne='Cheif Executive Officer' textTwo='Rever,Mastok' />

      <View style={{paddingHorizontal:20}}>
      <LineBar/>
      </View>
      
      <ProfileTitle title='Industry' textOne='Sales and marketing'  />

      <View style={{paddingHorizontal:20}}>
      <LineBar/>
      </View>

      <ProfileTitle title='Education' textOne='IIM Bangalore' textTwo='MBA' />

      <View style={{paddingHorizontal:20}}>
      <LineBar/>
      </View>

      <FindMeOn title={'Find Me On:'} />


       </ScrollView>
    </View>
    )}
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
  },
  title: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    color: "#FFF",
    fontWeight: "bold",
  },
  tabWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent:'center',
    borderBottomColor:'#7c7c7c',
    borderBottomWidth:1,
    marginHorizontal:20,
    paddingTop:15
  },
  text: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom:3
  },
  activeStyle: {
    borderBottomWidth: 4,
    marginRight: 15,
  },
  img:{
    height:150,
    width:150,
    resizeMode:'contain',
    borderRadius:100
  },
  imgborder:{
    height:158,
    width:158,
    resizeMode:'contain',
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center'
  },
  wrapper:{
    paddingTop:25,
    alignItems:'center'
  },
  usertitle:{
    color:'#FFF',
    fontSize:20,
    fontWeight:'bold',
  },
  verify:{
    height:25,
    width:25,
    resizeMode:'contain',
    marginLeft:5
  },
  tag:{
    color:'#FFF',
    fontSize:15,
    fontWeight:'bold',
    marginTop:8
  },
});