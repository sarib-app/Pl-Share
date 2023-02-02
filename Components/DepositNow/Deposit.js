import React, { useState,useEffect } from 'react';
import {

  Text,
  Image,
  View,
  TextInput,
  ImageBackground,
  Pressable,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Alert
  
 
} from 'react-native';
import styles from './Styles';
;
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import title_icon from '../../assets/icons/account_title.png'
import acc_numb_icon from '../../assets/icons/acc_numb.png'
import acc_type_icon from '../../assets/icons/acc_type.png'
import amount_icon from '../../assets/icons/amount.png'
import upload_img_icon from '../../assets/icons/upload_img.png'
import Card from '../../assets/icons/card.png'
import Colors from '../GlobalStyles/Color';
import Cardd from './DepositCard';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Button from './../../assets/icons/longBtn.png'
import BaseUrl from '../../Urls';
import * as ImagePicker from 'react-native-image-picker';
import getAsync from '../GetAsynData/getAsync';
import SpinnerButton from 'react-native-spinner-button';
import BankAllList from '../BankAllList/BankAllList';
import { ButtonBig } from '../GlobalStyles/Buttons';
const WindowHeight = Dimensions.get('window').height; 











function DepositScreen({route}) {
const asyncData = getAsync()
  const item = route.params.item
  const [Acc_Title,setAcc_title]=useState("")
const [Acc_Number,setAcc_Number]=useState("")
const [Acc_Type,setAcc_Type]=useState(item.Acc_Type)
const [Account_Subtype,setAcc_SubType]=useState("Tither (USD)")
const [ProofImage,setProofImage]=useState()
const [ProofImageTemp,setProofImageTemp]=useState()

const [Amount,setAmount]=useState()
const [isPressed,setIsPressed]=useState(false)
const [loading,setLoading]=useState(false)
const [showBanks,setShowBank]=useState(false)
const [getMethods,setMethods]=useState("")

function onDeposit(){
  
   if( Acc_Number !=""&& Acc_Type && Account_Subtype && Amount && ProofImageTemp ){
    // setLoading(true)
DepositCall()
   }else{ 
    setIsPressed(true)
   }


}

function onSelectBank (val){
  setShowBank(false)
   setAcc_SubType(val)

}
















useEffect(()=>{
getBanks()
  },[])



function getBanks(){
  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}fetch_payment_address`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.status === "200"){
        setMethods(result.data)
      }
      console.log(result)})
    .catch(error => console.log('error', error));
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
        setProofImage(response.assets[0])
        setProofImageTemp(response.assets[0].uri)
          
      }
      else{
          console.log("jedhfk")
      }

  })
 }

 console.log('id',asyncData.user.id)
function DepositCall (){
  
setLoading(true)
  const uri =
  Platform.OS === "android"
    ? ProofImage.uri
    : ProofImage.uri.replace("file://", "");
const filename = ProofImage.uri.split("/").pop();
const match = /\.(\w+)$/.exec( String(filename));
const ext = match?.[1];
const type = match ? `image/${match[1]}` : `image`;

console.log(uri+ "  " + ext + "  " + type )



  var formdata = new FormData();
  formdata.append("payer_id", asyncData.user.id);
  formdata.append("account_type", Acc_Type);
  formdata.append("wallet_type", Account_Subtype);

  formdata.append("transaction_id",Acc_Number);
  formdata.append("status","unapproved");
  formdata.append("verified","false");

  formdata.append("amount", Amount);
  // formdata.append("proof_image", fileInput.files[0], "[PROXY]");

  formdata.append("proof_image", {
    uri:uri,
    name: `proof_image.${ext}`,
    type:type,
  } );

  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  }; 
  
  fetch(`${BaseUrl}adddeposit`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      console.log(result)
      if(result.status === "200"){
        setLoading(false)
        Alert.alert("Congratulations","Your request has been generated successfully!")
        console.log(result)
        navigation.navigate("Main")
      }
    else if(result.status==="401"){
        setLoading(false)
        console.log(result.data[0].message)
        Alert.alert(result.data[0].message)
      }
    })
    .catch(error => {
      Alert.alert("Ooops","Something went wrong please try again later!")
      setLoading(false)
      console.log('error', error)});







  
  
//     RNFetchBlob.fetch(
//       'POST',
//       `${BaseUrl}addDeposit`,
// {
  
// },
//       [



//         { name: 'payer_id', data: "44"},
//         { name: 'amount', data: "4" },
//         { name: 'account_no', data: "4"},
//         { name: 'account_title', data:"4" },
//         // { name: 'status', data: "4" },
//         { name: 'account_subtype', data:"4" },
//         { name: 'account_type', data: "4" },


//         {
//           name: "proof_image",
//           filename: `proof_image.${ext}`,
//           type: `proof_image/${type}`,
//           data:  RNFetchBlob.wrap(uri),
//         },




//       ],
//     ).then(response => response.text())
//       .then(result => {
        // if(result.status === "200"){
        //   setLoading(false)
        //   Alert.alert("Congratulations")
        //   console.log(result)
        //   navigation.navigate("Main")
        // }
        // else{
        //   setLoading(false)
        // }
//     console.log("result",result)
//       })
//       .catch(err => {
//         setLoading(false)
//         console.log('err >>>', err);
    
//       });












}
const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.Container}>
<Text style={styles.TxtColor}>Deposit</Text>
<ScrollView>

<Cardd
getMethods={getMethods}
/>

<>




<Text style={styles.TxtInputTitle}>
  Transaction ID
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: Acc_Number ===""&&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_numb_icon}
style={{width:27,height:20,marginLeft:10,tintColor:Colors.PrimaryColor  }}
/>

<TextInput
placeholder='Enter Transaction ID'
value={Acc_Number}
// keyboardType={'numeric'}

onChangeText={(e)=> setAcc_Number(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>


<Text style={styles.TxtInputTitle}>
  Vault Type
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Acc_Type&&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_type_icon}
style={{width:24,height:19,marginLeft:10,tintColor:Colors.PrimaryColor  }}
/>

<TextInput
placeholder='Enter Account Type'
value={Acc_Type}
// onChangeText={(e)=> setAcc_Type(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}
editable={false}

/>

</View>






<Text style={styles.TxtInputTitle}>
  Currency Type
</Text>
<Pressable
// onPress={()=> setShowBank(true)}

style={[GlobalStyles.TextInput,{borderColor: !Account_Subtype &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_type_icon}
style={{width:24,height:19,marginLeft:10,tintColor:Colors.PrimaryColor  }}
/>

<TextInput
placeholder='Select Currency Type'
value={Account_Subtype}
// onChangeText={(e)=> setAcc_SubType(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
editable={false}
// secureTextEntry={true}

/>

</Pressable>



<Text style={styles.TxtInputTitle}>
  Amount
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Amount &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={amount_icon}
style={{width:22,height:24,marginLeft:10 ,tintColor:Colors.PrimaryColor }}
/>

<TextInput
placeholder='Enter Amount'
value={Amount}
keyboardType={'numeric'}

onChangeText={(e)=> setAmount(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>





<Text style={styles.TxtInputTitle}>
  Invoice Image
</Text>
<Pressable
onPress={()=>permissionForGallery()}
style={[GlobalStyles.TextInput,{borderColor: !ProofImageTemp &&isPressed === true ? Colors.danger:Colors.BgColorII

,justifyContent:"center",alignItems:'center',height:WindowHeight/4
}]}
>
{
  ProofImageTemp ? <Image
  source={{uri:ProofImageTemp}}
  style={{width:300,height:150,marginLeft:10  }}
  />:
  <Image
source={upload_img_icon}
style={{width:115,height:104,marginLeft:10  }}
/>
}



</Pressable>

</>


{loading===false?


<Pressable 
onPress={()=> onDeposit()}
style={{alignSelf:"center"}}
// style={GlobalStyles.DullBtn}
>



<ButtonBig
title={"Deposit Now"}
/>


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
export default DepositScreen;

