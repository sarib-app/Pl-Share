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
const WindowHeight = Dimensions.get('window').height; 











function DepositScreen({route}) {
const asyncData = getAsync()
  const item = route.params.item
  const [Acc_Title,setAcc_title]=useState(item.Acc_Type === "OKX" || item.Acc_Type === "Binance"? item.Acc_Type:"")
const [Acc_Number,setAcc_Number]=useState(item.Acc_Type === "OKX" || item.Acc_Type === "Binance"? "N/A":"")
const [Acc_Type,setAcc_Type]=useState(item.Acc_Type)
const [Account_Subtype,setAcc_SubType]=useState(item.Acc_Type === "VISA" ? "": item.Acc_Type === "OKX" || item.Acc_Type === "Binance"?"USDT TRON (TRC 20)":item.Acc_Type)
const [ProofImage,setProofImage]=useState()
const [ProofImageTemp,setProofImageTemp]=useState()

const [Amount,setAmount]=useState()
const [isPressed,setIsPressed]=useState(false)
const [loading,setLoading]=useState(false)
const [showBanks,setShowBank]=useState(false)
const [getMethods,setMethods]=useState()

function onDeposit(){
  
   if(Acc_Title !=""&& Acc_Number !=""&& Acc_Type && Account_Subtype && Amount && ProofImageTemp ){
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
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://apis.tradingtube.net/api/fetch_payment", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.status === "200"){
        setMethods(result.Data[0])
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
  formdata.append("account_title", Acc_Title);
  formdata.append("account_no",Acc_Number);
  formdata.append("amount", Amount);
  // formdata.append("proof_image", fileInput.files[0], "[PROXY]");

  formdata.append("proof_image", {
    uri:uri,
    name: `proof_image.${ext}`,
    type:type,
  } );

  formdata.append("account_subtype", Account_Subtype);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  }; 
  
  fetch(`${BaseUrl}addDeposit`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      console.log(result)
      if(result.status === "200"){
        setLoading(false)
        Alert.alert("Congratulations")
        console.log(result)
        navigation.navigate("Main")
      }
    else if(result.status==="401"){
        setLoading(false)
        console.log(result.data[0].message)
        Alert,alert(result.data[0].message)
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
item={item}
methods={getMethods}
type={item.Acc_Type}
/>
{
  item.Acc_Type === "Binance" ||   item.Acc_Type === "OKX" ? 
<>






<Text style={styles.TxtInputTitle}>
  Account Type
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Acc_Type&&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_type_icon}
style={{width:24,height:19,marginLeft:10  }}
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
style={{width:24,height:19,marginLeft:10  }}
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
style={{width:22,height:24,marginLeft:10  }}
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
 Upload Invoice Image
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
:
<>
<Text style={styles.TxtInputTitle}>
  Account Title
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Acc_Title &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={title_icon}
style={{width:23,height:21,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Account Title'
value={Acc_Title}
onChangeText={(e)=> setAcc_title(e)}

placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}
/>

</View>



<Text style={styles.TxtInputTitle}>
  Account Number
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: Acc_Number ===""&&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_numb_icon}
style={{width:27,height:20,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Account Number'
value={Acc_Number}
keyboardType={'numeric'}

onChangeText={(e)=> setAcc_Number(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>












<Text style={styles.TxtInputTitle}>
  Account Type
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Acc_Type&&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_type_icon}
style={{width:24,height:19,marginLeft:10  }}
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
  Account Sub-Type
</Text>








{
  item.Acc_Type != "VISA" ?

<View
style={[GlobalStyles.TextInput,{borderColor: !Account_Subtype &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_type_icon}
style={{width:24,height:19,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Account Sub-Type'
value={Account_Subtype}
// onChangeText={(e)=> setAcc_SubType(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
editable={false}
// secureTextEntry={true}

/>

</View>

:
<Pressable
onPress={()=> setShowBank(true)}
style={[GlobalStyles.TextInput,{borderColor: !Account_Subtype &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_type_icon}
style={{width:24,height:19,marginLeft:10  }}
/>

<TextInput
placeholder='Please Select Basank SubType'
value={Account_Subtype}
// onChangeText={(e)=> setAcc_SubType(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
editable={false}
// secureTextEntry={true}
/>

</Pressable>


}









<Text style={styles.TxtInputTitle}>
  Amount
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Amount &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={amount_icon}
style={{width:22,height:24,marginLeft:10  }}
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
 Upload Invoice Image
</Text>
<Pressable
onPress={()=>permissionForGallery()}
style={[GlobalStyles.TextInput,{borderColor: !ProofImageTemp &&isPressed === true ? Colors.danger:Colors.BgColorII

,justifyContent:"center",alignItems:'center',height:WindowHeight/4
}]}
>
{
  ProofImageTemp? <Image
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
}

{loading===false?


<Pressable 
onPress={()=> onDeposit()}
>

<ImageBackground 
source={Button}
style={[GlobalStyles.Button,{alignSelf:'center'}]}

>

<Text style={GlobalStyles.BtnText}>Deposit Now</Text>

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
<BankAllList 
    isVisible={showBanks}
    onSelectBank={onSelectBank}
    route={item.Acc_Type}

/>
    </SafeAreaView>
  )
}
export default DepositScreen;

