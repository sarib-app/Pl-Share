import React, { useState, useEffect } from 'react';
import {
  Text,
  Image,
  View,
ScrollView,
Pressable,
ImageBackground,
Alert
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Colors from '../GlobalStyles/Color';
import TipsIcon from '../../assets/icons/tips.png'
import { MyTeamData } from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import credited from '../../assets/icons/credited.png'
import Profile from '../../assets/icons/5.png'

import BackBtn from '../GlobalStyles/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';

function LevelRewards() {



const navigation = useNavigation()

  const [firstTeamList,setFirstTeamList]=useState([])
  const [secondTeamList,setSecondTeam]=useState([])
  const [selected,setIsSelected]=useState(1)
  
  const data = selected === 1 ?firstTeamList : secondTeamList



useEffect(()=>{

  getAsyncData()

  
  },[])



  
  async function getAsyncData () {
    const user = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    let userParsed=JSON.parse(user) 
    if(token){
  
getRewards(userParsed.id)
  
  
    }
  }










function getRewards(user_id){

  var formdata = new FormData();

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  formdata.append("user_id", user_id);
  console.log(user_id)

  fetch(`${BaseUrl}fetch_user_level_reward`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      if(result.status === "200"){
        setFirstTeamList(result.data)
      }
      console.log(result)})
    .catch(error => console.log('error', error));

}





function requestReward(id){
  var formdata = new FormData();
formdata.append("id", id);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}request_level_reward`, requestOptions)
  .then(response => response.json())
  .then(result => {
    
    if(result.status === "200"){
      Alert.alert("Success","Request Sent Successfully!")
      navigation.goBack()
    }
    console.log(result)})
  .catch(error => console.log('error', error));
}





function MyTeamList({item}){
  const [showDetail,setShowDetail]=useState(false)
  function onHideModal(){
    setShowDetail((p)=>!p)
  }
  

return(
    <View style={styles.TrickContainer}>
  
  
    <View style={{flexDirection:'row',alignItems:"center"}}>
    <View style={styles.IconWrapper}>
    
    <Image source={{uri:"https://img.icons8.com/glyph-neue/64/null/packaging.png"}} style={{width:30,height:30,tintColor:Colors.PrimaryColor,margin:5}}/>

    
    </View>
    
    
    
    <View style={styles.InnerTricks}>
    <Text style={styles.TextStyle}>Congratulations</Text>
    <Text style={styles.TextStyle}>You reached level {item.level}</Text>
    <Text style={styles.TextStyle}>You won {item.reward_price} free reward</Text>

    </View>
    
    
    </View>
    
    {
      item.is_requested === "0"?    <Text 
      onPress={()=> requestReward(item.id)}
      
      style={[styles.TransactionText,{color:Colors.PrimaryColor}]}>Request</Text>
   :

   item.is_got ==="0"?

   <Text 
   
   style={[styles.TransactionText,{color:Colors.PrimaryColor}]}>Requested</Text>
    :
    <Text 
    
    style={[styles.TransactionText,{color:Colors.PrimaryColor}]}>Recieved</Text>

    }
   
   

    
    </View>
)
}




return (
    <SafeAreaView style={styles.Container}>
<BackBtn/>
<Text style={styles.HeaderText}>
    Your Rewards
</Text>

{/* <View style={styles.TrickContainer}>
<Text 
onPress={()=> setIsSelected(1)}
style={[styles.TextStyle,{color:selected===1 ? Colors.FontColorI:Colors.bgIII}]}>1st Refer</Text>
<Text
onPress={()=> setIsSelected(2)}


style={[styles.TextStyle,{color:selected===2 ? Colors.FontColorI:Colors.bgIII}]}>2nd Refer</Text>

</View> */}

<FlatList 
data={data}
renderItem={({item})=>
<MyTeamList  item={item} 
/>

}
/>
<View
style={{height:20,width:50}}
></View>


    </SafeAreaView>
  )
}
export default LevelRewards;

