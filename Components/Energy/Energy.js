import React, { useState,useCallback ,useEffect} from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
RefreshControl,
Alert
 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Profile from '../../assets/icons/5.png'
import Colors from '../GlobalStyles/Color';

import credited from '../../assets/icons/credited.png'
import debited from '../../assets/icons/debited.png'
import all from '../../assets/icons/all.png'

import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import {DepositTransaction,TeamsComission,DailyIncomeData} from '../data/TopInvestors';
import DailyIncome from '../../assets/icons/withdrawII.png'
import TeamComission from '../../assets/icons/TeamComission.png'
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
import moment from 'moment';
import GlobalProgressLoader from '../LoadingModal/LoadingModal';
import getAsync from '../GetAsynData/getAsync';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7224745157985009/9676971080';
function EnergyScreen({
  DailyIncomes,
  forceReload,
  currentDate,
  total_Record,
  allComissions,
  DirectBonusList

}) {
  const [user,setUser]=useState({
    firstname:"",
    lastname:"",
    phone:"",
    pro_pic:""
   
 })
  const asyncdata = getAsync()
  const [refreshing, setRefreshing] = useState(false);

  const [selected,setSelected]=useState("Income")
  const [utcDate,setUtcDate]=useState("00")
  const [utcTime,setUtcTime]=useState("00")


 
const navigation = useNavigation()


const start={x: 0.1, y: 0.8}
const end = {x: 0, y: 0}


// const LowerCardTitle = selected === "Income"?"Daily Income":"Team's Comission"
const LowerCardTitle = selected === "Income"?"Daily Income":selected==="Bonus"?"Direct Bonus":"Network Bonus"





const onRefresh = useCallback(() => {

  forceReload()
  setRefreshing(true)
  setTimeout(() => {
  setRefreshing(false)
 
},2000);


}, [])

useEffect(()=>{

  getUtcHours()

  getAsyncData()
  },[])


  function getUtcHours(){
    var date = moment()
    .utcOffset('+00:00')
    .format('YYYY-MM-DD  hh:mm:ss a');

setUtcDate(date)

  }

  async function getAsyncData () {
    const user = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    let userParsed=JSON.parse(user) 
    if(token){
      setUser(userParsed)
    // getData(userParsed.id) 
    }
  }



function UpperCart(){


const totalIncome = Number(total_Record !=""? total_Record.Total_income:0)


  return(


<View style={styles.UpperCart}>
<Text style={styles.balanceTitle}>Total {"Income"}</Text>
<Text style={styles.BalanceTxt}>USD {totalIncome}</Text>

<View style={styles.LvlContainer}>
<Text style={styles.LvlTxt}>Level <Text style={styles.LvlinnerTxt}>{total_Record !=""? total_Record.my_level:0}</Text></Text>
</View>


<View 
style={[styles.catSection,{ justifyContent:'space-evenly'}]}>
<Pressable
onPress={()=> setSelected("Income")}
style={{alignItems:'center'}}
>

<LinearGradient 
 colors={[ selected === "Income"? Colors.PrimaryColor:Colors.bgIv, selected === "Income"? Colors.SeconderyColor:Colors.bgIv]}
 start={start} end={end}     
style={styles.iconWrapper}>


<Image
style={{width:46,height:46,tintColor:selected === "Income"?Colors.BgColor:Colors.FontColorI}}
source={DailyIncome}
/>


</LinearGradient>
<Text style={{color:Colors.FontColorI}}>
Daily Income
</Text>
</Pressable>

<Pressable
onPress={()=> setSelected("Comission")}
style={{alignItems:'center'}}

>


<LinearGradient 
 colors={[ selected === "Comission"?  Colors.PrimaryColor:Colors.bgIv, selected === "Comission"?Colors.SeconderyColor:Colors.bgIv]}
 start={start} end={end}     
style={styles.iconWrapper}>


<Image
style={{width:44,height:44,tintColor:selected === "Comission"?Colors.BgColor:Colors.FontColorI}}
source={TeamComission}
/>


</LinearGradient>

<Text style={{color:Colors.FontColorI}}>
Network Bonus
</Text>

</Pressable>

<Pressable
onPress={()=> setSelected("Bonus")}
style={{alignItems:'center'}}

>


<LinearGradient 
 colors={[ selected === "Bonus"?  Colors.PrimaryColor:Colors.bgIv, selected === "Bonus"?Colors.SeconderyColor:Colors.bgIv]}
 start={start} end={end}     
style={styles.iconWrapper}>


<Image
style={{width:44,height:44,tintColor:selected === "Bonus"?Colors.BgColor:Colors.FontColorI}}
source={all}
/>


</LinearGradient>

<Text style={{color:Colors.FontColorI}}>
Direct Bonus
</Text>

</Pressable>



</View>
</View>  )
}











function LowerCart(){
  const data = selected=== "Income"? DailyIncomes: selected === "Bonus"?DirectBonusList: allComissions 









  
  const TransactionList =({item})=>{







  const amountClr= Colors.send
  const transIcon = debited
  const operator = "+"

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
  <Text style={{fontWeight:'bold',fontSize:18,color:Colors.FontColorI}}>Comission</Text>
  

    <>
    <Text style={{color:Colors.FontColorI}}>Mem Name: {item.username}</Text>
    <Text style={{color:Colors.FontColorI}}>Mem Id: {item.commission_from}</Text>
    </>




  </View>
  
  
  </View>
  
  <View style={{alignItems:"center"}}>
  <Text style={[styles.TransactionText,{color:amountClr}]}>{operator}{item.commission} USD{'\n'}</Text>



  </View>


  
  </View>
  
  
  )
  }






  const DirectBonus =({item})=>{







    const amountClr= Colors.send
    const transIcon = debited
    const operator = "+"
  
      const [isOpen ,setIsOpen]=useState(false)
    
    return(
      <View style={styles.TrickContainer}>
    
    
    <View style={{flexDirection:'row',alignItems:"center",justifyContent:"space-around"}}>
    <View style={styles.IconWrapper}>
    
    <Image 
    style={{width:22,height:22,tintColor:amountClr}} 
    source={transIcon}
    />
    
    
    </View>
    
    
    
    <View style={styles.InnerTricks}>
    <Text style={{fontWeight:'bold',fontSize:18,color:Colors.FontColorI}}>Bonus</Text>
    
  
      <>
      <Text style={{color:Colors.FontColorI}}>Member Name: {item.username}</Text>
      <Text style={{color:Colors.FontColorI}}>Member Code: {item.commission_from}</Text>
      <Text style={{color:Colors.send}}>Amount: {item.commission}</Text>

      </>
  
  
  
  
    </View>
    
    
    </View>
    
    <View style={{alignItems:"center"}}>
    <Text style={[styles.TransactionText,{color:amountClr}]}>{operator}{item.commission} USD{'\n'}</Text>
  
  
  
    </View>
  
  
    
    </View>
    
    
    )
    }
  









  function DailyIncomeSingle({item}){

    const [showProgressLoader,setshowProgressLoader]=useState(false)
    function onHideLoader(){
    setshowProgressLoader((p)=>!p)
    }

    const s_TIME= item.start_time
    const END_TIME = item.current_time
var startTime = moment(s_TIME, 'HH:mm:ss');
var endTime = moment(END_TIME, 'HH:mm:ss');
var duration = moment.duration(endTime.diff(startTime));
var hours = parseInt(duration.asHours());
var minutes = parseInt(duration.asMinutes()) % 60;
    const [refreshing ,setRefreshing]=useState(false)
    function UpdateIncome(){
      forceReload()
      setRefreshing(true)
      setTimeout(() => {
      setRefreshing(false)
     
    },2000);
    }



    function CollectAmount(){

setshowProgressLoader(true)


      var formdata = new FormData();
      formdata.append("id", item.id);
      formdata.append("amount", item.amount);
      formdata.append("current_time", item.current_time);
      formdata.append("start_time", item.start_time);
      formdata.append("end_time", item.end_time);
      
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      
      fetch(`${BaseUrl}getsingle_invest`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if(result.status === "200"){
            forceReload()
            onHideLoader()
            Alert.alert("Congratulations","Income Received.")
          }
          
          console.log(result)})
        .catch(error => {
          onHideLoader()
          Alert.alert("Sorry","Something Went Wrong Please try again later.")
          
          console.log('error', error)});
  
  
  
    }
  
  


   












    return(

<View style={styles.SingleIncome}>
<View style={styles.SingleII}>

<Text style={styles.SingleIncomeText}>
 Id: {item.id}
</Text>




{/* <Text style={styles.SingleIncomeText}>
  Package Start Date: {item.start_date}
</Text>
<Text style={styles.SingleIncomeText}>
  Package Start Time: {item.started_time}
</Text>

<Text style={styles.SingleIncomeText}>
  Esitmated Earning: {item.cycle_earning}
</Text> */}
<Text style={styles.SingleIncomeText}>
  Recieved At: {item.created_at}
</Text>

{/* {refreshing === true ?

<Text style={[styles.SingleIncomeText,{color:Colors.deposit,textDecorationLine:'underline'}]}>
 Loading......
</Text>


:
<Pressable
onPress={()=>  UpdateIncome()}
style={{flexDirection:"row"}}>
<Text style={[styles.SingleIncomeText,{color:Colors.deposit,textDecorationLine:'underline'}]}>
  Refresh Income
</Text>
<Image 
source={{uri:"https://img.icons8.com/ios/50/null/update-left-rotation.png"}}
style={{width:20,height:20,tintColor:Colors.deposit}}
/>

</Pressable>
} */}

<Text style={[styles.SingleIncomeText,{color:Colors.send}]}>
  Income: {item.amount}
</Text>
</View>


  <View style={{alignItems:"center",marginRight:10}}>

{/* {
  hours >=1 ? 
  <Text
  onPress={()=>  CollectAmount()}
  style={[styles.TransactionText,{color:Colors.deposit}]}>Collect</Text>:
<Text   style={[styles.TransactionText,{color:Colors.placeHolder}]}>Pending</Text>


} */}
  


  </View>
  {
  showProgressLoader === true &&
<GlobalProgressLoader 
IsVisible={showProgressLoader} 
onHideLoader={onHideLoader} 

/>

}
</View>


    )
  }











