import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  ActivityIndicator,
  Button,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import Swiper from 'react-native-deck-swiper'

// import { useNavigation } from '@react-navigation/native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {CustomPopup, IndividualHeaderLayout} from '../../Components';
import {Choice} from '../../Components';
import {AppColors} from '../../utils';
import {
  Load_Card,
  matchedpeople,
  passedUser,
  Passed_User,
  RemoveTopCard,
} from '../../Redux/actions';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const MoreInfo = (card)=>{
  const [id, setId] = useState(-1);

  if(id==card.id){
  return (

      <TouchableOpacity onPress={()=>setId(-1)}>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
        <Text> MORE INFO</Text>
      </TouchableOpacity>
  )
  }else{
    return(
      <TouchableOpacity onPress={()=>setId(card.id)}>
        <Text> see more</Text>
      </TouchableOpacity>
      
    )
  }
}

const Vibe = () => {
  const navigation = useNavigation();

  const [moreInfo,setMoreInfo] = useState(-1);
  const [bool, setBool] = useState(false);
  const [allswiped, setAllswiped] = useState(false);

  var [cards,setCards]  = useState([{id:1,text:"DO"}, {id:2,text:'MORE'}, {id:3,text:'OF'}, {id:4,text:'WHAT'},
  {id:5,text:'MAKES'}, {id:6,text:'YOU'}, {id:7,text:'HAPPY'}]); 

  const swipeLeft=(idx)=>{
    var currCard = cards[idx];

    console.log(currCard.text +" got swipped left");
  }

  const swipeRight=(idx)=>{
    var currCard = cards[idx];

    console.log(currCard.text +" got swipped left");
  }

  const swipedAll = ()=>{
    console.log("swiped all")
    setAllswiped(true);
  }
  return(
    <View style={styles.container}>
      {allswiped?
      <View>
        <Text>Wait 12:00 hrs</Text>
      </View>:
      <Swiper
      cards={cards}
      renderCard={(card) => {
          return (
            
              <View style={styles.card}>
                <ScrollView style={{flex:1, display:"flex"}}>
                    <Text style={styles.text}>{card.text}</Text>
                  <MoreInfo card={card}/>
                </ScrollView>
              </View>
            
          )
      }}
      onSwiped={(cardIndex) => {console.log(cardIndex)}}
      onSwipedLeft={(idx)=> swipeLeft(idx)}
      onSwipedRight={(idx)=> swipeRight(idx)}
      onSwipedAll={() => swipedAll()}
      cardIndex={0}
      verticalSwipe={false}
      backgroundColor={'#4FD0E9'}
      stackSize= {3}>
      <Button
          onPress={() => {console.log('oulala')}}
          title="Press me">
          You can press me
      </Button>
    </Swiper>

      }
    
  </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

export {Vibe};
