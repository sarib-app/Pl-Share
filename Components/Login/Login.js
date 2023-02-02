import React, { useState } from 'react';
import {

  Text,
  Image,
  View,
  TextInput,
  ImageBackground,
  Pressable,
  Alert
 
} from 'react-native';
import styles from './Styles';
import GradientText from "react-native-gradient-texts";
import Colors from '../GlobalStyles/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import forgotTxt from './../../assets/texts/forgot.png'
import rememberTxt from './../../assets/texts/remember.png'
import phoneTxt from './../../assets/texts/phone.png'
import registerTxt from './../../assets/texts/register.png'
import passwordTxt from './../../assets/texts/password.png'
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import phoneIcon from './../../assets/icons/type.png'
import lock from './../../assets/icons/lock.png'
import longBtn from './../../assets/icons/longBtn.png'
import Or from './../../assets/icons/OR.png'
import { useNavigation } from '@react-navigation/native';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpinnerButton from 'react-native-spinner-button';
import CountryCode from '../Register/CountryCodes';
import { ButtonBig } from '../GlobalStyles/Buttons';
import Download from '../Download/Download';
function Login({

  onNavigate,
  onChangeState
  
}) {

const navigation = useNavigation()


const [errorMessage,setErrorMessage]=useState("")
const [errorCode,setErrorCode]=useState("")
const [countryCode,setCountryCode]=useState(92)

const [phone, setPhone]=useState()
const [password , setPassword]= useState("")
const [loginPressed , setLoginPressed]= useState(false)

const [loading,setLoading]=useState(false)
const [showCodes,setShowCodes]=useState(false)

function onSelectBank(val){
  setCountryCode(val)
  setShowCodes((p)=> !p)
}

function onLoginPress(){
  if(phone && password){

    Login()
  }
  else{
setLoginPressed(true)
  }
}


function Login(){
  setLoading(true)
  
  var formdata = new FormData();
formdata.append("phone", countryCode+phone);
formdata.append("password", password);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}${Endpoints.loginNow}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    
    if(result.status === "401"){
      setErrorCode(result.error)
      setErrorMessage(result.message)
      setLoading(false)
    }
    else if(result.user){
      AsyncStorage.setItem('user',JSON.stringify(result.user))
      AsyncStorage.setItem('token',result.token)
     // navigation.navigate('Main')
     onChangeState() 
     setLoading(false)
    }
    else{
      setLoading(false)
      Alert.alert("Oops","Something went wrong, try again later")
      
       
    }
    console.log(result)})
  .catch(error => {
    setLoading(false)
      Alert.alert("Oops","Something went wrong, try again later")
    console.log('error', error)
  });
}








  return (
    <SafeAreaView style={styles.Container}>


          <View style={styles.marginer}>
<Text style={styles.HeaderTitle}>
  Welcome
</Text>
<Text style={styles.SubHeaderTitle}>Login To Continue</Text>

<Text style={[styles.TitleTxt,{marginTop:40}]}>Phone No</Text>

<View style={[GlobalStyles.TextInput,{borderColor:!phone && loginPressed === true?Colors.danger:Colors.PrimaryColor }]}>

<Pressable
onPress={()=> setShowCodes(true)}
style={{padding:10,marginLeft:10,borderRightColor:"white",borderRightWidth:1}}
>
<Text style={{color:Colors.FontColorI,fontWeight:'bold'}}>+{countryCode}</Text>

</Pressable>
<TextInput
placeholder='Number after country code i.e. 320 *******'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:"white"}}

value={phone}
keyboardType="numeric"

onChangeText={(e)=>setPhone(e)}

/>
</View>
{
  errorMessage != "" && errorCode === "phone"  &&
<Text style={{color:Colors.danger}}>{errorMessage}</Text>
}

<Text style={styles.TitleTxt}>Password</Text>


<View
style={[GlobalStyles.TextInput,{borderColor:password === "" && loginPressed===true ? Colors.danger :Colors.PrimaryColor}]}
>

<Image
source={lock}
style={{width:17,height:21,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Password'
value={password}
autoCapitalize="none"
onChangeText={(e)=> setPassword(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
secureTextEntry={true}

/>

</View>
{
  errorMessage != "" && errorCode === "password"  &&
<Text style={{color:Colors.danger}}>{errorMessage}</Text>
}


<Text 

onPress={()=> navigation.navigate("ForgetPassword")}
style={styles.TitleTxt}>Forgot Password?</Text>
</View>

{
  loading === false ?
<Pressable 
onPress={()=> onLoginPress()}
>

{/* <ImageBackground 
source={longBtn}
style={GlobalStyles.Button}

>

<Text style={GlobalStyles.BtnText}>Login Now</Text>

</ImageBackground> */}



<ButtonBig 
title={"Login Now"}
/>


</Pressable>
:<SpinnerButton
                        buttonStyle={{  backgroundColor: Colors.PrimaryColor,
                        borderRadius: 6}}
                        isLoading={loading}
                        spinnerType='PulseIndicator'
                        indicatorCount={0}
>

</SpinnerButton>
}




<Text style={[styles.TitleTxt,{marginTop:20,marginBottom:20}]}>OR</Text>

<Pressable 
onPress={()=> onNavigate()}
style={styles.RegisterBtn}>
<Text style={styles.TitleTxt}>Register</Text>

</Pressable>

<Text style={styles.PrivacyTxt}>
  Terms Of Services.
</Text>

<Text style={styles.PrivacyTxt}>
  Privacy.
</Text>
<Text style={[styles.PrivacyTxt,{position:'absolute',bottom:50}]}>
  Copyright 2014-2021 Alphanite. All rights reserved.
</Text>
<CountryCode 
isVisible={showCodes}
onSelectBank={onSelectBank}

/>



    </SafeAreaView>
  )
}
export default Login;

