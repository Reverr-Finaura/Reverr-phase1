import React,{useCallback, useRef, useState} from 'react';
import {View, StyleSheet,Text, Dimensions,Image,Animated,PanResponder, ActionSheetIOS} from 'react-native';
//import { Color } from 'react-native-agora
import { FlatList } from 'react-native-gesture-handler';
//import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { IndividualHeaderLayout } from '../../Components';
import { Choice } from '../../Components';
// import { Value } from 'react-native-reanimated';
//import { IndividuaProfile } from '../ProfileScreens';



const Vibe = () => {
    
const [demoData,setDemoData]=useState([
    {
        id:'123',
        name:"Jatin Khurana",
        designation:'CEO Reverr and Fintech',
        country:'India',
        city:'Delhi',
        image:'../../assets/images/dp.png',
        quote:"Don't ship it. Don't settle for good enough. Do better work than you did yesterday. Get out of your comfort zone and give it your all"
    },
    {
        id:'125',
        name:"Gautam Kohli",
        designation:'CEO Reverr and Fintech',
        country:'India',
        city:'Delhi',
        image:'../../assets/images/dp.png',
        quote:"Don't ship it. Don't settle for good enough. Do better work than you did yesterday. Get out of your comfort zone and give it your all"
    },
    {
        id:'165',
        name:"Bhavya Kohli",
        designation:'CEO Reverr and Fintech',
        country:'India',
        city:'delhi',
        image:'../../assets/images/dp.png',
        quote:"Don't ship it. Don't settle for good enough. Do better work than you did yesterday. Get out of your comfort zone and give it your all"
    },
    {
        id:'456',
        name:"Sangeeta Kohli",
        designation:'CEO Reverr and Fintech',
        country:'India',
        city:'delhi',
        image:'../../assets/images/dp.png',
        quote:"Don't ship it. Don't settle for good enough. Do better work than you did yesterday. Get out of your comfort zone and give it your all"
    },
    {
        id:'789',
        name:"Maurice Rana",
        designation:'CEO Reverr and Fintech',
        country:'India',
        city:'Delhi',
        image:'../../assets/images/dp.png',
        quote:"Don't ship it. Don't settle for good enough. Do better work than you did yesterday. Get out of your comfort zone and give it your all"
    },
    {
        id:'190',
        name:"Dhruv Sharma",
        designation:'CEO Reverr and Fintech',
        country:'India',
        city:'Delhi',
        image:'../../assets/images/dp.png',
        quote:"Don't ship it. Don't settle for good enough. Do better work than you did yesterday. Get out of your comfort zone and give it your all"
    },
]);
        const [finish,setFinished]=useState(false);
        const {width,height}=Dimensions.get('window');
        const swipe=useRef(new Animated.ValueXY()).current;
        const titleSign=useRef(new Animated.Value(1)).current;

        const panResponder=PanResponder.create({
            onMoveShouldSetPanResponder:()=>true,
            onPanResponderMove:(_,{dx,dy,y0})=>{
                //console.log(gesture)
                swipe.setValue({x:dx,y:dy});
                //console.log(y0+":"+Dimensions.get('window').height/2.40);
                //console.log(y0+" :  "+Dimensions.get('window').height/1.8);
                titleSign.setValue(y0>Dimensions.get('window').height/1.8?1:-1);
            },
            onPanResponderRelease:(_,{dx,dy})=>{
                const direction=Math.sign(dx);
                const isActionActive=Math.abs(dx)>100
                if(isActionActive){
                    Animated.timing(swipe,{
                        duration:200,
                        toValue:{
                            x:direction*500,
                            y:dy
                        },
                        useNativeDriver:true,

                    }).start(removeTopCard)
                }else{
                Animated.spring(swipe,{
                    toValue:{
                        x:0,
                        y:0,
                    },
                    useNativeDriver:true,
                    friction:5
                }).start();
            }
            }
        });

    const removeTopCard=useCallback(()=>{
        setDemoData((prevstate)=>prevstate.slice(1));
        swipe.setValue({x:0,y:0});
    },[swipe]);
    const rotate=Animated.multiply(swipe.x,titleSign).interpolate({
        inputRange:[-100,0,100],
        outputRange:['8deg','0deg','-8deg']
    });

    const likeOpacity=swipe.x.interpolate({
        inputRange:[25,100],
        outputRange:[0,1],
        extrapolate:'clamp'
    });

    const unlikeOpacity=swipe.x.interpolate({
        inputRange:[-100,-25],
        outputRange:[1,0],
        extrapolate:'clamp'
    });


    const renderChoice=useCallback(()=>{
        return (
            <>
            <Animated.View style={[styles.choiceContainer,styles.likeContainer,{opacity:likeOpacity}]}>
                <Choice type="Like"/>
            </Animated.View>
            <Animated.View style={[styles.choiceContainer,styles.unlikeContainer,{opacity:unlikeOpacity}]}>
            <Choice type="UnLike"/>
        </Animated.View>
        </>
        );
    },[]);
    

    const animatedCardStyle={
        transform:[...swipe.getTranslateTransform(),{rotate}],
    }
    const RenderCard=({item,index,isFirst,titleSign})=>{
        
        // let isFirst=false;
         let dragHandler;
        if(index==0){
            isFirst=true;
            dragHandler=isFirst?panResponder.panHandlers:{};
        }

            return (
                
                <Animated.View style={[styles.card,isFirst && animatedCardStyle]} {...dragHandler}>
                    {/* <Animated.View dragHandler> */}
                {isFirst && renderChoice()}
                <Image style={styles.image} source={require('../../assets/images/dp.jpg')}/>
                <Text style={{color:'white',fontSize:22,position:'absolute',top:80,left:40,fontFamily:'poppins',fontWeight:'bold',zIndex:3}}>{item.name}</Text>
                <Text style={{color:'#fff',fontSize:14,position:'absolute',top:110,left:60,fontWeight:'400'}}>{item.designation}</Text>
                <Text style={{color:'#fff',fontSize:14,position:'absolute',top:150,left:40,fontWeight:'400'}}>{item.city}{" ,"}{item.country}</Text>
                {/* </ImageBackground> */}
                <View>
                <Text style={{color:'#fff',fontSize:14,fontWeight:'bold',marginTop:10,marginHorizontal:10}}>{item.quote}</Text>
                <Text style={{color:'dodgerblue',fontSize:20,fontWeight:'bold',marginTop:20,marginHorizontal:10,marginBottom:20}}>What I'm here for</Text>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{height:100,width:100,borderRadius:50,backgroundColor:'#012437',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'grey',fontSize:16,fontWeight:'bold',width:80}}>Hire Employees</Text>
                    </View>
                    <View style={{height:100,width:100,borderRadius:50,backgroundColor:'#012437',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'grey',fontSize:16,fontWeight:'bold',width:80}}>Hire Mentors</Text>
                    </View>
                    <View style={{height:100,width:100,borderRadius:50,backgroundColor:'#012437',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'grey',fontSize:16,fontWeight:'bold',width:80}}>Find Investors</Text>
                    </View>
                </View>
                </View>
                {/* </Animated.View> */}
                
                </Animated.View>
                // </Animated.View>
            )
        //</View>
    }

    const PremiumTab=()=>{
        return (
            <View style={{width:Dimensions.get('window').width/1.1,padding:20,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
        <Text style={styles.heading}>Buy Premium to connect with people who are interested in your profile.</Text>
        <Text style={{color:'#fff',marginTop:20,fontSize:16,fontWeight:'bold'}}>Many people viewed your profile</Text>
        <View style={{display:'flex',flexDirection:'row',paddingLeft:180,marginVertical:20,alignContent:'center',alignItems:'center'}}>
            <View style={{borderWidth:2,borderColor:'dodgerblue',width:180,height:180,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                <Image style={{width:100,height:100}} source={require('../../assets/images/MentorCard.png')}/>
                <Text style={{color:'grey'}}>Alice</Text>
            </View>
            <Image style={{width:250,height:100}} source={require('../../assets/images/Rectangleimg.png')}/>
        </View>
        <Text style={{color:'grey',marginLeft:40}}>Explore more options with our premium service.</Text>
        <View style={styles.button}>
             <Image style={{marginRight:40}} source={require('../../assets/images/badge.png')}/>
            <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Buy premium</Text>
        </View>
    </View>
        );
    }
    return (
        // <FlatList
        //     data={demoData}
        //     horizontal={true}
        //     showsHorizontalScrollIndicator={false}
        //     keyExtractor={item=>item.id.toString()}
        //     renderItem={renderCard}
        // />
        <IndividualHeaderLayout>
        {demoData.length==0 && <PremiumTab/>}
            
        {!finish && demoData.length>0 ?<View style={{flex:1}}>
        {
            demoData.map((item,index)=>{
                //console.log(item+":"+index);
                const isFirst=index===0;
                 return <RenderCard item={item} index={index} key={item.id.toString()} isFirst={isFirst} titleSign={titleSign}/>
            }).reverse()
        }</View>
         :<PremiumTab/>}
        
        </IndividualHeaderLayout>
    );
}

const styles = StyleSheet.create({
    card:{
        // elevation:5,
        // zIndex:1,
        position:'absolute',
        bottom:-70,
        width:Dimensions.get('window').width/1.15,
        height:Dimensions.get('window').height/1.20,
        marginHorizontal:35,
        marginVertical:20,
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,      
        padding:2,
        borderWidth:2,
        borderColor:'dodgerblue'
    },
   image:{
    width:Dimensions.get('window').width/1.17,
    height:Dimensions.get('window').height/2.5,
    borderTopRightRadius:50,
    borderTopLeftRadius:50,
    opacity:0.6,
    resizeMode:'cover'
    },
    heading:{
        color:'#0077B7',
        fontWeight:'bold',
        maxWidth:Dimensions.get('window').width/1.2,
        fontSize:22
    },
    button:{
        backgroundColor:'#0077B7',
        width:300,
        height:60,
        borderRadius:25,
        marginTop:35,
        marginLeft:50,
        alignItems:'center',
        alignContent:'center',
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:30
    },
    likeContainer:{
        left:45,
        top:Dimensions.get('window').height/14,
        position:'absolute',
        transform:[{rotate:'-30deg'}]
    },
    unlikeContainer:{
        right:45,
        top:Dimensions.get('window').height/14,
        position:'absolute',
        transform:[{rotate:'30deg'}]
    }
});

export {Vibe};
