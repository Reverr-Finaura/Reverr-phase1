import React,{useState,useEffect} from "react";
import {Text,View,StyleSheet,FlatList, Dimensions,Image,ActivityIndicator} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { IndividualHeaderLayout } from "../../Components";
import { MentorList } from "../../Components/Mentor-list";
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";
const Width=Dimensions.get('window').width;
import { PaymentInfo } from "../../Components/PaymentInfo";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { AppColors } from "../../utils";
const DashBoard=()=>{
    const [loading,setLoading]=useState(true);
    const state=useSelector(state=>state.UserReducer);
    const [local_state,SetLocalState]=useState({
        clients:[],
        orderList:[],
        total_earnings:0
    })
    const fetchuserOrderData=async(email)=>{
        const data=await firestore().collection('Users').doc(email).get();
        const udata=data._data;
        //const udata=state.user;
        var list=[];
        for(let i=0;i<udata?.clients?.length;i++){
            const user=await firestore().collection('Users').doc(udata.clients[i]).get();
            list.push(user._data);
        }
        let total=0;
        let messagelist=[];
        for(let i=0;i<udata?.orders?.length;i++){
            const orderdata=await udata.orders[i].get();
            var odata=orderdata.data();
            var obj={
                id:odata.orderId,
                vendor:email,
                sender:odata.user,
                Amount:odata.orderAmount,

            }
            if(messagelist.length<10){
                messagelist.push(obj);
            }
            total+=odata.orderAmount;
        }
        
        SetLocalState({
            clients:list,
            total_earnings:total,
            orderList:messagelist
        })
        // console.log(local_state);
        setLoading(false);
    }
    useEffect(() => {
        fetchuserOrderData(state?.user?.email)
    }, []);

    if(loading==true){
        return (
            <IndividualHeaderLayout>
              <ActivityIndicator size="large" color="#fff" />
            </IndividualHeaderLayout>
        )
    } 
    return(
        <>
        <IndividualHeaderLayout>
        <Text style={styles.title}>DashBoard</Text>
        <Text style={styles.subTitle}>Learners</Text>
        {/* {console.log("Hi: "+ local_state.clients)} */}
        <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={local_state.clients}
        style={{
          position: 'absolute',
          top: '18%',
        }}
        renderItem={({item}) => <MentorList mentor={item} />}
      />
        
       <View style={{marginTop:100,marginBottom:0}}></View>
       <ScrollView>
       <Image
        style={styles.images}
        source={require('../../assets/images/Rectangle2.png')}
      />
      <Text style={styles.text}>Payments</Text>
       <View style={{justifyContent:'center',display:'flex',flexDirection:'row'}}>
       <Icon2
              name="wallet"
              size={22}
              color={AppColors.FontsColor}
            />
        
        <Text style={{color:"#fff",fontSize:20,fontWeight:'bold',marginTop:0,marginBottom:40}}> Your Balance-Rs {local_state?.total_earnings}</Text>
       </View>
       
       <Image
        style={styles.image}
        source={require('../../assets/images/Rectangle2.png')}
      />
      <Text style={styles.text}>Tranactions</Text>
        <PaymentInfo payments={local_state.orderList}/>
        </ScrollView>
        </IndividualHeaderLayout>
        </>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000c12',
      },
      title: {
        bottom: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal:24,
        marginVertical: 16,
        marginTop:10
      },
      subTitle: {
        bottom: 20,
        color: 'white',
        fontSize: 16,
        marginHorizontal: 24,
        marginVertical: 8,
        fontWeight: '500',
      },
      image: {
        width: 395,
        height: 36,
        bottom: 30,
        alignSelf: 'center',
        borderRadius: 10,
      },
      images: {
        width: 395,
        height: 36,
        bottom: 30,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop:30
      },
      text: {
        backgroundColor: '#0077b7',
        alignSelf: 'center',
        borderRadius: 10,
        width: 120,
        height: 25,
        textAlign: 'center',
        bottom:66,
        paddingHorizontal: 18,
        color: 'white',
        marginBottom:5
      },
})
export {DashBoard}