import React, { useState } from 'react';
import {
  Text,
  Image,
  View,
ScrollView,
Pressable,
ImageBackground
} from 'react-native';

import styles from '../Help/Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import BackBtn from '../GlobalStyles/BackButton';
import updateProfIcon from '../../assets/icons/updateProfIcon.png'
import lock from '../../assets/icons/lock.png'
import Colors from '../GlobalStyles/Color';
function DecideUpdate() {
const navigation = useNavigation()





return (
    <SafeAreaView style={styles.Container}>
<BackBtn/>
<Text style={styles.HeaderText}>
    Options
</Text>

<Pressable 
onPress={()=> navigation.navigate("UpdateProfile",{identifier:"profile"})}
style={styles.OptionBox}>
  <Image
  source={updateProfIcon}
  style={{width:100,height:70,tintColor:Colors.FontColorI}}
  />
    <Text style={styles.HeaderText}>
  Update Profile</Text>
</Pressable>


<Pressable 
onPress={()=> navigation.navigate("UpdateProfile",{identifier:"password"})}

style={styles.OptionBox}>
<Image
  source={lock}
  style={{width:70,height:70,tintColor:Colors.FontColorI}}
  />
  <Text style={styles.HeaderText}>
  Change Password</Text>
</Pressable>


    </SafeAreaView>
  )
}
export default DecideUpdate;
