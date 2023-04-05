import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";
import GradientHeader from "../Components/components/GradientHeader";
import AboutCard from "../Components/components/ScheduleCards/AboutCard";
import AppointmentCard from "../Components/components/ScheduleCards/AppointmentCard";
import Stars from "../Components/components/Stars";
import Theme from "../utils/Theme";
import { BackButton } from "../Components";
import { AppColors } from "../utils";



function ScheduleSession(props){
    const details = props.route.params.details;

    console.log(details,",sdjsjdsjdjo");
    return(
    <View style={styles.container}>
        <GradientHeader/>
     <View style={{paddingVertical:'2%',paddingLeft:'5%'}}>
     <BackButton/>
     </View>
       <ScrollView showsVerticalScrollIndicator={false}>
       {/* <View style={styles.upperWrapper}>
        <TouchableOpacity>
            <Image source={Theme.arrowleft} style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity>
            <Image source={Theme.heart} style={{height:25,width:25,resizeMode:'contain'}}/>
        </TouchableOpacity>
        </View>  */}
       


       <View style={styles.contentWrapper}>
       <View style={{backgroundColor:AppColors.FontsColor,height:230,width:230,borderRadius:200,overflow:'hidden'}}>
       <Image source={{uri:details.image}} style={{ height:'100%' ,width:'100%',resizeMode:'contain'}} />
       </View>
       <Text style={styles.maintitle}>{details.name}</Text>
       <Text style={styles.designation}>{details.industry}</Text>

       <View style={{alignItems:'center',marginTop:10,flexDirection:'row',paddingBottom:15}}>
            <Stars rating={4} />
            <Text style={{color:Theme.primaryColor,fontSize:10,marginTop:5}}> 18 Reviews</Text>
        </View>
       </View>
       

       <View style={{paddingHorizontal:20,paddingBottom:98}}>
       <AppointmentCard/>
       <AboutCard about={details}/>
       </View>


       </ScrollView>

       <TouchableOpacity style={styles.corner}>
          <Text style={{fontSize:16,color:'#FFF',fontWeight:'bold'}}>Schedule</Text>
        </TouchableOpacity>


    </View>
    )}
export default ScheduleSession;

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:Theme.backgroundColor
    },
    upperWrapper: {
        flexDirection:'row',
        alignItems:'flex-end',
        paddingHorizontal:25,
        justifyContent:'space-between',
        paddingBottom:15,
        marginTop:25
    },
    arrow:{
        width:22,
        height:22,
        resizeMode:'contain'
    },
    title:{
        color:'#FFF',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        marginRight:10
    },
    contentWrapper:{
        alignItems:'center',
    },
    maintitle:{
        fontSize:24,
        paddingTop:20,
        color:'#FFF',
        fontWeight:'bold'
    },
    designation:{
        fontSize:16,
        paddingTop:8,
        color:'#A6A6A6',
        fontWeight:'600'
    },
    corner:{
        resizeMode:'contain',
        borderRadius:100,
        position:'absolute',
        bottom:10,
        width:'90%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Theme.primaryColor,
        alignSelf:'center'
    },
});