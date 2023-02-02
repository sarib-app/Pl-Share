import React, { useState, useEffect } from 'react';
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
import Colors from '../GlobalStyles/Color';
import TipsIcon from '../../assets/icons/tips.png'
import { MyTeamData } from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import credited from '../../assets/icons/credited.png'
import Profile from '../../assets/icons/5.png'

import TeamDetail from './TeamDetail';
import BackBtn from '../GlobalStyles/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';

function MyTeam() {



const navigation = useNavigation()

  const [firstTeamList,setFirstTeamList]=useState([])
  const [secondTeamList,setSecondTeam]=useState([])
  

  const [thirdTeamList,setThirdTeam]=useState([])
  const [fourthTeam,setFourthTeam]=useState([])


  const [fifthTeam,setFifthTeam]=useState([])
  const [sixthTeam,setSixthTeam]=useState([])

  const [selected,setIsSelected]=useState(1)
  
  const data = selected === 1 ?firstTeamList : selected === 2 ?secondTeamList :selected === 3 ?thirdTeamList:
  selected === 4 ?fourthTeam:selected === 5 ?fifthTeam : selected === 6 ?sixthTeam:firstTeamList




useEffect(()=>{

  getAsyncData()

  
  },[])



  
  async function getAsyncData () {
    const user = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    let userParsed=JSON.parse(user) 
    if(token){
  
getTeamList(userParsed.id)
  
  
    }
  }










function getTeamList(user_id){


  var formdata = new FormData();
  formdata.append("user_id", user_id);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}${Endpoints.get_the_team}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.status==="200"){
        setFirstTeamList(result.first_members)
        setSecondTeam(result.second_members)
        setThirdTeam(result.third_members)
        setFourthTeam(result.fourth_members)
        setFifthTeam(result.fifth_members)
        setSixthTeam(result.sixth_members)




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
    
    {
  item.pro_pic != "default" ?

<Image 
source={{uri:Endpoints.ImageBaseUrl+item.pro_pic}}
style={{width:50,height:50,borderRadius:1000}}

/>

:

<Image 
source={Profile}
style={{width:50,height:50,borderRadius:10}}

/>


}
    
    
    </View>
    
    
    
    <View style={styles.InnerTricks}>
    <Text style={styles.TextStyle}>{item.username}</Text>
    <Text style={{fontWeight:'bold',fontSize:18,color:Colors.FontColorI}}>Phone: {item.phone}</Text>

    </View>
    
    
    </View>
    
    
    <Text 
    onPress={()=>{
      console.log("sasd")
      setShowDetail(true)}}
    
    style={[styles.TransactionText,{color:Colors.PrimaryColor}]}>View</Text>
    {
      showDetail === true &&
    <TeamDetail 
    IsVisible={showDetail} 
    onHideModal={onHideModal}
    itemID={item.id}
    
/>

  }
    
    </View>
)
}




return (
    <SafeAreaView style={styles.Container}>
<BackBtn/>
<Text style={styles.HeaderText}>
    My Team
</Text>

<View style={styles.TrickContainer}>
<Text 
onPress={()=> setIsSelected(1)}
style={[styles.TextStyle,{color:selected===1 ? Colors.FontColorI:Colors.bgIII}]}>1st</Text>
<Text
onPress={()=> setIsSelected(2)}


style={[styles.TextStyle,{color:selected===2 ? Colors.FontColorI:Colors.bgIII}]}>2nd</Text>
<Text
onPress={()=> setIsSelected(3)}


style={[styles.TextStyle,{color:selected===3 ? Colors.FontColorI:Colors.bgIII}]}>3rd</Text>
<Text
onPress={()=> setIsSelected(4)}


style={[styles.TextStyle,{color:selected===4 ? Colors.FontColorI:Colors.bgIII}]}>4th</Text>
<Text
onPress={()=> setIsSelected(5)}


style={[styles.TextStyle,{color:selected===5 ? Colors.FontColorI:Colors.bgIII}]}>5th</Text>
<Text
onPress={()=> setIsSelected(6)}


style={[styles.TextStyle,{color:selected===6 ? Colors.FontColorI:Colors.bgIII}]}>6th</Text>
</View>

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
export default MyTeam;

