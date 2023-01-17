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
          `Hey there click here to register on tradingtube with my referal code URL https://registration.tradingtube.co/?${user ? user.referal_code:""}`,
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
<Text style={styles.TxtClr}>Plans</Text>

    </View>
   

<View style={GlobalStyles.HistoryCard}>
    <ScrollView
    showsVerticalScrollIndicator={false}
    >

<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>1: </Text>If you refer someone they will be considered as 1st link and you will get 5% of their income.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>2: </Text>If your refered person refer someone they will be considered as 2nd Link and you will get 2% of their Income.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>3: </Text>You will only get comission from your 1st link and 2nd link no further links will be valuable for you.</Text>

<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>4: </Text>Please take note that you will start earning comission from your refered links after you reach Level 1</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>5: </Text>Once total of your 10 refers invest in any package your level 1 will be unlocked and you will get <Text style={{color:Colors.PrimaryColor}}>3,000 Rs</Text> as reward.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>6: </Text>Once total of your 20 refers invest in any package your level 2 will be unlocked and you will get <Text style={{color:Colors.PrimaryColor}}>5,000 Rs</Text> as reward.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>7: </Text>Once total of your 30 refers invest in any package your level 3 will be unlocked and you will get <Text style={{color:Colors.PrimaryColor}}>8,000 Rs</Text> as reward.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>8: </Text>Once total of your 50 refers invest in any package your level 4 will be unlocked and you will get <Text style={{color:Colors.PrimaryColor}}>14,000 Rs</Text> as reward.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>9: </Text>Once total of your 80 refers invest in any package your level 5 will be unlocked and you will get <Text style={{color:Colors.PrimaryColor}}>20,000 Rs</Text> as reward.</Text>



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

