import React, { useState } from 'react';
import {
  Text,
  Image,
  View,
ScrollView,
Pressable,
ImageBackground
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import BackBtn from '../GlobalStyles/BackButton';
import HelpCenterIcon from '../../assets/icons/helpCenter.png'
import liveChat from '../../assets/icons/liveChat.png'
import Colors from '../GlobalStyles/Color';
function Decider() {
const navigation = useNavigation()





return (
    <SafeAreaView style={styles.Container}>
<BackBtn/>
<Text style={styles.HeaderText}>
    Options
</Text>

<Pressable 
onPress={()=> navigation.navigate("Help")}
style={styles.OptionBox}>
  <Image
  source={HelpCenterIcon}
  style={{width:100,height:100,tintColor:Colors.FontColorI}}
  />
    <Text style={styles.HeaderText}>
  Help Center</Text>
</Pressable>


<Pressable 
onPress={()=> navigation.navigate("LiveChat")}

style={styles.OptionBox}>
<Image
  source={liveChat}
  style={{width:100,height:100,tintColor:Colors.FontColorI}}
  />
  <Text style={styles.HeaderText}>
  Live Chat</Text>
</Pressable>


    </SafeAreaView>
  )
}
export default Decider;

