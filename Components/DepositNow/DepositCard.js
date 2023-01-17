import React, { useState } from 'react';
import {

  Text,
  View,
  ImageBackground,
  Dimensions
 
} from 'react-native';
import styles from './Styles';
import Clipboard from '@react-native-clipboard/clipboard';
import Card from '../../assets/icons/card.png'
import Colors from '../GlobalStyles/Color';


const WindowWidth = Dimensions.get('window').width









function Cardd({
  item,
  methods,
  type
}){







  const AccountTitle= methods ?               
  
  
  item.Acc_Type === "OKX" ?  
  
  "OKX": item.Acc_Type === "Binance" ?  
  
  "BINANCE": item.Acc_Type === "VISA" ?  
  
  methods.bank_account_title: item.Acc_Type === "Jazzcash" ?  
  methods.jazzcash_title: item.Acc_Type === "EasyPaisa" ? 
  
  methods.easypaisa_title:""                              
  
  
  :"000000000000"

 
  // const Acc_numberr= item.Acc_Type === "OKX" ?methods ?  methods.okx_address:"" : item.Acc_Type === "Binance" ?methods ?  methods.binance_address:"" : methods ? methods.bank_account_no:"" 
  const Acc_numberr=
  
  methods ?               
  
  
  item.Acc_Type === "OKX" ?  
  
  methods.okx_address: item.Acc_Type === "Binance" ?  
  
  methods.binance_address: item.Acc_Type === "VISA" ?  
  
  methods.bank_account_no: item.Acc_Type === "Jazzcash" ?  
  methods.jazzcash_no: item.Acc_Type === "EasyPaisa" ? 
  
  methods.easypaisa_no:""                              
  
  
  :"TRADING TUBE"

  const Bank_Type=methods ? item.Acc_Type === "VISA" ?methods.bank_account_type:item.Acc_Type:item.Acc_Type
  
  

  const copyToClipboard = () => {
    Clipboard.setString('hello world')
    console.log("sdasd")
  }


  return(
    <>
    <ImageBackground 
source={Card}
style={{width:362,height:194,alignSelf:'center'}}


>
    <View style={styles.UpperCardTxt}>

    <Text style={styles.CardHeadTxt}>Trading Card</Text>

<Text style={[styles.CardHeadTxt,{color:Colors.BgColorII}]}>{Bank_Type}</Text>

    </View>
    <View style={[styles.UpperCardTxt,{marginTop:50, width:WindowWidth/1.25}]}>

    <Text style={[styles.CardHeadTxt,{textAlign:'center'}]}>Account Title{'\n'}{AccountTitle}</Text>


<View>
{
  item.Acc_Type === "OKX" || item.Acc_Type === "Binance"?
<>
  <Text 
selectable={true}
style={[styles.CardHeadTxt,{color:Colors.BgColorII,textAlign:'center'}]}>Account Number
</Text>

<Text 
selectable={true}
style={{color:"black",textAlign:'center',marginLeft:-60,fontSize:12,fontWeight:"bold"}}>{Acc_numberr}
</Text>
</>
:
<Text 
selectable={true}
style={[styles.CardHeadTxt,{color:Colors.BgColorII,textAlign:'center'}]}>Account Number{'\n'}{Acc_numberr}
</Text>
}
{/* <Text 
selectable={true}
style={[styles.CardHeadTxt,{color:Colors.BgColorII,textAlign:'center'}]}>Account Number{'\n'}{Acc_numberr}
</Text> */}


</View>



    </View>


</ImageBackground>

<Text style={{width:362,alignSelf:'center',textAlign:'left',color:Colors.danger,margin:5}}>Kindly send deposit amount on account number given above 
and after that fill the form given below.</Text>

<Text style={{width:362,alignSelf:'center',textAlign:'right',color:Colors.danger,margin:5}}>برائے مہربانی اوپر دیے گئے اکاؤنٹ نمبر پر جمع {`(Deposit amount)`}  رقم بھیجیں اور اس کے بعد نیچے دیا گیا فارم پُر کریں۔
</Text>
    </>
  )
}





 

export default Cardd;

