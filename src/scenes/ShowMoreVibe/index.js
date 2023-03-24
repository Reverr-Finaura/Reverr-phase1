import { View, Text, Image, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton, IndividualHeaderLayout } from '../../Components';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColors } from '../../utils';

const ShowMoreVibe = () => {
  const [demoData, setDemoData] = useState([
    {
      id: '123',
      name: 'Jatin Khurana',
      designation: 'CEO and Fintech',
      country: 'India',
      city: 'Delhi',
      image: '../../assets/images/dp.png',
      quote:
        "Don't ship it. Don't settle for good enough. Do better work than you did yesterday. Get out of your comfort zone and give it your all",
    },
  ]);
  const [checkingdata, setcheckingdata] = useState({
    Education: 'MBA',
    Here_for: ['FIND INVESTORS', 'FIND MENTORS', 'FIND EMPLYOYEE'],
    How_To_Meet: ['At Coffee', ' Video Call', 'Local Cafee'],
    Industry: 'FINTECH',
    Previous_Designation: 'GOOGLE',
    Previous_Org: 'GOOGLE SWE',
    Previous_org_Duration: ['2'],
    Years_Of_Experience: ['4'],
  });
  const navigation = useNavigation();
  const { params } = useRoute();
  const { data } = params;
  return (
    <IndividualHeaderLayout>
      <View>{console.log('datata from show more', params)}</View>
      <ScrollView>
        <BackButton />
        <View>
          <View style={{ alignSelf: 'center' }}>
            {params.image ? (
              <Image
                style={{
                  width: 160,
                  alignSelf: 'center',
                  height: 160,
                  borderRadius: 100,
                }}
                source={{
                  uri: params.image,
                }}
              />
            ) : (
              <Image
                style={{
                  width: 160,
                  alignSelf: 'center',
                  height: 160,
                  borderRadius: 100,
                }}
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
                }}
              />
            )}
          </View>
          <View style={{ display: 'flex' }}>
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 22,
                  fontFamily: 'poppins',
                  fontWeight: 'bold',
                }}
              >
                {params?.name}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: '400',
                }}
              >
                {params?.designation || demoData[0].designation}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: '400',
                }}
              >
                {params?.city || demoData[0].city}
                {' ,'}
                {params?.country || demoData[0].country}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#0077B7',
                  fontFamily: 'Poppins',
                  fontSize: 18,
                  fontWeight: '700',
                  marginTop: 4,
                  marginLeft: 15,
                }}
              >
                About Me
              </Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginHorizontal: 10,
                }}
              >
                {params?.quote || demoData[0].quote}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#0077B7',
                fontFamily: 'Poppins',
                fontSize: 18,
                marginTop: 6,
                fontWeight: '700',
                marginLeft: 15,
              }}
            >
              What I am here for
            </Text>
            <View
              style={{
                marginTop: 8,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
              }}
            >
              {params?.Vibe_Data
                ? params?.Vibe_Data?.Here_for?.map(item => {
                  console.log(item);
                  return (
                    <View
                      style={{
                        boxShadow: '4px -5px 5px 0px #00000040 inset',
                        width: Dimensions.get('window').width / 4.3,
                        height: Dimensions.get('window').height / 7.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100 / 2,
                        borderWidth: 3,
                        borderColor: 'white',
                        backgroundColor: '#0077B7',
                        height: 80,
                        width: 80,
                      }}
                    >
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          fontFamily: 'Poppins',
                          fontSize: 1,
                          padding: 20,
                          fontWeight: '400',
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })
                : checkingdata?.Here_for?.map(item => {
                  console.log(item);
                  return (
                    <View
                      style={{
                        boxShadow: '4px -5px 5px 0px #00000040 inset',
                        width: Dimensions.get('window').width / 4.3,
                        height: Dimensions.get('window').height / 7.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100 / 2,
                        borderWidth: 3,
                        borderColor: 'white',
                        backgroundColor: '#0077B7',
                        height: 80,
                        width: 80,
                      }}
                    >
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          fontFamily: 'Poppins',
                          fontSize: 11,
                          padding: 5,
                          fontWeight: '500',
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
            </View>
          </View>

          <Text
            style={{
              color: '#0077B7',
              fontFamily: 'Poppins',
              fontSize: 18,
              fontWeight: '700',
              marginTop: 8,
              marginLeft: 15,
            }}
          >
            How can we meet
          </Text>
          <View
            style={{
              marginTop: 3,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            {params?.Vibe_Data
              ? params?.Vibe_Data?.How_To_Meet.map(params => {
                console.log(params);

                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignparamss: 'center',

                    }}
                  >
                    <Icon
                      name="check-circle"
                      color={AppColors.ActiveColor}
                      size={20}
                    />

                    <Text
                      style={{
                        marginLeft: 4,
                        color: 'white',
                        fontFamily: 'Poppins',
                        fontSize: 16,
                        fontWeight: '400',
                      }}
                    >
                      {params}
                    </Text>
                  </View>
                );
              })
              : checkingdata?.How_To_Meet.map(params => {
                console.log(params);
                if (params) {
                  if (params === 'At Coffee') {
                    var icon = 'coffee';
                  } else if (params === 'Video Call') {
                    var icon = 'tick';
                  } else if (params === 'Local Cafee') {
                    var icon = 'coffee';
                  } else {
                    var icon = 'check-circle';
                  }
                }
                console.log(icon);
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignparamss: 'center',
                    }}
                  >
                    <Icon
                      name={icon}
                      color={AppColors.ActiveColor}
                      size={20}
                    />

                    <Text
                      style={{
                        marginLeft: 4,
                        color: 'white',
                        fontFamily: 'Poppins',
                        fontSize: 16,
                        fontWeight: '400',
                      }}
                    >
                      {params}
                    </Text>
                  </View>
                );
              })}
          </View>
          <View
            style={{
              marginRight: 30,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginStart: 10
                }}
              >
                <Icon name="search" color={AppColors.ActiveColor} size={20} />
                <Text
                  style={{
                    color: '#8AB9FF',
                    fontFamily: 'Poppins',
                    fontSize: 16,
                    marginLeft: 4,
                    fontWeight: '500',
                    marginTop: 4,
                  }}
                >
                  What am I looking for{' '}
                </Text>
              </View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: '400',
                  marginTop: 1,
                }}
              >
                Mentor ship {''} Get Inspired{' '}
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignparamss: 'center',
                  alignSelf: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <Icon name="industry" color={AppColors.ActiveColor} size={20} />
                <Text
                  style={{
                    color: '#8AB9FF',
                    fontFamily: 'Poppins',
                    fontSize: 16,
                    fontWeight: '500',
                    marginTop: 4,
                    marginLeft: 4,
                  }}
                >
                  Past Experience
                </Text>
              </View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: '400',
                  marginTop: 1,
                }}
              >
                {checkingdata?.Previous_Designation}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginRight: 30,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignparamss: 'center',
                marginStart: 10,
                justifyContent: 'center',
              }}
            >
              <Icon name="industry" color={AppColors.ActiveColor} size={20} />
              <Text
                style={{
                  color: '#8AB9FF',
                  fontFamily: 'Poppins',
                  fontSize: 16,

                  marginLeft: 4,
                  fontWeight: '500',
                  marginTop: 4,
                }}
              >
                Previous Designation
              </Text>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontSize: 14,
                textAlign: 'center',
                fontWeight: '400',
                marginTop: 1,
              }}
            >
              {params?.Vibe_Data
                ? params?.Vibe_Data?.Previous_Org
                : checkingdata?.Previous_Org}
            </Text>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignparamss: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon
                name="check-circle"
                color={AppColors.ActiveColor}
                size={20}
              />
              <Text
                style={{
                  color: '#8AB9FF',
                  fontFamily: 'Poppins',
                  fontSize: 16,
                  fontWeight: '500',
                  marginTop: 4,
                  marginLeft: 4,
                }}
              >
                Prev. Experience
              </Text>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontSize: 14,
                textAlign: 'center',
                fontWeight: '400',
                marginTop: 1,
              }}
            >
              {params?.Vibe_Data
                ? params?.Vibe_Data?.Previous_org_Duration
                : checkingdata?.Previous_org_Duration}
            </Text>
          </View>
        </View>
      </ScrollView>
    </IndividualHeaderLayout>
  );
};

export { ShowMoreVibe };
