import React, { useState } from 'react';
import {

  Text,
  View,
  ImageBackground,
  Dimensions,
  Image
 
} from 'react-native';
import styles from './Styles';
import Clipboard from '@react-native-clipboard/clipboard';
import qrcode from '../../assets/icons/qrcode.png'
import Colors from '../GlobalStyles/Color';
import Download from '../Download/Download';
import Endpoints from '../../EnDPoints';

const WindowWidth = Dimensions.get('window').width
function Cardd({
  getMethods
}){

  return(
    <>
    {
      getMethods !=""&&
    <Image 
    source={{uri:Endpoints.ImageBaseUrl+getMethods.qr}}
    style={{
      width:140,
      height:140,
      alignSelf:'center',
      // tintColor:Colors.FontColorI
    }}
>
</Image>
}
{
  getMethods !=""&&
<Text 
onPress={()=> Download(Endpoints.ImageBaseUrl+getMethods.qr)}
style={{fontWeight:'bold',textDecorationLine:'underline',alignSelf:'center',textAlign:'center',color:Colors.send,marginTop:5}}>DOWNLOAD QR</Text>
}

<Text 
selectable={true}
style={{width:362,alignSelf:'center',textAlign:'center',color:Colors.PrimaryColor,marginTop:5}}>{getMethods !=""?getMethods.address :"N/A"}</Text>

<Text style={{width:362,alignSelf:'center',textAlign:'center',color:Colors.danger,margin:5}}>Kindly deposit amount in USD on the address / QR given above {'(Recomendation: Trust Vault)'}</Text>
    </>
  )
}

export default Cardd;

