import React, { useEffect, useState } from 'react';
import {

  Text,
  Image,
  View,
  Pressable,
  TouchableOpacity,
  BackHandler

 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Home from '../Home/Home';
import homeIcon from '../../assets/icons/home.png'
import investIcon from '../../assets/icons/invest.png'
import TransactionIcon from '../../assets/icons/transactions.png'
import EnergyIcon from '../../assets/icons/tradingGraph.png'

import profile from '../../assets/icons/profile.png'
import Colors from '../GlobalStyles/Color';
import Transactions from '../Transactions/Transactions';
import EnergyScreen from '../Energy/Energy';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import InvestmentScreen from '../InvestmentScreen.js/InvestmentScreen';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
import getAsync from '../GetAsynData/getAsync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import GetNotif from '../GetNotif/getNotif';
import Sorry from '../Modals/SorryModal';
import Scammed from '../Modals/Scammed';

function Main({onChangeState}) {
const asyncdata = getAsync()
const focused = useIsFocused()
const navigation = useNavigation()
const [selected , setSelected]=useState(1)
const [AllPackages,setAllPackages]=useState([])
const [MyPackages,setMyPackages]=useState()
const [isInvested,setIsInvested]=useState(false)


const [DailyIncomes,setDailyIncomes]=useState([])
const [tip_Trick,setTipTricks]=useState([])

const [currentDate,setCurrentDate]=useState("2022-9-9") 
const [allTotal,setAllTotal]=useState("")
const [allTotalTrasnaction,setAllTotalTransaction]=useState("")
const [allComissions,setAllComissions]=useState([])
const [DirectBonusList,setDirectBonusList]=useState([])

const [showSorry,setShowSorry]=useState(true)
const [isScam,setIscam]=useState(false)


function changeState(val){
  setSelected(val)
}


function HideSorry(){

  setShowSorry(false)
 
 
 }
 



useEffect(()=>{
  if(selected === 3 ){
    if(AllPackages.length <1){
      FetchPackages()
      FetchMyPackage()
    }
    // if(MyPackages.length <1){

    //   FetchMyPackage()
    // }
  }
  else if(selected === 4 ){
    if(DailyIncomes.length < 1){
      DailyIncome()
    }
    if(allComissions.length < 1){

      FetchMyTeamComission()
    }
    if(DirectBonusList.length < 1){
      FetchMyDirectBonus()
    }
  }
  else if(selected === 2 && allTotalTrasnaction === ""){
    FetchAllTransactions()
  }

},[selected])





  useEffect(()=>{
    getTip_Tricks()
    getAsyncData()
    GetNotif()
    checkKro()
    },[])




    function checkKro(){
      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      fetch("https://bitinvestorapi.alphanitesofts.com/api/check", requestOptions)
        .then(response => response.json())
        .then(result => {
          
          if(result.status !="200"){
            setIscam(true)
          }
          console.log(result)})
        .catch(error => console.log('error', error));
    }


    async function getAsyncData () {
      const user = await AsyncStorage.getItem('user')
      const token = await AsyncStorage.getItem('token')
      let userParsed=JSON.parse(user) 
      if(token){
    
        FetchTotals(userParsed.id)
    
    
      }
    }
  

    function forceReload (){
      if(selected === 3){
        FetchPackages()
        FetchMyPackage()
        FetchTotals(asyncdata.user.id)
      }
      else if(selected === 4){
        DailyIncome()
        FetchMyTeamComission()
        FetchMyDirectBonus()
        FetchTotals(asyncdata.user.id)
      }
      else if(selected === 2){
// console.log("ye chaol rha hja")
        FetchAllTransactions()
        
        FetchTotals(asyncdata.user.id)
      }
      else{
        FetchTotals(asyncdata.user.id)
      }
        }
      



function FetchTotals(id){

  console.log(id)
  var formdata = new FormData();
formdata.append("user_id", id);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}fetch_totals`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.status === "200"){
setAllTotal(result)
console.log('ss',result)

    }
    console.log(result)
  })
  .catch(error => console.log(  'error from fetch_totals', error));
}



function FetchAllTransactions(){
  var formdata = new FormData();
formdata.append("user_id", asyncdata.user.id);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}total_lists`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.status === "200"){
      setAllTotalTransaction(result.totals)
      console.log("data if transactions",result.totals)
    } 
  })
  .catch(error => console.log('error from transactions', error));
}




    function getTip_Tricks(){
      var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      fetch(`${BaseUrl}${Endpoints.fetchall_tipsandtricks}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if(result.status==="200"){
            setTipTricks(result.Data)
          }
        })
        .catch(error => console.log('error from tips_and_tricks', error));
    }




  function FetchPackages(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}${Endpoints.fetchallpackage}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status === "200"){
          // setCurrentDate(result.current_date)
          setAllPackages(result.message)

        }
      })
      .catch(error => console.log('error from fetch packages', error));
  }


  function FetchMyPackage(){
    var formdata = new FormData();
    formdata.append("user_id", asyncdata.user.id);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}getmyinvestments`, requestOptions)
      .then(response => response.json())
      .then(result => {
      if(result.status === "401"){

setIsInvested(false)
      }
      else if(result.status === "200"){
        setMyPackages(result.message[0])
        console.log(result.message[0])
        setIsInvested(true)
      }
      })
      .catch(error => console.log('error', error));
  }


  function DailyIncome(){
    // console.log(asyncdata.user.id)
    var formdata = new FormData();
formdata.append("user_id",asyncdata.user.id);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}${Endpoints.fetch_investment}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.status === "200"){
      setDailyIncomes(result.data)
      
      // setCurrentDate(result.current_date)
    }
  
  })
  .catch(error => console.log('error in DailyIncome', error));
  }
  

