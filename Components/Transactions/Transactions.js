import React, { useState,useCallback,useEffect } from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
RefreshControl,

 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Profile from '../../assets/icons/5.png'
import Colors from '../GlobalStyles/Color';

import LinearGradient from 'react-native-linear-gradient';
import credited from '../../assets/icons/credited.png'
import debited from '../../assets/icons/debited.png'
import GlobalStyles from '../GlobalStyles/GlobalStyles';


import {TipsTricks,DepositTransaction} from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler'; 
import { TransactionIcons } from '../data/TopInvestors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Endpoints from '../../EnDPoints';
// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7224745157985009/9676971080';

function Transactions({allTotalTrasnaction,forceReload,total_Record}) {
  const [selected,setSelected]=useState("Investment")
  const [refreshing, setRefreshing] = useState(false);

const navigation = useNavigation()
const [user,setUser] = useState({
  firstname:"",
  lastname:"",
  phone:"",
  pro_pic:""
 
})
useEffect(()=>{
  getAsyncData()
  },[])


  async function getAsyncData () {
    const user = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    let userParsed=JSON.parse(user) 
    if(token){
      setUser(userParsed)
    // getData(userParsed.id) 
    }
  }


const start={x: 0.1, y: 0.8}
const end = {x: 0, y: 0}

const onRefresh = useCallback(() => {

  forceReload()
  setRefreshing(true)
  setTimeout(() => {
  setRefreshing(false)
 
},2000);


}, [])




const data = allTotalTrasnaction !=""?  selected === "Deposit"? allTotalTrasnaction.deposits : selected === "Income" ? allTotalTrasnaction.incomes 
: selected === "Withdraw" ? allTotalTrasnaction.withdrawls : allTotalTrasnaction.investments :""


console.log(data)


function UpperCart(){

  const totalIncome = Number(total_Record !=""? total_Record.Total_income:0)


function IconList ({item}){
  return(
    <Pressable 
onPress={()=> {
  setSelected(item.name)
}}
style={styles.iconWrapper}>
<LinearGradient 
 colors= { selected === item.name ?[Colors.PrimaryColor, Colors.SeconderyColor]:[Colors.bgIv, Colors.bgIv]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={item.icon}
style={{width:item.width,height:item.height,tintColor:Colors.FontColorI}}

/>


</LinearGradient>
<Text style={{color:"white"}}>{item.name}</Text>
</Pressable>

  )
}





  return(
<View style={styles.UpperCart}>
<Text style={styles.balanceTitle}>Total {selected}</Text>
<Text style={styles.BalanceTxt}>PKR {selected === "Deposit"? total_Record !=""? total_Record.Total_deposit:0 : selected === "Income" ? total_Record !=""? totalIncome.toFixed(2):0 
: selected === "Withdraw" ? total_Record !=""? total_Record.Total_withdrawl:0 : total_Record !=""? total_Record.Total_investment:0}</Text>

<View style={styles.LvlContainer}>
<Text style={styles.LvlTxt}>Level <Text style={styles.LvlinnerTxt}>{total_Record !=""? total_Record.my_level:0}</Text></Text>
</View>


<View 
style={styles.catSection}>


<FlatList 
showsHorizontalScrollIndicator={false}
contentContainerStyle={{justifyContent:"space-between"}}
horizontal
scrollEnabled={true}
data={TransactionIcons}
renderItem={({item})=>
<IconList
item={item}
/>
}
/>
</View>


</View>
  )
}











function LowerCart(){
  // const data = selected==="All"?DepositTransaction:DepositTransaction.filter((item)=>item.type===selected)
  const TransactionList =({item})=>{

  const amountClr= selected === "Deposit"?Colors.deposit:selected === "Withdraw"?Colors.danger:Colors.send
  const transIcon =selected === "Deposit"?credited:debited
  const operator = selected ==="Withdraw"?"-":"+"

    const [isOpen ,setIsOpen]=useState(false)
  
  return(
    <View style={styles.TrickContainer}>
  
  
  <View style={{flexDirection:'row',alignItems:"center"}}>
  <View style={styles.IconWrapper}>
  
  <Image 
  style={{width:22,height:22,tintColor:amountClr}} 
  source={transIcon}
  />
  
  
  </View>
  
  
  
  <View style={styles.InnerTricks}>
  <Text style={{fontWeight:'bold',fontSize:18,color:Colors.FontColorI}}>{selected}</Text>
  <Text style={{color:Colors.FontColorII}}>{ selected === "Income" ?  moment(item.earn_date).format('YYYY-MM-DD'):moment(item.created_at).format('YYYY-MM-DD')}</Text>
  
  </View>
  
  
  </View>
  
  
  <Text style={[styles.TransactionText,{color:amountClr}]}>{operator}{selected === "Deposit"? item.amount : selected === "Income" ? Number(item.balance_got).toFixed(2) 
: selected === "Withdraw" ? item.requested_amount : item.applied_price} PKR</Text>
  
  
  </View>
  
  
  )
  }

return(
  <View style={styles.LowerCart}>
  <Text style={styles.L_Cart_Title}>Recenet Transactions</Text>




<ScrollView
showsVerticalScrollIndicator={false}
nestedScrollEnabled={true}
>
{ data !="" ? data.length <1 ?

<Text style={{color:Colors.FontColorII,fontSize:18,marginTop:40,alignSelf:"center"}}>No data found!</Text>:
data.map((item)=>{
  return(
    <TransactionList item={item} />

  )
}):<Text style={{color:Colors.FontColorII,fontSize:18,marginTop:40,alignSelf:"center"}}>No data found!</Text>}
<View style={{height:150,width:100}}>

</View>
</ScrollView>




</View>

)
}





  return (
    <SafeAreaView style={styles.Container}>

<View style={GlobalStyles.HeaderWrapper}>
<View style={styles.Header}>
    <Text style={styles.OuterTxt}>Weclcome To{'\n'} <Text style={styles.InnerTxt}>Transactions</Text></Text>
    { user.pro_pic === "" || user.pro_pic === "default"?
        
        <Image source={Profile} style={{width:50,height:50}}/>
      :  
      <Image source={{uri:Endpoints.ImageBaseUrl+user.pro_pic}} style={{width:50,height:50,borderRadius:1000}}/>

      }
      </View>

</View>

{/* 
<BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      
      /> */}
<ScrollView nestedScrollEnabled={true}
 refreshControl={
  <RefreshControl
  refreshing={refreshing}
  onRefresh={onRefresh}
  


  />
}
>
<View style={[GlobalStyles.BgCart,{padding:20}]}>

<UpperCart/>
</View>
<LowerCart/>

</ScrollView>

    </SafeAreaView>
  )
}
export default Transactions;

