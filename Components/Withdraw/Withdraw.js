import React, { useState ,useEffect} from 'react';
import {

  Text,
  Image,
  View,
  Pressable,

 
} from 'react-native';
import styles from '../Recharge/Styles';


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
import getAsync from '../GetAsynData/getAsync';
import Loader from '../Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Filter from '../Recharge/Filter';
import BackBtn from '../GlobalStyles/BackButton';
function Withdraw() {
  const asyncdata = getAsync()
const [Withdraw,setWithdraw]=useState([])
const navigation = useNavigation()
const [selected , setSelected]=useState(1)

const [showFilter,setShowFilter]=useState(false)

const [loading,setloading]=useState(false)
const [ErrorMessage,setErrorMessage] = useState("You currently have not withdraws")
const [totalWithdraw,setTotalWithdraw]=useState(0)

const [value,setValue]=useState("approved")


const withdrawData = Withdraw.filter((item)=> item.status === value )


function onChangeValue(Val){
  setValue(Val)
  setShowFilter(false)
}



function DepositMethodd(){

function Navigation(item){
  navigation.navigate("Withdraw_now",{item:item})
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
async function getAsyncData () {
  const user = await AsyncStorage.getItem('user')
  const token = await AsyncStorage.getItem('token')
  let userParsed=JSON.parse(user) 
  if(token){


    fetchWithdraws(userParsed.id)

  }
}


useEffect(()=>{
  getAsyncData()
  },[])





  
function onHideModal(){
  setShowFilter((p)=>!p)
}


function fetchWithdraws(id){
  setloading(true)

  var formdata = new FormData();
  formdata.append("user_id", id);
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  }; 
    fetch(`${BaseUrl}${Endpoints.fetch_withdraw_userId}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.status==="200"){
        setWithdraw(result.data)   
        setloading(false)
        setTotalWithdraw(result.Total_withdrawl)

      }
      console.log(result)})
    .catch(error => {
      
      setloading(false)
      setErrorMessage("Something went wrong try again later!")

      console.log('error', error)});

  }


 





function LowerCart(){


  function HistoryWrapperList({item}){
    const PaymentIcon = item.Acc_Type === "EasyPaisa" ? easypaissmall : 
    item.Acc_Type === "Jazzcash" ? JazzCashSmall: 
    item.Acc_Type === "Binance" ? BinanceSmall :
    item.Acc_Type === "VISA" ? VisaSmall:
    item.Acc_Type === "OKX" ? OkxSmall:easypaissmall

const imgStyle={width:
item.Acc_Type === "VISA"?32:item.Acc_Type === "OKX" ?32:27,
height:item.Acc_Type === "VISA"?19:item.Acc_Type === "OKX" ?8:27,


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
    
    <Text style={GlobalStyles.TitleText}>Withdraw Via {item.Acc_Type}</Text>
    <Text style={[GlobalStyles.ScndTxt,{color:item.status !="approved" ?Colors.danger:Colors.send}]}>Status: {item.status}</Text>
    <Text style={[GlobalStyles.ScndTxt,{color:Colors.FontColorI,textDecorationLine:'line-through'}]}>Actual Price: {(100*item.requested_amount)/95}</Text>
    <Text style={[GlobalStyles.ScndTxt,{color:Colors.danger}]}>Tax: 5%</Text>


    <Text style={GlobalStyles.ScndTxt}>{ moment(item.created_at).format("YYYY-MM-DD")}</Text>
     </View>
  


  <View>
  <View style={GlobalStyles.TransactionWrapper}>
  <Text style={{color:item.status ==="approved" ?Colors.danger:Colors.deposit}}>-{item.requested_amount}</Text>


  
  </View>


  </View>
  
  
  </View>
    )
  }
  const DataList=()=>{
    return(
<>
{ withdrawData.length <1? 
  <Text style={{color:Colors.FontColorI,marginTop:100}}>{ErrorMessage}</Text>
  :
  withdrawData.map((item)=>{
      return(
        <HistoryWrapperList item={item}/>
      )
    }
    )
}
 
      </>

    )
  }


    return(
        <View style={styles.LowerCart}>
    <View style={styles.InnerlowCart}>
<Text style={styles.TxtClr}>Activity</Text>
<Pressable 
onPress={()=> setShowFilter(true)}
style={styles.FilterWrap}>

<Text style={styles.TxtClr}>Filter</Text>
<Image source={filterIcon}
style={{width:13,height:13}}
/>
</Pressable>
    </View>
   
<Text style={[styles.TxtClr,{margin:15}]}>Recent Withdrawls</Text>

<View style={GlobalStyles.HistoryCard}>
<ScrollView
showsVerticalScrollIndicator={false}
nestedScrollEnabled={true}
>


{/* 
{
  loading===false ?
<DataList/>
:

} */}

{ 
loading === false ?
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
<Text style={styles.Text}>Withdraw</Text>
<ScrollView
nestedScrollEnabled={true}
>

<Text style={{color:Colors.placeHolder,marginLeft:15}}>Income</Text>
<Text style={[styles.Text,{marginTop:5}]}>PKR {totalWithdraw}</Text>
<Text style={{color:Colors.PrimaryColor,fontWeight:'600',marginLeft:15,marginTop:-10}}>Withdraw Via</Text>

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
export default Withdraw;

