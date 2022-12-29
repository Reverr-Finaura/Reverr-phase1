import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {State} from 'react-native-gesture-handler';
// import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

const PremiumPlans = () => {
  const navigate = useNavigation();

  const CardRef = useRef();
  const [ListIndex, setListIndex] = useState(0);
  const onViewRef = useRef(({changed}) => {
    setListIndex(changed[0].index);
  });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const PlanData = [
    {
      name: 'Monthly',
      id: 0,
      price: '499',
      text: 'unlimited swipes on vibe.',
    },
    {
      name: 'Quaterly',
      id: 1,
      price: '1299',
      text: 'unlimited swipes on vibe.',
    },
    {
      name: 'Yearly',
      id: 2,
      price: '4999',
      text: 'unlimited swipes on vibe.',
    },
  ];

  const getPriceHandler = price => {
    console.log(price);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigate.goBack();
          }}
          style={styles.backBtn}>
          <Image
            style={{
              width: 32,
              height: 32,
              marginTop: 10,
            }}
            source={require('../../assets/images/Back.png')}
          />
        </TouchableOpacity>
        <Image
          style={{
            width: 90,
            height: 50,
            marginTop: 10,
          }}
          source={require('../../assets/images/logo.png')}
        />
      </View>
      <View style={styles.container}>
        <View
          style={{
            marginTop: 15,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.containerHeading}>Premium Packages</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.description}>unlimited swipes on vibe.</Text>
        </View>

        <View
          style={{
            marginTop: 80,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* linear-gradient(202.17deg, rgba(0, 119, 183, 0.55) 3.78%, rgba(42, 114, 222, 0.1705) 38.41%, rgba(42, 114, 222, 0.55) 63.23%, rgba(0, 119, 183, 0) 114.61%); */}
          <FlatList
            ref={CardRef}
            numColumns={1}
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}
            data={PlanData}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <LinearGradient
                // key={index}
                colors={[
                  ' rgba(0, 119, 183, 0.55)',
                  ' rgba(42, 114, 222, 0.1705)',
                  'rgba(42, 114, 222, 0.55)',
                ]}
                locations={[0, 0, 0.6]}
                start={{x: 0, y: 0}}
                style={{
                  marginTop: 40,
                  zIndex: 10,
                  position: 'relative',

                  top: ListIndex === item.id ? -40 : 0,
                  width: 300,
                  borderRadius: 20,
                  marginHorizontal: 12,
                  height: 340,
                  borderWidth: 1,
                  borderColor: ListIndex === item.id ? '#fff' : 'transparent',
                }}>
                <View style={styles.planCard}>
                  <Text
                    style={{
                      marginTop: 20,
                      color: '#fff',
                      fontSize: 30,
                      fontWeight: '600',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      marginTop: 25,
                      color: '#fff',
                      fontSize: 38,
                      fontWeight: '600',
                    }}>
                    Rs.{item.price}
                  </Text>
                  <Text
                    style={{
                      marginTop: 22,
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: '600',
                    }}>
                    {item.text}
                  </Text>
                  <TouchableOpacity
                    onPress={() => getPriceHandler(item.price)}
                    style={{
                      marginTop: 50,
                      width: '60%',
                      alignItems: 'center',
                      borderRadius: 6,
                      backgroundColor: '#2A72DE',
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                    }}>
                    <Text
                      style={{fontSize: 20, color: '#fff', fontWeight: '600'}}>
                      Select
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            )}
          />
          {/* <View
            style={{
              marginTop: 35,
              width: Dimensions.get('window').width,
              paddingHorizontal: 30,
              paddingTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <TouchableOpacity
              //   onPress={() => {
              //     // navigate.navigate('premiumPlans');
              //   }}
              style={{
                borderRadius: 8,
                width: '100%',
                alignItems: 'center',
                backgroundColor: '#2A72DE',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <Text style={{color: '#ffffff', fontSize: 18}}> Get Premium</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PremiumPlans;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    width: '100%',
    position: 'relative',
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 10,
  },
  container: {
    height: '90%',
  },
  containerHeading: {
    fontSize: 23,
    // fontFamily: 'Poppins',
    color: '#2A72DE',
    fontWeight: '900',
  },
  description: {
    fontSize: 19,
    color: '#ffff',
  },
  planCard: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
