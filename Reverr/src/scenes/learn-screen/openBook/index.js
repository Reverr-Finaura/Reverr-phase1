import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../../../components';
import {AppColors} from '../../../utils';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const OpenBook = props => {
  const bookData = props.route.params.BookData;
  const pagesRef = useRef();
  const [currIndex, setCurrIndex] = useState(0);
  const [progress, setProgress] = useState('10%');
  const [checkedAnswer, setCheckedAnswer] = useState(false);
  const [acolor, setacolor] = useState('white');
  const [bcolor, setbcolor] = useState('white');
  const [ccolor, setccolor] = useState('white');
  const [dcolor, setdcolor] = useState('white');
  /* 
    const checkans = idx => {
      if (idx == 0)
        bookData[currIndex].ans == 0 ? setacolor('green') : setacolor('red');
      if (idx == 1)
        bookData[currIndex].ans == 1 ? setbcolor('green') : setbcolor('red');
      if (idx == 2)
        bookData[currIndex].ans == 2 ? setccolor('green') : setccolor('red');
      if (idx == 3)
        bookData[currIndex].ans == 3 ? setdcolor('green') : setdcolor('red');
    };
  
    const resetans = () => {
      setacolor('white');
      setbcolor('white');
      setccolor('white');
      setdcolor('white');
    }; */

  const Next = index => {
    setCurrIndex(index + 1);
    setProgress(((currIndex + 2) / bookData.length) * 100 + '%');
    pagesRef.current.scrollToIndex({index: index + 1});
    resetans();
  };
  const Preious = index => {
    setCurrIndex(index - 1);
    setProgress((currIndex / bookData.length) * 100 + '%');
    pagesRef.current.scrollToIndex({index: index - 1});
    resetans();
  };
  const navigation = useNavigation();

  useEffect(() => {}, [currIndex]);

  return (
    <View style={styles.screen}>
      <BackButton
        IconSize={30}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {bookData && bookData.length > 0 && (
        <FlatList
          data={bookData}
          horizontal
          ref={pagesRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={({item, index}) => {
            return (
              <View style={styles.pageContainer}>
                <View style={styles.overlay}>
                  <TouchableOpacity
                    onPress={() => {
                      if (index > 0) {
                        Preious(index);
                        setCheckedAnswer(false);
                      }
                    }}
                    style={styles.previous}></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (index < bookData.length - 1) {
                        Next(index);
                        setCheckedAnswer(false);
                      }
                    }}
                    style={styles.next}></TouchableOpacity>
                </View>
                <View style={styles.page}>
                  {item.type == 'TEXT' ? (
                    <>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.body}>{item.body}</Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.question}>{item.question}</Text>
                      <TouchableOpacity style={{marginBottom: '3%'}}>
                        <Text
                          style={{fontSize: 16, textTransform: 'uppercase'}}>
                          A. {item.option[0]}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{marginBottom: '3%'}}>
                        <Text
                          style={{fontSize: 16, textTransform: 'uppercase'}}>
                          B. {item.option[1]}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{marginBottom: '3%'}}>
                        <Text
                          style={{fontSize: 16, textTransform: 'uppercase'}}>
                          C. {item.option[2]}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text
                          style={{fontSize: 16, textTransform: 'uppercase'}}>
                          D. {item.option[3]}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            );
          }}
        />
      )}
      <View style={styles.StatusContainer}>
        {bookData[currIndex].type == 'QUIZ' &&
          (checkedAnswer ? (
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: '5%',
              }}>
              <TouchableOpacity style={{marginEnd: '10%', marginStart: '10%'}}>
                <Text
                  style={{
                    color: bookData[currIndex].ans == 0 ? `green` : 'red',
                    fontSize: 20,
                  }}>
                  A.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginEnd: '10%'}}>
                <Text
                  style={{
                    color: bookData[currIndex].ans == 1 ? `green` : 'red',
                    fontSize: 20,
                  }}>
                  B.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginEnd: '10%'}}>
                <Text
                  style={{
                    color: bookData[currIndex].ans == 2 ? `green` : 'red',
                    fontSize: 20,
                  }}>
                  C.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginEnd: '10%'}}>
                <Text
                  style={{
                    color: bookData[currIndex].ans == 3 ? `green` : 'red',
                    fontSize: 20,
                  }}>
                  D.
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: '5%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  checkans(0);
                }}
                style={{
                  marginEnd: '10%',
                  marginStart: '10%',
                  backgroundColor: acolor,
                  paddingRight: '2.5%',
                  paddingLeft: '2.5%',
                  borderRadius: 8,
                }}>
                <Text style={{color: 'black', fontSize: 20}}>A</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  checkans(1);
                }}
                style={{
                  marginEnd: '10%',
                  backgroundColor: bcolor,
                  paddingRight: '2.5%',
                  paddingLeft: '2.5%',
                  borderRadius: 8,
                }}>
                <Text style={{color: 'black', fontSize: 20}}>B</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  checkans(2);
                }}
                style={{
                  marginEnd: '10%',
                  backgroundColor: ccolor,
                  paddingRight: '2.5%',
                  paddingLeft: '2.5%',
                  borderRadius: 8,
                }}>
                <Text style={{color: 'black', fontSize: 20}}>C</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  checkans(3);
                }}
                style={{
                  marginEnd: '10%',
                  backgroundColor: dcolor,
                  paddingRight: '2.5%',
                  paddingLeft: '2.5%',
                  borderRadius: 8,
                }}>
                <Text style={{color: 'black', fontSize: 20}}>D</Text>
              </TouchableOpacity>
            </View>
          ))}
        <Text>{currIndex}</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.complete, {width: progress}]}></View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    height: Height,
    flexDirection: 'row',
    zIndex: 7,
    width: Width,
    position: 'absolute',
  },
  previous: {
    height: Height,
    width: Width / 2,
  },
  next: {
    height: Height,
    width: Width / 2,
  },
  pageContainer: {
    width: Width,
    height: Height / 1.25,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  page: {
    backgroundColor: AppColors.BtnClr,
    width: Width / 1.05,
    height: Height / 1.3,
    paddingHorizontal: '5%',
    paddingVertical: '9%',
    borderRadius: 20,
  },
  StatusContainer: {
    paddingBottom: '5%',
    alignItems: 'center',
    paddingHorizontal: '6%',
  },
  progressContainer: {
    height: 10,
    width: '100%',
    borderRadius: 20,
    backgroundColor: AppColors.BtnClr,
  },
  complete: {
    height: '100%',
    backgroundColor: AppColors.ActiveColor,
    borderRadius: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: AppColors.primarycolor,
    fontSize: 22,
    alignSelf: 'center',
  },
  body: {
    marginTop: '10%',
    fontFamily: 'Poppins-Regular',
    color: AppColors.infoFonts,
    paddingHorizontal: '4%',
    fontSize: 16,
    alignSelf: 'center',
  },
  question: {
    fontFamily: 'Poppins-Bold',
    color: AppColors.primarycolor,
    fontSize: 22,
  },
});
export {OpenBook};
