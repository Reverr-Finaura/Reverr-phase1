import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../../../Components';
import {AppColors} from '../../../utils';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../../../utils/Theme';
// import { black } from 'react-native-paper/lib/typescript/styles/colors';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const OpenBook = props => {
  const bookData = props.route.params.BookData;
  const moduleNumber = props.route.params.moduleNumber;
  const pagesRef = useRef();
  const [currIndex, setCurrIndex] = useState(0);
  const [progress, setProgress] = useState('10%');
  const [checkedAnswer, setCheckedAnswer] = useState(false);
  const [acolor, setacolor] = useState('white');
  const [bcolor, setbcolor] = useState('white');
  const [ccolor, setccolor] = useState('white');
  const [dcolor, setdcolor] = useState('white');

  const checkans = idx => {
    console.log(idx, 'sdhsjhdjh');
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
  };

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
  console.log(moduleNumber, 'bookData');

  const IntroScreen = ({item}) => {
    return (
      <View style={{justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 18, marginTop: '30%'}}>
          MODULE {moduleNumber}
        </Text>
        <Text
          style={{
            marginTop: '5%',
            fontWeight: 'bold',
            fontSize: 25,
            color: '#000C12',
            textAlign: 'center',
          }}>
          {item.heading}
        </Text>
        <Image
          source={{uri: item.image}}
          style={{width: Width / 1.1, height: Height / 4, marginTop: '45%'}}
        />
      </View>
    );
  };
  const TextIMGScreen = ({item}) => {
    return (
      <View style={{justifyContent: 'center'}}>
        <Text
          style={{
            marginTop: '5%',
            color: '#000C12',
            textAlign: 'left',
            fontSize: 16,
          }}>
          {item.text}
        </Text>
        <Image
          source={{uri: item.image}}
          style={{
            width: Width / 1.7,
            height: Height / 3.1,
            marginTop: '40%',
            alignSelf: 'center',
          }}
        />
      </View>
    );
  };
  const QuizScreen = ({item}) => {
    return (
      <View
        style={{
          height: '90%',
          width: '100%',
          backgroundColor: '#672DE1',
          borderRadius: 20,
        }}>
        <View
          style={{
            backgroundColor: 'yellow',
            height: 100,
            width: 100,
            borderRadius: 50,
            opacity: 0.7,
            position: 'absolute',
            top: -50,
            left: -50,
          }}></View>
        <View
          style={{
            backgroundColor: 'yellow',
            height: 300,
            width: 300,
            borderRadius: 200,
            opacity: 0.7,
            position: 'absolute',
            top: 150,
            left: -190,
          }}></View>
        <View
          style={{
            backgroundColor: 'yellow',
            height: 150,
            width: 150,
            borderRadius: 200,
            opacity: 0.7,
            position: 'absolute',
            top: 80,
            right: -120,
          }}></View>
        <View
          style={{
            backgroundColor: 'yellow',
            height: 200,
            width: 200,
            borderRadius: 200,
            opacity: 0.7,
            position: 'absolute',
            bottom: -190,
            right: -100,
          }}></View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 32,
            color: AppColors.FontsColor,
            fontWeight: 'bold',
          }}>
          QUIZ TIME!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: AppColors.FontsColor,
            marginTop: '5%',
          }}>
          {item.question}
        </Text>
        <View style={{marginTop: '10%'}}>
          {item.options?.map((opt, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: 'black',
                borderRadius: 10,
                marginVertical: '3%',
                paddingHorizontal: '5%',
                zIndex: 50,
                paddingVertical: '5%',
              }}>
              <Text style={{color: AppColors.FontsColor, textAlign: 'left'}}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* <Text
          style={{
            color: AppColors.FontsColor,
            textTransform: 'uppercase',
            fontWeight: 'bold',
            marginTop:'15%'
          }}>
          ANS:{item.ans}
        </Text> */}
      </View>
    );
  };

  const HeadTextImgScreen = ({item}) => {
    return (
      <View>
        <Text
          style={{
            textAlign: 'left',
            color: AppColors.primarycolor,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          {item.heading}
        </Text>
        <Text
          style={{
            textAlign: 'left',
            color: AppColors.primarycolor,
            marginTop: '7%',
          }}>
          {item.text}
        </Text>
        <Image
          source={{uri: item.image}}
          style={{
            width: Width / 1.7,
            height: Height / 3.1,
            marginTop: '45%',
            alignSelf: 'center',
          }}
        />
      </View>
    );
  };

  const HeadTextImgPointsScreen = ({item}) => {
    return (
      <View>
        <Text
          style={{
            textAlign: 'center',
            color: AppColors.primarycolor,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          {item.heading}
        </Text>
        <Text
          style={{
            textAlign: 'left',
            color: AppColors.primarycolor,
            marginTop: '7%',
          }}>
          {item.text}
        </Text>
        <View style={{marginTop: '3%'}}>
          <Text
            style={{
              color: AppColors.primarycolor,
              fontWeight: 'bold',
              marginBottom: '3%',
            }}>
            Ask :
          </Text>
          {item.points?.map((pt, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: '4%',
              }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: AppColors.primarycolor,
                  borderRadius: 10,
                  marginHorizontal: '3%',
                }}
              />
              <Text
                style={{marginVertical: '1%', color: AppColors.primarycolor}}>
                {pt}
              </Text>
            </View>
          ))}
        </View>

        {item.image != '' && (
          <Image
            source={{uri: item.image}}
            style={{
              width: Width / 2.5,
              height: Height / 3.5,
              marginTop: '15%',
              alignSelf: 'center',
            }}
          />
        )}
      </View>
    );
  };

  const HeadSubtextImgScreen = ({item}) => {
    return (
      <View style={{}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: AppColors.primarycolor,
          }}>
          {item.heading}
        </Text>

        <Text
          style={{
            textAlign: 'left',
            marginVertical: '3%',
            color: AppColors.primarycolor,
          }}>
          {item.text}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 17,
            fontWeight: '500',
            color: AppColors.primarycolor,
            marginTop: '3%',
          }}>
          {item.subheading}
        </Text>
        <Text
          style={{
            textAlign: 'left',
            marginVertical: '6%',
            fontSize: 12,
            color: AppColors.primarycolor,
          }}>
          {item.sub_text}
        </Text>
        <Image
          source={{uri: item.image}}
          style={{
            width: Width / 1.25,
            height: Height / 3.5,
            marginTop: '15%',
            alignSelf: 'center',
          }}
        />
      </View>
    );
  };
  const HeadSubtextScreen = ({item}) => {
    return (
      <View style={{}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: AppColors.primarycolor,
          }}>
          {item.heading}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 17,
            fontWeight: '500',
            color: AppColors.primarycolor,
            marginTop: '3%',
          }}>
          {item.subheading}
        </Text>
        <Text
          style={{
            textAlign: 'left',
            marginVertical: '3%',
            color: AppColors.primarycolor,
          }}>
          {item.text}
        </Text>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 12,
            color: AppColors.primarycolor,
          }}>
          {item.sub_text}
        </Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#1B1D8B', Theme.backgroundColor]}
      style={styles.screen}>
      <BackButton IconSize={30} />
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
                <View style={[styles.overlay]}>
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
                <View
                  style={[
                    styles.page,
                    {
                      backgroundColor:
                        item.type == 'quiz' ? '#672DE1' : 'white',
                      borderRadius: 20,
                      overflow: 'hidden',
                      height:
                        item.type == 'quiz' ? Height / 1.25 : Height / 1.2,
                    },
                  ]}>
                  {item.type == 'intro' && <IntroScreen item={item} />}
                  {item.type == 'textimg' && <TextIMGScreen item={item} />}
                  {item.type == 'quiz' && <QuizScreen item={item} />}
                  {item.type == 'headtextimgpoints' && (
                    <HeadTextImgPointsScreen item={item} />
                  )}
                  {item.type == 'headtextimg' && (
                    <HeadTextImgScreen item={item} />
                  )}
                  {item.type == 'headsubtextimg' && (
                    <HeadSubtextImgScreen item={item} />
                  )}
                  {item.type == 'headsubtext' && (
                    <HeadSubtextScreen item={item} />
                  )}
                  {/* {item.type == 'TEXT' ? (
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
                  )} */}
                </View>
              </View>
            );
          }}
        />
      )}
      <View style={styles.StatusContainer}>
        {bookData[currIndex].type == 'quiz' &&
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
    </LinearGradient>
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
    height: Height / 1.2,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  page: {
    backgroundColor: 'red',
    width: Width / 1.05,
    height: Height / 1.2,
    paddingHorizontal: '5%',
    paddingVertical: '9%',
    borderRadius: 20,
  },
  StatusContainer: {
    alignItems: 'center',
    paddingHorizontal: '6%',
    marginVertical: '3%',
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
    color: 'black',
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
