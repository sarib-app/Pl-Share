import React, { useState } from 'react';
import {
  
    Pressable,
  Text,
  Image,
  View,
  

} from 'react-native';
import GlobalStyles from './GlobalStyles';
import Colors from './Color';
import { useNavigation } from '@react-navigation/native';
import gobackIcon from '../../assets/icons/gobackIcon.png'

function BackBtn(){


const navigation = useNavigation()





  return(
    <Pressable
    onPress={()=> navigation.goBack()}
    
    style={{flexDirection:"row",marginTop:10,alignSelf:'flex-start',left:15,alignItems:'center'}}>
      <Image  source={gobackIcon}
      style={{width:12,height:15}}
      />
    <Text style={{color:Colors.PrimaryColor}}> Go Back</Text>
    </Pressable>



  )
}
export default BackBtn;

