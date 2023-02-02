import React, { useState ,useEffect} from 'react';
import {
  Text,
  Image,
  View,
ScrollView,
Pressable,
ImageBackground,
Modal
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import malepic from '../../assets/icons/male.png'
import Colors from '../GlobalStyles/Color';
import dropdown from '../../assets/icons/dropdown.png'
import Endpoints from '../../EnDPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../../Urls';
function ComissionDetail({IsVisible,onHideModal,itemID}) {



const navigation = useNavigation()











useEffect(()=>{

  getAsyncData()

  
  },[])
const [item,setItem]=useState("")


  
  async function getAsyncData () {
    const user = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    let userParsed=JSON.parse(user) 
    if(token){
  
getDetails(userParsed.id)
  
  
    }
  }
  function getDetails (id){
    var formdata = new FormData();
formdata.append("ref_id", itemID);
formdata.append("user_id", id);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}teamdetail`, requestOptions)
  .then(response => response.json())
  .then(result => {

    if(result.status === 200){
setItem(result)
    }
    console.log(result)
  }
    
    )
  .catch(error => console.log('error', error));
  }










return (
    <Modal
    visible={IsVisible}
    transparent={true}
    animationType="slide"
    >

    <SafeAreaView style={[styles.Container,{backgroundColor:"transparent",flexDirection:"row",shadowColor:"black",elevation:4}]}>

{
  item != "" &&
<View style={styles.ModalDetail}>
  <Pressable onPress={()=>onHideModal()} >

  <Image 
  source={dropdown}
  style={{width:30,height:28,alignSelf:"center",marginTop:20,}}
  
  />
  </Pressable>

<View style={styles.ModalHeader}>

{
  item.photo != "default" ?

<Image 
source={{uri:Endpoints.ImageBaseUrl+item.photo}}
style={{width:100,height:100,borderRadius:10}}

/>

:

<Image 
source={malepic}
style={{width:100,height:100,borderRadius:10}}

/>


}
<View style={{marginLeft:10}}>
  <Text style={styles.ModalTitles}>{item.username}</Text>
  <Text style={styles.ModalTitles}>{item.email}</Text>
  <Text style={styles.ModalTitles}>Level: <Text style={{color:Colors.PrimaryColor}}>{item.level}</Text></Text>

</View>





</View>
<View style={{marginLeft:30,marginTop:15}}>
<Text style={styles.ModalBelowTitles}>No of Comissions you recieved: <Text style={{color:Colors.PrimaryColor,fontWeight:'bold'}}>{item.total_no_earned}</Text></Text>
<Text style={styles.ModalBelowTitles}>Your Earned Comission: <Text style={{color:Colors.PrimaryColor,fontWeight:'bold'}}>USD {item.total_earned}</Text></Text>
<Text style={styles.ModalBelowTitles}>{item.username}'s Total Earning: <Text style={{color:Colors.PrimaryColor,fontWeight:'bold'}}>USD {item.balance}</Text></Text>

</View>

</View>
}
    </SafeAreaView>
    </Modal>

  )
}
export default ComissionDetail;