return(
  <View style={styles.LowerCart}>
  <Text style={styles.L_Cart_Title}>{LowerCardTitle}</Text>
  {/* <Text style={{color:Colors.danger,marginLeft:20,fontWeight:'bold',fontSize:17}}>Note:<Text style={{color:Colors.FontColorI,fontWeight:'500',fontSize:14}}> Daily income refreshes at 12:00 am.</Text></Text> */}




<ScrollView
showsVerticalScrollIndicator={false}
nestedScrollEnabled={true}
>
{
data.length < 1?
<Text style={{color:Colors.FontColorI,fontSize:18,marginTop:40,alignSelf:"center"}}>No data found!</Text>:
data.map((item)=>{
  return(<>
  {
    selected === "Income"? <DailyIncomeSingle item={item}/>:selected==="Bonus"?
    <DirectBonus item={item} />

:
    <TransactionList item={item} />
  }

  </>
  )
})}





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
    <Text style={styles.OuterTxt}>Weclcome To{'\n'} <Text style={styles.InnerTxt}>Daily Transaction</Text></Text>




    { user.pro_pic === "" || user.pro_pic === "default"?
        
        <Image source={Profile} style={{width:50,height:50}}/>
      :  
      <Image source={{uri:Endpoints.ImageBaseUrl+user.pro_pic}} style={{width:50,height:50,borderRadius:1000}}/>

      }




</View>
</View>
{/* <BannerAd
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
  
<View style={GlobalStyles.BgCart}>
<UpperCart/>
</View>
<LowerCart/>

</ScrollView>




    </SafeAreaView>
  )
}
export default EnergyScreen;

