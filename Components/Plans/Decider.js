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
import HelpCenterIcon from '../../assets/icons/TeamComission.png'
import plans from '../../assets/icons/plans.png'
import Colors from '../GlobalStyles/Color';
function PlanDecider() {
const navigation = useNavigation()





return (
    <SafeAreaView style={styles.Container}>
<BackBtn/>
<Text style={styles.HeaderText}>
    Options
</Text>

<Pressable 
onPress={()=> navigation.navigate("SharePlans")}
style={styles.OptionBox}>
  <Image
  source={HelpCenterIcon}
  style={{width:90,height:100,tintColor:Colors.FontColorI}}
  />
    <Text style={styles.HeaderText}>
  Share Plans</Text>
</Pressable>


<Pressable 
onPress={()=> navigation.navigate("InvestmentPlans")}

style={styles.OptionBox}>
<Image
  source={plans}
  style={{width:90,height:90,tintColor:Colors.FontColorI}}
  />
  <Text style={styles.HeaderText}>
  Investment Plans</Text>
</Pressable>


    </SafeAreaView>
  )
}
export default PlanDecider;

