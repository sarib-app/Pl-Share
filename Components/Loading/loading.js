import React, { useState } from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
TouchableOpacity,

 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Colors from '../GlobalStyles/Color';

function Loading() {




const navigation = useNavigation()






  return (
    <SafeAreaView style={styles.Container}>

<Text style={{color:Colors.FontColorI,fontSize:18,fontWeight:'bold'}}>Loading....</Text>


    </SafeAreaView>
  )
}
export default Loading;

