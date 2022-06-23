import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    Image,
    FlatList,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState,useEffect} from 'react';
  import { AppColors } from '../../utils';
  import { BackButton } from '../../Components';
  import {useNavigation} from '@react-navigation/native';
  import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
  import firestore from '@react-native-firebase/firestore';
  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;
  import  Icon2  from 'react-native-vector-icons/Ionicons';
  import {pin_post, pushComment,deleteComment } from '../../Redux/actions';
  const CommentsScreen = props => {
    //const postData = props?.route?.params?.postData;
    const state=useSelector(state=>state.UserReducer);
    const dispatch=useDispatch();
    const navigation = useNavigation();
    const [comment, setComment] = useState('');
    //console.log(state.pin_post.comments, 'pin_posts');
    
    const clickhandler=(item)=>{
        //dispatch(deleteComment(state.pin_post.id,state.pin_post,item.id));
    }

    const renderCard=({item})=>{
        //console.log("yes:"+item.commentedby.image);
        //var info=item.commentedby || state.user;
        //console.log(item.commentedby.name);
        return (
           <View style={styles.commentCard}>
            <View style={{display:'flex',flexDirection:'row'}}>
           <Image style={styles.dpsmall} source={{uri:item.commentedby.image || state.user.image}}/>
           <Text style={{color:'#fff',fontFamily:'Poppins-Regular',fontWeight:'bold',fontSize:17,marginRight:10}}>{item.commentedby.name || state.user.name}</Text>
           <View style={{marginLeft:180}}>
           <TouchableOpacity onPress={() => clickhandler(item)}>
                      <Icon2
                        name="ellipsis-vertical"
                        size={22}
                        color={AppColors.FontsColor}
                      />
                 </TouchableOpacity>
            </View>
           </View>
           <Text style={{color:'grey',fontFamily:'Poppins-Regular',fontSize:10,marginBottom:3,marginTop:0,marginLeft:45}}>{item.commentedby.designation || state.user.designation}</Text>
           <Text style={{color:"#fff",fontFamily:'Poppins-Regular'}}>{item.comment}</Text>
           
           </View> 
        )
    }
    const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
      
        return result;
      }
      
    const handleComment=()=>{
        var commentbody = {
            commentedby: firestore().collection('Users').doc(state.user.email),
            commentid: generateString(8),
            comment,
          };
        dispatch(pushComment(state.pin_post.id,state.pin_post,commentbody));
        setComment('');

    }
    return (
      <View style={styles.screen}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <BackButton
            IconSize={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.headerTitle}>Comments</Text>
        </View>
        <View
          style={{
            paddingHorizontal: '10%',
            paddingVertical: '3%',
            borderBottomColor: AppColors.BtnClr,
            borderBottomWidth: 2,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.dp} source={{uri: state.pin_post.postedby.image}} />
            <View style={{marginStart: '3%'}}>
              <Text style={styles.name}>{state.pin_post.postedby.name}</Text>
              <Text style={styles.company}>{state.pin_post.postedby.designation}</Text>
            </View>
          </View>
          <Text style={styles.postText}>{state.pin_post.text}</Text>
        </View>
        <View>
          {state.pin_post.comments.length>0 && <FlatList
            data={state.pin_post.comments}
            keyExtractor={item=>item.commentid.toString()}
            renderItem={renderCard}
          />}
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Write Your Comments " value={comment} onChangeText={(text)=>setComment(text)}/>
          <TouchableOpacity onPress={handleComment}>
            <Icon name="send" color={AppColors.ActiveColor} size={28} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: AppColors.primarycolor,
    },
    commentCard:{
        padding:5,
        width:Width,
        marginHorizontal:5,
        marginVertical:2,
        borderBottomWidth:1,
        borderBottomColor:'grey'
    },
    headerTitle: {
      color: AppColors.FontsColor,
      marginStart: '10%',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 22,
    },
    postText: {
      color: AppColors.FontsColor,
      fontFamily: 'Poppins-Regular',
      marginStart: '16%',
      marginTop: '3%',
    },
    dp: {
      height: Height / 14,
      width: Width / 7,
      borderRadius: 56,
    },
    dpsmall:{
        height: Height / 22,
      width: Width / 12,
      borderRadius: 56,
      marginRight:10
    },
    name: {
      color: AppColors.FontsColor,
      fontFamily: 'Poppins-Regular',
    },
    company: {
      color: AppColors.infoFonts,
      fontFamily: 'Poppins-Regular',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: AppColors.BtnClr,
      borderRadius: 9,
      bottom: 5,
      height: Height / 14,
      paddingHorizontal: '3%',
    },
    input: {
      width: '92%',
      height: '100%',
      color: AppColors.primarycolor,
      fontFamily: 'Poppins-Regular',
    },
  });
  export {CommentsScreen};
  