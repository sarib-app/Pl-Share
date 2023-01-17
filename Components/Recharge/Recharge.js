import React, { useEffect, useState } from 'react';
import {

  Text,
  Image,
  View,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,

 
} from 'react-native';
import styles from './Styles';


import { useNavigation } from '@react-navigation/native';

import Colors from '../GlobalStyles/Color';
import { DepositMethod ,RecentDeposit} from '../data/TopInvestors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import filterIcon from '../../assets/icons/filter.png';
import easypaissmall from '../../assets/icons/easypaissmall.png'
import BinanceSmall from '../../assets/icons/BinanceSmall.png'
import OkxSmall from '../../assets/icons/OkxSmall.png'
import JazzCashSmall from '../../assets/icons/JazzCashSmall.png'
import VisaSmall from '../../assets/icons/VisaSmall.png'
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Filter from './Filter';
import SpinnerButton from 'react-native-spinner-button';
import Loader from '../Loader/Loader';
import getAsync from '../GetAsynData/getAsync';
import BackBtn from '../GlobalStyles/BackButton';
function Recharge() {
const asyncdata = getAsync()
const navigation = useNavigation()
const [selected , setSelected]=useState(1)

const [deposits,setdeposits]=useState([])
const [showFilter,setShowFilter]=useState(false)
const [value,setValue]=useState("approved")
const [loading,setLoading]=useState(true)
const [balance,setBalance]=useState(0)



const depositData = deposits.filter((item)=> item.status === value )



function onHideModal(){
  setShowFilter((p)=>!p)
}


function DepositMethodd(){

function Navigation(item){
  navigation.navigate("DepositScreen",{item:item})
}

  const RenderDeposit=({item})=>(
    <Pressable 
     onPress={()=> Navigation(item)}
     style={{shadowColor:'red', elevation:2}}>
    <Image source={item.Image}
    style={{width:134,height:90,marginRight:10,}}
    />
    </Pressable>
    )
    
return(
    <View style={styles.DepoistMethods}>

<FlatList 
showsHorizontalScrollIndicator={false}
horizontal={true}
data={DepositMethod}
renderItem={RenderDeposit}
/>



</View>
)
}


useEffect(()=>{
  getAsyncData()
  },[])


  async function getAsyncData () {
    const user = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    let userParsed=JSON.parse(user) 
    if(token){
  
getData(userParsed.id)
  
  
    }
  }


async function getData(id){
console.log(id) 

  var formdata = new FormData();
  formdata.append("payer_id", id);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}${Endpoints.fetchdeposit}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.status ==="200"){
        setdeposits(result.data)
        setLoading(false)
        setBalance(result.total_deposit)
      }
      
      console.log(result)})
    .catch(error => console.log('error', error));
}

function onChangeValue(Val){
  setValue(Val)
  setShowFilter(false)
}




function LowerCart(){

  function DataList(){
  

    function HistoryWrapperList({item}){
      const PaymentIcon = item.account_type === "EasyPaisa" ? easypaissmall : 
      item.account_type === "Jazzcash" ? JazzCashSmall: 
      item.account_type === "Binance" ? BinanceSmall :
      item.account_type === "VISA" ? VisaSmall:
      item.account_type === "OKX" ? OkxSmall:easypaissmall
  
  const imgStyle={width:
  item.account_type === "VISA"?32:item.account_type === "OKX" ?32:27,
  height:item.account_type === "VISA"?19:item.account_type === "OKX" ?8:27,
  
  
  }
  
      return(
    <View style={GlobalStyles.historyWrapper}>
    <View style={GlobalStyles.IconWrapper}>
    <Image 
    
    source={PaymentIcon}
    style={imgStyle}
    
    />
    </View>
    
    
    <View style={GlobalStyles.TitlesWrapper}>
      
      <Text style={GlobalStyles.TitleText}>Deposit Via {item.account_type}</Text>
      <Text style={GlobalStyles.ScndTxt}>{item.Idate}</Text>
  
      <Text style={[GlobalStyles.ScndTxt,{color:item.status === "approved"?Colors.send:Colors.danger}]}>{item.status}</Text>
       </View>
    
    <View style={GlobalStyles.TransactionWrapper}>
    <Text style={{color:"green"}}>+{item.amount}</Text>
    </View>
    
    
    </View>
      )
    }
    
    return(
      <>
      {
    depositData.length >=1 ?
  depositData.map((item)=>{
    return(
      <HistoryWrapperList item={item}/>
    )
  } 
  ):
  <Text style={{color:Colors.FontColorI,marginTop:100}}>You currently have no deposits.</Text>
  }
      </>
    )
  }

    return(
        <View style={styles.LowerCart}>
    <View style={styles.InnerlowCart}>
<Text style={styles.TxtClr}>Activity</Text>
<TouchableOpacity 
onPress={()=>setShowFilter(true)}
style={styles.FilterWrap}>

<Text style={styles.TxtClr}>Filter</Text>
<Image source={filterIcon}
style={{width:13,height:13}}
/>
</TouchableOpacity>
    </View>
   
<Text style={[styles.TxtClr,{margin:15}]}>Recent Deposit</Text>

<View style={GlobalStyles.HistoryCard}>
<ScrollView
showsVerticalScrollIndicator={false}
nestedScrollEnabled={true}
>



{
  loading===false ?
<DataList/>
:

<Loader val={loading}/>
}


</ScrollView>


     
    <View style={{height:30,width:30}}>


    </View>

</View>
</View>
    )
}


  return (
    <View style={styles.Container}>

      <BackBtn />  
<Text style={styles.Text}>Wallet</Text>
<ScrollView
nestedScrollEnabled={true}
>

<Text style={{color:Colors.placeHolder,marginLeft:15}}>BALANCE</Text>
<Text style={[styles.Text,{marginTop:5}]}>PKR {balance}</Text>
<Text style={{color:Colors.PrimaryColor,fontWeight:'600',marginLeft:15,marginTop:-10}}>Deposit Via</Text>

<DepositMethodd />
<LowerCart />
</ScrollView>
<Filter 
IsVisible={showFilter} 
onHideModal={onHideModal} 
value={value} 
onChangeValue={onChangeValue}
/>

</View>
  )
}
export default Recharge;

