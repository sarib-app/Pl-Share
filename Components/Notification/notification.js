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
import notificationIcon from '../../assets/icons/notification.png'
import { MyTeamData } from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import credited from '../../assets/icons/credited.png'
import Profile from '../../assets/icons/5.png'

import BackBtn from '../GlobalStyles/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';

function Notification() {



const navigation = useNavigation()

  const [notification,setNotification]=useState([])
 
  
  const data = notification 



useEffect(()=>{

  getAsyncData()

  
  },[])



  
  async function getAsyncData () {
    const user = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    let userParsed=JSON.parse(user) 
    if(token){
  
getNotification(userParsed.id)
  
  
    }
  }










function getNotification(user_id){
    console.log(user_id)
    var formdata = new FormData();
    formdata.append("receiver_id", user_id);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}fetch_notification_by_rid`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status === "200"){
            setNotification(result.Notification)
        }
        console.log(result)})
      .catch(error => console.log('error', error));
}









function Notificationlist({item}){
  const [showDetail,setShowDetail]=useState(false)
  function onHideModal(){
    setShowDetail((p)=>!p)
  }
  

return(
    <View style={styles.TrickContainer}>
  
  
    <View style={{flexDirection:'row',alignItems:"center"}}>
    <View style={styles.IconWrapper}>
    
    <Image source={notificationIcon} style={{width:30,height:30,tintColor:Colors.PrimaryColor,margin:5}}/>

    
    </View>
    
    
    
    <View style={styles.InnerTricks}>
    <Text style={[styles.TextStyle,{color:Colors.PrimaryColor,fontWeight:'bold'}]}>{item.title}</Text>
    <Text style={styles.TextStyle}>{item.body}</Text>
    <Text style={styles.TextStyle}>{item.Idate}</Text>

    </View>
    
    
    </View>
    

   
   

    
    </View>
)
}




return (
    <SafeAreaView style={styles.Container}>
<BackBtn/>
<Text style={styles.HeaderText}>
    Direct Balance
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
<Notificationlist  item={item} 
/>

}
/>
<View
style={{height:20,width:50}}
></View>


    </SafeAreaView>
  )
}
export default Notification;

