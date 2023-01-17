import React, { useState } from 'react';
import {

  Text,
  Image,
  View,
  TextInput,
  ImageBackground,
  Pressable,
  Dimensions,
  Alert,
  
 
} from 'react-native';
import styles from '../DepositNow/Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import title_icon from '../../assets/icons/account_title.png'
import acc_numb_icon from '../../assets/icons/acc_numb.png'
import acc_type_icon from '../../assets/icons/acc_type.png'
import amount_icon from '../../assets/icons/amount.png'
import upload_img_icon from '../../assets/icons/upload_img.png'
import Card from '../../assets/icons/card.png'
import Colors from '../GlobalStyles/Color';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Button from './../../assets/icons/longBtn.png'
import SpinnerButton from 'react-native-spinner-button';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
import getAsync from '../GetAsynData/getAsync';
import BankAllList from '../BankAllList/BankAllList';

const WindowHeight = Dimensions.get('window').height; 

function Withdraw_now({route}) {
const asyncdata= getAsync()
const item = route.params.item
console.log(item)
const [Acc_Title,setAcc_title]=useState(item.Acc_Type === "OKX" || item.Acc_Type === "Binance"? item.Acc_Type:"")
const [Acc_Number,setAcc_Number]=useState()
const [Acc_Type,setAcc_Type]=useState(item.Acc_Type)
const [Account_Subtype,setAcc_SubType]=useState(item.Acc_Type === "VISA" || item.Acc_Type === "OKX" || item.Acc_Type === "Binance"? "":item.Acc_Type)
const [Amount,setAmount]=useState()
const [isPressed,setIsPressed]=useState(false)
const [loading,setLoading]=useState(false)
const [showBanks,setShowBank]=useState(false)





function onWithdraw(){
   if(Acc_Title !="" && Acc_Number && Acc_Type && Account_Subtype && Amount ){
if(Amount < 500){
  Alert.alert("Sorry","Minimum withdraw is 500 Rs.")
}else{

  Withdraw()
}
   }else{
    setIsPressed(true)
   }
}


function Withdraw (){
  const Percent_Amount = (Amount/100)*95
  setLoading(true)

  var formdata = new FormData();
  formdata.append("account_title",Acc_Title);
  formdata.append("account_type", Acc_Type);
  formdata.append("account_subtype", Account_Subtype);

  formdata.append("account_number", Acc_Number);
  formdata.append("requested_amount", Amount);
  formdata.append("user_id", asyncdata.user.id);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
    fetch(`${BaseUrl}${Endpoints.withdrawal}`, requestOptions)
    .then(response => response.json())
    .then(result =>
      {
        console.log(result)
        if(result.status==="200")
         {
          setLoading(false)
          Alert.alert("Congratulations","Your withdrawal request has been sent!")
          navigation.navigate("Main")
         }
         else if(result.status==="401"){
          setLoading(false) 
        Alert.alert("Sorry",result.message)
        }
      })
    .catch(error => {
      setLoading(false)
      Alert.alert("Ooops","Something Went Wrong Please try again later.")
      
      console.log('error', error)});



}




function onSelectBank (val){
  setShowBank(false)
   setAcc_SubType(val)

}







const navigation = useNavigation()


  return (
<SafeAreaView style={styles.Container}>
<Text style={styles.TxtColor}>Withdraw</Text>
<ScrollView>
<Text style={{width:362,alignSelf:'center',textAlign:'left',color:Colors.danger,margin:5}}>Please add the account number on which you want your payments to be received.</Text>
<Text style={{width:362,alignSelf:'center',textAlign:'right',color:Colors.danger,margin:5}}>

 براہ کرم وہ اکاؤنٹ نمبر شامل کریں جس پر آپ اپنی ادائیگیاں وصول کرنا چاہتے ہیں۔

</Text>

<Text style={{width:362,alignSelf:'center',textAlign:'left',color:Colors.FontColorI,margin:5}}>Our Withdrawal fee is <Text style={{fontWeight:"bold",fontSize:18,color:Colors.danger}}>5%</Text></Text>
<Text style={{width:362,alignSelf:'center',textAlign:'left',color:Colors.FontColorI,margin:5}}>Minimum withdraw is Rs <Text style={{fontWeight:"bold",fontSize:18,color:Colors.send}}>500</Text></Text>


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
onPress={()=> setShowBank(true)}
style={[GlobalStyles.TextInput,{borderColor: !Account_Subtype &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_type_icon}
style={{width:24,height:19,marginLeft:10  }}
/>

<TextInput
placeholder='Please Select Currency'
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
  Wallet Address
</Text> 
<View
style={[GlobalStyles.TextInput,{borderColor: !Acc_Number &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_numb_icon}
style={{width:27,height:20,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Wallet Address'
value={Acc_Number}

onChangeText={(e)=> setAcc_Number(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>



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
</>  
  
  :
<>


<Text style={styles.TxtInputTitle}>
  Account Title
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: Acc_Title ==="" &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
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
style={[GlobalStyles.TextInput,{borderColor: !Acc_Number &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
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
placeholder='Please Select Bank SubType'
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


</>


}


{loading === false ?


<Pressable 
onPress={()=> onWithdraw()}
>

<ImageBackground 
source={Button}
style={[GlobalStyles.Button,{alignSelf:'center'}]}

>

<Text style={GlobalStyles.BtnText}>Withdraw</Text>

</ImageBackground>
</Pressable>:
<SpinnerButton
                        buttonStyle={{  backgroundColor: Colors.PrimaryColor,
                        borderRadius: 6}}
                        isLoading={loading}
                        spinnerType='PulseIndicator'
                        indicatorCount={0}
>

</SpinnerButton>
}

<View style={{width:50,height:300}}></View>
</ScrollView>
<BankAllList 
    isVisible={showBanks}
    onSelectBank={onSelectBank}
    route={item.Acc_Type}

/>
    </SafeAreaView>
  )
}
export default Withdraw_now;

