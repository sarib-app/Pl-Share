import React, { useEffect, useState } from 'react';
import {

  Text,
  Image,
  View,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
Share
 
} from 'react-native';
import styles from './Styles';


import { useNavigation } from '@react-navigation/native';

import Colors from '../GlobalStyles/Color';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import filterIcon from '../../assets/icons/filter.png';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import getAsync from '../GetAsynData/getAsync';
import AsyncStorage from '@react-native-async-storage/async-storage';
function SharePlans() {
    const navigation = useNavigation()
const asyncdata = getAsync()

const [user,setUser]=useState()
useEffect(()=>{
  getAsyncData()
  },[])


  async function getAsyncData () {
    const user = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    let userParsed=JSON.parse(user) 
    if(token){
  setUser(userParsed)
console.log(userParsed)  
  
    }
  }



const onShare = async () => {

    try {
      const result = await Share.share({
        message:
          `Hey there click here to register on PLSHARE with my referal code URL https://registration.plshare.com/?${user ? user.referal_code:""}`,
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared

        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed

      }
    } catch (error) {
      alert(error.message);
    }
  };











function LowerCart(){



    return(
        <View style={styles.LowerCart}>
    <View style={styles.InnerlowCart}>
<Text style={styles.TxtClr}>Types of Bonus & Details</Text>

    </View>
   

<View style={GlobalStyles.HistoryCard}>
    <ScrollView
    showsVerticalScrollIndicator={false}
    >

<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>1: </Text>Direct Bonus          5%</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>2: </Text>Network Bonus is earned on the income percentage of your refers
</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>3: </Text>Level 1                   5%.</Text>

<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>4: </Text>Level 2                   3%</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>5: </Text>Level 3                   2%</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>6: </Text>Level 4                   2%</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>7: </Text>Level 5                   1%</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>8: </Text>Level 6                   1%</Text>



</ScrollView>
 

</View>
</View>
    )
}


  return (
    <View style={styles.Container}>  
<Text style={styles.Text}>Share Plans</Text>


<Text style={{color:Colors.placeHolder,marginLeft:15}}>Your Referal Code</Text>
<Text style={[styles.Text,{marginTop:5}]}>{user ? user.referal_code:""}</Text>
<Text 
onPress={()=> onShare()}

style={{color:Colors.PrimaryColor,fontWeight:'600',marginLeft:15,marginTop:-10}}>Click here to invite your friend</Text>

<LowerCart />

</View>
  )
}
export default SharePlans;

