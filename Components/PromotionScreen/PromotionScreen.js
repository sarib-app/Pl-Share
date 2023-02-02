import React, { useState ,useEffect} from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
Dimensions,
ImageBackground,
Platform,
Alert,
PermissionsAndroid
 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import Colors from '../GlobalStyles/Color';

import LinearGradient from 'react-native-linear-gradient';
import Congrat from '../../assets/icons/Congrat.png'
import steps from '../../assets/icons/steps.png'
import BackBtn from '../GlobalStyles/BackButton';
import longBtn from './../../assets/icons/longBtn.png'
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import BaseUrl from '../../Urls';
import * as ImagePicker from 'react-native-image-picker';
import getAsync from '../GetAsynData/getAsync';
import SpinnerButton from 'react-native-spinner-button';
import upload_img_icon from '../../assets/icons/upload_img.png'
import referenceCnic from '../../assets/icons/referenceCnic.png'

import { ButtonBig } from '../GlobalStyles/Buttons';

// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7224745157985009/9676971080';


const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height;
function PromotionScreen() {
  const asyndata = getAsync()
  const [loading, setLoading]=useState(false)
  const [proof_image,setProofImage]=useState()

  const [cnicimg,setCnicimg]=useState()
  const [isPressed,setIspressed]=useState(false)


const [result,setResult] = useState("")



  useEffect(()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}gettitle`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status === "200"){

          setResult(result.data)
        }
        console.log(result)
      })
      .catch(error => console.log('error', error));
  },[])
 






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
          // UploadScreenShot(response.assets[0])
            setProofImage(response.assets[0])

        }
        else{
            console.log("jedhfk")
        }
  
    })
   }




function CheckImages(){
  if(!proof_image && !cnicimg){
    
     setIspressed(true)

  }else{
    UploadScreenShot()
  }
}




  function UploadScreenShot (){
  setLoading(true)
   
  





  const uri =
  Platform.OS === "android"
    ? proof_image.uri
    : proof_image.uri.replace("file://", "");
const filenameI = proof_image.uri.split("/").pop();
const match= /\.(\w+)$/.exec( String(filenameI));
const ext = match?.[1];
const type = match ? `image/${match[1]}` : `image`;

  
  
  var formdata = new FormData();
  formdata.append("member_id",asyndata.user.id);
  formdata.append("member_name", asyndata.user.username);
  formdata.append("amount", "5");
  formdata.append("image", {
    uri:uri,
    name: `image.${ext}`,
    type:type,
  } );
 
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}post_reward`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.status === "200")
    {
      console.log(result)

      Alert.alert("Congratulation!","Screen Shot is uploaded Please wait for approval!")
      setLoading(false)
      
    } 
    else if(result.status === "401"){
      console.log(result)
      Alert.alert("Sorry",result.message)
      setLoading(false)
    } 
    }
      )
    .catch(error => {
      Alert.alert("Sorry","Something Went Wrong Please Try Again Later.")
      setLoading(false)
      console.log('error', error)});
  

  
  }





  return (
    <SafeAreaView style={styles.Container}>

<BackBtn/>
{/* <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      
      /> */}
<ScrollView
contentContainerStyle={{alignItems:"center"}}
>

<Text style={styles.TitleText}>Congratulations !</Text>
<Text style={styles.DescriptTxt}>You have won promotion reward on registration, Please follow the steps below to withdraw your amount.</Text>
    
 

<Text style={styles.DetailTitle}>1 : <Text style={styles.DetailTxt}>{result !="" ?result.text1:"Search for any electricity bill at your home." }</Text></Text>

<Text style={styles.DetailTitle}>2 : <Text style={styles.DetailTxt}>{result !="" ?result.text2:"Take a picture of that Bill." }</Text></Text>
<Text style={styles.DetailTitle}>3 : <Text style={styles.DetailTxt}>{result !="" ?result.text3:"Upload that picture below." }</Text></Text>
<Text style={styles.DetailTitle}>4 : <Text style={styles.DetailTxt}>Hit the submit button and your request is generated</Text></Text>







{/* <Pressable 
onPress={()=> permissionForGallery()}
>

<ImageBackground 
source={longBtn}
style={GlobalStyles.Button}

>

<Text style={GlobalStyles.BtnText}>Upload ScreenShot</Text>

</ImageBackground>
</Pressable> */}






<Text style={styles.TxtInputTitle}>
{result !="" ?result.text5:"Upload Bill's Picture." }
</Text>
<Pressable
onPress={()=>permissionForGallery()}
style={[GlobalStyles.TextInput,{borderColor: !proof_image &&isPressed === true ? Colors.danger:Colors.BgColorII

,justifyContent:"center",alignItems:'center',height:WindowHeight/4
}]}
>
{
  proof_image? <Image
  source={{uri:proof_image.uri}}
  style={{width:300,height:150,marginLeft:10  }}
  />:
  <Image
source={upload_img_icon}
style={{width:115,height:104,marginLeft:10  }}
/>
}



</Pressable>




















{/* <Pressable 
onPress={()=> permissionForGallery()}
>

<ImageBackground 
source={longBtn}
style={GlobalStyles.Button}

>

<Text style={GlobalStyles.BtnText}>Upload Selfie</Text>

</ImageBackground>
</Pressable> */}




{
  loading === false ?
  
  <Pressable 
onPress={()=> CheckImages()}
>

<ButtonBig 
title={"Submit"}
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




<View 
style={{width:100,height:100}}
/>


</ScrollView>
{/* <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      
      /> */}
    </SafeAreaView>
  )
}
export default PromotionScreen;

