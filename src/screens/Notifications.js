import React, { useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from "react-native";
import GradientHeader from "../Components/components/GradientHeader";
import NotificationCard from "../Components/components/NotificationCard";
import { notifications } from "../utils/sampledata";
import Theme from "../utils/Theme";


function Notifications({navigation}){

  const [selectedText, setSelectedText] = useState('all'); 

  const handleTextClick = (text) => {
    switch (text) {
      case 'all':
        setSelectedText('all');
        break;
      case 'unread':
        setSelectedText('unread');
        break;
      case 'unanswered':
        setSelectedText('unanswered');
        break;
        default:
        setSelectedText('all');
    }
  };

  
    return (
      <View style={styles.container}>
        <GradientHeader />

        <ScrollView>
        <View style={{ padding: 25 }}>
          <Text style={styles.title}>Notifications</Text>

          <View style={styles.tabWrapper}>
            <TouchableOpacity
              style={[
                styles.activeStyle,
                {
                  borderBottomColor:
                    selectedText === "all"
                      ? Theme.primaryColor
                      : "rgba(5,5,5,0)",
                },
              ]}
              onPress={() => handleTextClick("all")}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: selectedText === "all" ? Theme.primaryColor : "#FFF",
                  },
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.activeStyle,
                {
                  borderBottomColor:
                    selectedText === "unread"
                      ? Theme.primaryColor
                      : "rgba(5,5,5,0)",
                },
              ]}
              onPress={() => handleTextClick("unread")}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      selectedText === "unread" ? Theme.primaryColor : "#FFF",
                  },
                ]}
              >
                Unread
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.activeStyle,
                {
                  borderBottomColor:
                    selectedText === "unanswered"
                      ? Theme.primaryColor
                      : "rgba(5,5,5,0)",
                },
              ]}
              onPress={() => handleTextClick("unanswered")}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      selectedText === "unanswered"
                        ? Theme.primaryColor
                        : "#FFF",
                  },
                ]}
              >
                Unanswered
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <FlatList
        data={notifications}
        renderItem={({item}) => <NotificationCard username={item.username} ago={item.ago} desc={item.desc} photo={item.photo} active={item.active} />}
        keyExtractor={item => item.id}
      /> */}

        {notifications.map((item) => {
          return (
            <NotificationCard
              key={item.id}
              username={item.username}
              ago={item.ago}
              desc={item.desc}
              photo={item.photo}
              active={item.active}
            />
          );
        })}
        </ScrollView>
      </View>
    );}
export default Notifications;

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
  },
  text: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    marginBottom:3
  },
  activeStyle: {
    borderBottomWidth: 2,
    marginRight: 15,
  },
});