import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';

const DropDown = ({title, placeholder, selected, setSelected,array,error,setError}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() =>{
          setOpen(!open)
          setError(false)
        }}
        activeOpacity={0.6}
        style={[styles.button,{borderWidth:error?2:0,borderColor:error?'red':AppColors.FontsColor}]}>
        {selected == '' ? <Text>{placeholder}</Text> : <Text style={{color:AppColors.primarycolor, fontFamily:'Poppins-SemiBold',}}>{selected}</Text>}
        <Icon name="chevron-down-outline" size={20} />
      </TouchableOpacity>
      {open && (
        <View
          style={{
            top:'105%',
            zIndex:20,
            backgroundColor: 'rgba(1, 1, 1, 1)',
            width: '35%',
            alignSelf: 'flex-end',
            overflow:'hidden',
            borderRadius:5,
            position:'absolute'
          }}>
          {array?.map((item, index) => (
            <TouchableOpacity
              style={{
                paddingVertical: '6%',
                paddingLeft:'8%',
                backgroundColor: selected === item ? AppColors.BtnClr:'rgba(1, 1, 1, 0)',
              }}
              onPress={()=>{
                setOpen(false)
                setSelected(item)
              }}
              key={index}>
              <Text style={{color: selected!=item?AppColors.BtnClr:AppColors.primarycolor}}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '3%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.FontsColor,
    paddingHorizontal: '3%',
    paddingVertical: '2.6%',
    borderRadius: 7,
  },
  title: {
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Regular',
    marginVertical: '3%',
    fontSize:16
  },
});

export {DropDown};
