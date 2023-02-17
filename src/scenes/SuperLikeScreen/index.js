import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { VibeHeader } from "../../Components/VibeHeader";

export default function SuperLikeScreen({ navigation }) {
  const [email, setEmail] = useState("");
 
  
  return (
    <SafeAreaView style={styles.container}>
        <VibeHeader/>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  like:{
    color:"#fff"
  }
 

});
