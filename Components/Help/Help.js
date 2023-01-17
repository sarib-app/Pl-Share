import React, { useState,useEffect } from 'react';
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
import emailIcon from '../../assets/icons/emailIcon.png'
import { MyTeamData, TeamsComission } from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import Profile from '../../assets/icons/5.png'

import BackBtn from '../GlobalStyles/BackButton';
import ChatDetail from './ChatDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
import CreateTicket from './CreateTicket';
import getAsync from '../GetAsynData/getAsync';
function Help() {
  const asynData = getAsync()
const navigation = useNavigation()

  const [showCreateTicket,setShowCreateTicket]=useState(false)

  const [ticketData,setTicketData]=useState([])



function onHideCreateTicket(){
  setShowCreateTicket((p)=>!p)
}

function onSubmitTicket(){
  setShowCreateTicket((p)=>!p)
  GetTickets(asynData.user.id)

}






useEffect(()=>{
  getAsyncData()
  },[])
  


  async function getAsyncData () {
    const user = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    let userParsed=JSON.parse(user) 
    if(token){
  
      GetTickets(userParsed.id)
  
  
    }
  }  




function GetTickets(id){
  var formdata = new FormData();
  formdata.append("user_id", id);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}${Endpoints.fetch_ticket}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.status==="200"){
        setTicketData(result.data)
      }
      console.log(result)})
    .catch(error => console.log('error', error));
}





function TicketLists({item}){

  const [showDetail,setShowDetail]=useState(false)


  
function onHideModal(){
  setShowDetail((p)=>!p)
}

return(
    <View style={styles.TrickContainer}>
  
  
    <View style={{flexDirection:'row',alignItems:"center"}}>
    <View style={styles.IconWrapper}>
    
    <Image 
    style={{width:23,height:17,tintColor:Colors.FontColorI}} 
    source={emailIcon}
    />
    
    
    </View>
    
    
    
    <View style={styles.InnerTricks}>
    <Text style={{fontWeight:'400',fontSize:16,color:Colors.FontColorI}}>{item.title}</Text>
    {/* <Text style={{fontWeight:'500',fontSize:14,color:Colors.PrimaryColor}}>Level 2</Text> */}

    
    </View>
    
    
    </View>
    
    
    <Text 
    onPress={()=> setShowDetail(true)}
    
    style={[styles.TransactionText,{color:Colors.PrimaryColor}]}>Chat</Text>
    {
      showDetail === true  &&
      <ChatDetail IsVisible={showDetail} onHideModal={onHideModal} item={item}/>
    }

    </View>
)
}




return (
    <SafeAreaView style={styles.Container}>
<BackBtn/>
<Text style={styles.HeaderText}>
    Help Center
</Text>
<Text 
onPress={()=> setShowCreateTicket(true)}
style={{color:Colors.PrimaryColor,fontWeight:'600',marginLeft:15,marginTop:10,marginBottom:10}}>Click and Create a ticket</Text>

{
  ticketData.length > 0 ?
<FlatList 
data={ticketData}
renderItem={({item})=>
<TicketLists  item={item} 
/>

}
/>
:
<Text style={{color:Colors.FontColorI,fontSize:18,alignSelf:"center",marginTop:300}}>You currently have no ticket generated.</Text>
}
<View
style={{height:20,width:50}}
></View>

<CreateTicket IsVisible={showCreateTicket} 

onHideModal={onHideCreateTicket}
onSubmitTicket={onSubmitTicket}
/>
    </SafeAreaView>
  )
}
export default Help;

