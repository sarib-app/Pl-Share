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
function Main({onChangeState}) {
const asyncdata = getAsync()
const focused = useIsFocused()
const navigation = useNavigation()
const [selected , setSelected]=useState(1)
const [AllPackages,setAllPackages]=useState([])
const [MyPackages,setMyPackages]=useState([])

const [DailyIncomes,setDailyIncomes]=useState([])
const [tip_Trick,setTipTricks]=useState([])

const [currentDate,setCurrentDate]=useState("2022-9-9") 
const [allTotal,setAllTotal]=useState("")
const [allTotalTrasnaction,setAllTotalTransaction]=useState("")
const [allComissions,setAllComissions]=useState([])
const [showSorry,setShowSorry]=useState(true)


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
    
    }
    if(MyPackages.length <1){

      FetchMyPackage()
    }
  }
  else if(selected === 4 ){
    if(DailyIncomes.length < 1){
      DailyIncome()
    }
    if(allComissions.length < 1){

      FetchMyTeamComission()
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
    },[])

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
        FetchTotals(asyncdata.user.id)
      }
      else if(selected === 2){
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
console.log(result)

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
    } 
  })
  .catch(error => console.log('error', error));
}




    function getTip_Tricks(){
      var requestOptions = {
        method: 'GET',
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
          setCurrentDate(result.current_date)
          setAllPackages(result.Packages)

        }
      })
      .catch(error => console.log('error', error));
  }


  function FetchMyPackage(){
    var formdata = new FormData();
formdata.append("investor_id", asyncdata.user.id);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}fetchInvestment`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.status==="200"){
     
      setMyPackages(result.data)

    }
   })
  .catch(error => console.log('error', error));
  }


  function DailyIncome(){
    console.log(asyncdata.user.id)
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

      console.log('Comission',result)
    setAllComissions(result.data)  
    }
   })
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
style={{width:29,height:27,tintColor:selected===1?Colors.PrimaryColor:Colors.FontColorI}}
/>

</TouchableOpacity>


<TouchableOpacity
onPressIn={()=> changeState(2)}

>

<Image 
source={TransactionIcon}
style={{width:32,height:24,tintColor:selected===2?Colors.PrimaryColor:Colors.FontColorI}}
/>
</TouchableOpacity>


<TouchableOpacity
onPressIn={()=> changeState(3)}

>

<Image 
source={investIcon}
style={{width:30,height:31,tintColor:selected===3?Colors.PrimaryColor:Colors.FontColorI}}
/>
</TouchableOpacity>

<TouchableOpacity
onPressIn={()=> changeState(4)}

>

<Image 
source={EnergyIcon}
style={{width:30,height:25,tintColor:selected===4?Colors.PrimaryColor:Colors.FontColorI}}
/>
</TouchableOpacity>

<TouchableOpacity
onPressIn={()=> changeState(5)}

>

<Image 
source={profile}
style={{width:29,height:27,tintColor:selected===5?Colors.PrimaryColor:Colors.FontColorI}}
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
MyPackages={MyPackages}
total_Record={allTotal}


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
<Sorry 
IsVisible={showSorry}
onHideModal={HideSorry}

/>
    </>
  )
}
export default Main;