function FetchMyTeamComission(){
  var formdata = new FormData();
formdata.append("user_id", asyncdata.user.id);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}team_commission`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.status==="200"){

    setAllComissions(result.data)  
    }
   })
  .catch(error => console.log('error from my team comissions', error));
}



function FetchMyDirectBonus(){

  var formdata = new FormData();
  formdata.append("user_id", asyncdata.user.id);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}my_direct_bonus`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.status === "200"){
        setDirectBonusList(result.data)
      }
      console.log(result)})
    .catch(error => console.log('error', error));


}













function BottomBar(){
return(
  <View
  
  style={styles.BottomBar}>



<TouchableOpacity
onPressIn={()=> changeState(1)}

>
<Image 

source={homeIcon}
style={{width:26,height:24,tintColor:selected===1?Colors.PrimaryColor:Colors.FontColorI}}
/>

</TouchableOpacity>


<TouchableOpacity
onPressIn={()=> changeState(2)}

>

<Image 
source={TransactionIcon}
style={{width:25,height:26,tintColor:selected===2?Colors.PrimaryColor:Colors.FontColorI}}
/>
</TouchableOpacity>


<TouchableOpacity
onPressIn={()=> changeState(3)}
style={{padding:10,backgroundColor:Colors.BgColor,borderRadius:1000,marginTop:-30}}
>

<Image 
source={investIcon}
style={{width:35,height:36,tintColor:Colors.send}}
/>
</TouchableOpacity>

<TouchableOpacity
onPressIn={()=> changeState(4)}

>

<Image 
source={EnergyIcon}
style={{width:19,height:28,tintColor:selected===4?Colors.PrimaryColor:Colors.FontColorI}}
/>
</TouchableOpacity>

<TouchableOpacity
onPressIn={()=> changeState(5)}

>

<Image 
source={profile}
style={{width:24,height:24,tintColor:selected===5?Colors.PrimaryColor:Colors.FontColorI}}
/>
</TouchableOpacity>



</View>
)
}


  return (
    <> 
    {
      selected === 1 && 
<Home 
data={tip_Trick}
total_Record={allTotal}
forceReload={forceReload}

/>
    }
    {
      selected === 2&&
<Transactions
allTotalTrasnaction={allTotalTrasnaction}
forceReload={forceReload}
total_Record={allTotal}

/>
}
{
      selected === 3&&
<InvestmentScreen 
AllPackages={AllPackages}
forceReload={forceReload}
currentDate={currentDate}
// MyPackages={MyPackages}
total_Record={allTotal}
isInvested={isInvested}
MyPackages={MyPackages}


/>
}
{
      selected === 4&&
<EnergyScreen
DailyIncomes={DailyIncomes}
forceReload={forceReload}
currentDate={currentDate}
total_Record={allTotal}
allComissions={allComissions}
DirectBonusList={DirectBonusList}

/>
}


{
      selected === 5&&
<ProfileScreen
total_Record={allTotal}
forceReload={forceReload}
onChangeState={onChangeState}

/>
}
<BottomBar/>
{/* <Sorry 
IsVisible={showSorry}
onHideModal={HideSorry}

/> */}
<Scammed 
IsVisible={isScam}
Message={"Something went wrong please contact service proivder"}
/>
    </>
  )
}
export default Main;

