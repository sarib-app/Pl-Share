import React, { useState, useEffect } from 'react';
import {

  Text,
  Image,
  View,
  TextInput,
  ImageBackground,
  Pressable,
  Dimensions,
  Alert,
  Platform,
  PermissionsAndroid
  
 
} from 'react-native';
import styles from '../DepositNow/Styles';
;
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native';
 
import types from '../../assets/icons/type.png'
import lock from '../../assets/icons/lock.png'
import Colors from '../GlobalStyles/Color';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Button from './../../assets/icons/longBtn.png'
import malepic from '../../assets/icons/male.png'
import BackBtn from '../GlobalStyles/BackButton';

import emailIcon from '../../assets/icons/emailIcon.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
import SpinnerButton from 'react-native-spinner-button';

const WindowHeight = Dimensions.get('window').height; 



function UpdateProfile(props) {
const identifier = props.route.params.identifier

console.log(identifier)

const [Firstname,setFirstname]=useState()
const [Lastname,setLastname]=useState()
const [Email,setEmail]=useState()
const [Old_Password,setOldPassword]=useState()
const [NewPassword,setNewPassword]=useState()
const [isPressed,setIsPressed]=useState(identifier === "password"?false:true)
const [loading,setLoading]=useState(false)
const [user_id,setUser_id]=useState(0)
const [token,setToken]=useState("")
const [erroMessage,setErroMessage]=useState("")
const [pro_pic , setPro_Pic]=useState("")
const [pro_pic_changed , setPro_Pic_changed]=useState("")


const headertTitle = identifier === "password" ? "Change Password":"Update Profile"

const navigation = useNavigation()

useEffect(()=>{
  getAsyncData()
  },[])
  async function getAsyncData () {
    const user = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    let userParsed=JSON.parse(user) 
    if(token){
      // setUser(userParsed)
      setEmail(userParsed.email)
      setToken(token)
      setFirstname(userParsed.firstname)
      setLastname(userParsed.lastname)
      setUser_id(userParsed.id)
      setPro_Pic(userParsed.pro_pic)
    }
  }




function onUpdate(){
  
if(identifier === "profile"){
  if(Firstname && Lastname && Email){
updateProfileCall()

  }
}
else if(identifier === "password"){
  if( Old_Password && NewPassword ){
    ChnagePassword()
       }
       else{
        setIsPressed(true)
       }
}

   
}




function updateProfileCall(){
  setLoading(true)

  

  const uri = pro_pic_changed != "" ?
  Platform.OS === "android"
    ? pro_pic_changed.uri
    : pro_pic_changed.uri.replace("file://", ""):"uri"
const filename = pro_pic_changed != "" && pro_pic_changed.uri.split("/").pop();
const match = pro_pic_changed != "" && /\.(\w+)$/.exec( String(filename));
const ext = pro_pic_changed != "" && match?.[1];
const type = pro_pic_changed != "" && match ? `image/${match[1]}` : `image`;








  var formdata = new FormData();
  formdata.append("email", Email);
  formdata.append("firstname", Firstname);
  formdata.append("lastname",Lastname);
  pro_pic_changed != "" && formdata.append("pro_pic", {
    uri:uri,
    name: `pro_pic.${ext}`,
    type:type,
  } );

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}${Endpoints.updateuser}/${user_id}`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      
      if(result.status === "200"){
        console.log(result)
        setLoading(false)
        AsyncStorage.setItem('user',JSON.stringify(result.user))

        navigation.navigate('Main')
        Alert.alert("Congratulation","Profile Updated Successfully!")
      }
      else{
        setLoading(false)
      }
      console.log(result)})
    .catch(error => {
      Alert.alert("Sorry","Something went wrong try again in 1 minute.")
setLoading(false)
      console.log('error', error)});


}


function ChnagePassword(){
  setLoading(true)
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var formdata = new FormData();
formdata.append("old_password", Old_Password);
formdata.append("password", NewPassword);
formdata.append("confirm_password", NewPassword);
formdata.append("id", user_id);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}${Endpoints.changepassword}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.status === "200"){
      console.log(result)
      setLoading(false)
      navigation.navigate('Main')
      Alert.alert("Congratulation","Password Changed Successfully!")
      setErroMessage("")
    }
    else{
      setErroMessage("Old password is incorrect.")
      setLoading(false)

    }
    console.log(result)})
  .catch(error => {
    setLoading(false)
    Alert.alert("Sorry","Something went wrong try again in 1 minute.")
    console.log('error', error)});
}







const permissionForGallery=async ()=>{
  if (Platform.OS === 'ios') {
      SelectFromGallery();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );


        const grantedRead = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to upload file',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED && grantedRead === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          SelectFromGallery();
          
alert("Download started please wait")

        } else {
          // If permission denied then show alert
          Alert.alert('Error','Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++"+err);
      }
    }
 }
 async function SelectFromGallery(){
  ImagePicker.launchImageLibrary({ mediaType: 'image', includeBase64: false, }, (response) => {
      if(response.didCancel !=true){
        setPro_Pic_changed(response.assets[0])
        // setProofImageTemp(response.assets[0].uri)
          
      }
      else{
          console.log("jedhfk")
      }

  })
 }





















  return (
<SafeAreaView style={styles.Container}>
    <BackBtn />
<ScrollView>



<Text style={[styles.TxtColor,{marginTop:10}]}>{headertTitle}</Text>
{
  identifier === "profile"&&
<>
<Pressable
onPress={()=> permissionForGallery()}
>

{
pro_pic_changed !="" ?<Image
source={{uri:pro_pic_changed.uri}}
style={{width:106,height:106,borderRadius:1000,alignSelf:'center'}}
/>:
pro_pic === "" || pro_pic === "default"?
<Image
source={malepic}
style={{width:106,height:106,borderRadius:1000,alignSelf:'center'}}
/>
:
<Image
source={{uri:Endpoints.ImageBaseUrl+pro_pic}}
style={{width:106,height:106,borderRadius:1000,alignSelf:'center'}}
/>
}
</Pressable>

<Text style={styles.TxtInputTitle}>
  First Name
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Firstname &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={types}
style={{width:14,height:14,marginLeft:10  }}
/>

<TextInput
placeholder='Enter First Name'
value={Firstname}
onChangeText={(e)=> setFirstname(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>



<Text style={styles.TxtInputTitle}>
  Last Name
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Lastname &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={types}
style={{width:14,height:14,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Account Number'
value={Lastname}
// keyboardType={'numeric'}

onChangeText={(e)=> setLastname(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>

<Text style={styles.TxtInputTitle}>
  Email Address
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Email&&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={emailIcon}
style={{width:16,height:11,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Email Here'
value={Email}
onChangeText={(e)=> setEmail(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>

</>


}


{
  identifier === "password" &&
  <>



<Text style={styles.TxtInputTitle}>
  Old Password
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Old_Password &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={lock}
style={{width:17,height:17,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Old Password'
value={Old_Password}
onChangeText={(e)=> setOldPassword(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>
{
  erroMessage !=""&&
<Text style={{color:Colors.danger,marginLeft:30 }}>{erroMessage}</Text>
}

<Text style={styles.TxtInputTitle}>
  New Password
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !NewPassword &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={lock}
style={{width:17,height:17,marginLeft:10  }}
/>

<TextInput
placeholder='Enter New Password'
value={NewPassword}
onChangeText={(e)=> setNewPassword(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>


</>

}




{loading === false ?


<Pressable 
onPress={()=> onUpdate()}
>

<ImageBackground 
source={Button}
style={[GlobalStyles.Button,{alignSelf:'center'}]}

>

<Text style={GlobalStyles.BtnText}>Update</Text>

</ImageBackground>
</Pressable>
:
<SpinnerButton
                        buttonStyle={{  backgroundColor: Colors.PrimaryColor,
                        borderRadius: 6}}
                        isLoading={loading}
                        spinnerType='PulseIndicator'
                        indicatorCount={0}
>

</SpinnerButton>
}


<View style={{width:50,height:100}}></View>
</ScrollView>

    </SafeAreaView>
  )
}
export default UpdateProfile;

