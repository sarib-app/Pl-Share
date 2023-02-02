import React, { useState,useCallback,useEffect } from 'react';
import {
  Text,
  Image,
  View,
ScrollView,
TouchableOpacity,
ImageBackground,
RefreshControl,
Pressable,


} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Profile from '../../assets/icons/5.png'
import Colors from '../GlobalStyles/Color';
import TipsIcon from '../../assets/icons/tips.png'
import DropDwn from '../../assets/icons/dropdown.png'

import LinearGradient from 'react-native-linear-gradient';
import credited from '../../assets/icons/credited.png'
import debited from '../../assets/icons/debited.png'
import Button from './../../assets/icons/smallBtn.png'
import GlobalStyles from '../GlobalStyles/GlobalStyles';

import {INvestmentList,DepositTransaction} from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import { InvestmentIcons } from '../data/TopInvestors';
import Endpoints from '../../EnDPoints';
import Confirmation from './ConfirmationModal';
import getAsync from '../GetAsynData/getAsync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InvestmentListMOdal from './InvestmentListMOdal';
import moment from 'moment';

// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7224745157985009/9676971080';

function InvestmentScreen({
  AllPackages,
  forceReload,
  currentDate,
  // MyPackages,
  total_Record,
  isInvested,
  MyPackages
}) {
   const asyncdata = getAsync()
  const [selected,setSelected]=useState("New") 

  const [isOpenInvModal,setIsOpenInvModal]=useState(false) 

  const [refreshing, setRefreshing] = useState(false);


  const [user,setUser]=useState({
    firstname:"",
    lastname:"",
    phone:"",
    pro_pic:""
   
 })
const navigation = useNavigation()








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

/////Functions////////////


const dataFinal =  AllPackages

const onRefresh = useCallback(() => {

  forceReload()
  setRefreshing(true)
  setTimeout(() => {
  setRefreshing(false)
 
},2000);


}, [])







/////////////// GUI RENDERING //////////////////////////////////////




function ActivitySection(){




  return(
<View style={[styles.UpperCart,{marginTop:30}]}>
<Text style={styles.balanceTitle}>Total Investment</Text>
<Text style={styles.BalanceTxt}>USD {total_Record !=""? total_Record.Total_investment:0}</Text>

<View style={styles.LvlContainer}>
<Text style={styles.LvlTxt}>Level <Text style={styles.LvlinnerTxt}>{total_Record !=""? total_Record.my_level:0}</Text></Text>
</View>


</View>
  )
}









//    



// const data = selected === "All"? AllPackages : AllPackages.filter((item)=>item.status === selected)
const data =AllPackages
function LowerCart(){
    
return(
  <View style={styles.LowerCart}>
  {/* <Text 
  onPress={()=> setIsOpenInvModal(true)}
  style={styles.L_Cart_Title}>{selected} Investment</Text> */}
<ActivitySection/>


<View style={styles.UpperCart}>
<Text style={styles.balanceTitle}>Current Package</Text>
<Text style={styles.BalanceTxt}>{ isInvested === false ?"N/A":MyPackages.package_name}</Text>


<View style={{flexDirection:'row',alignItems:'center',margin:10}}>
<View style={[styles.InnerModalHeader,{borderColor:Colors.SeconderyColor,borderRightWidth:1}]}>
<Text style={styles.ModalTXt}>RO Investment</Text>
<Text style={styles.ModalTXt}>Daily Income</Text>
<Text style={styles.ModalTXt}>Income per 40 days</Text>

<Text style={styles.ModalTXt}>Total Invested</Text>
<Text style={styles.ModalTXt}>Total Earned</Text>
<Text style={styles.ModalTXt}>Package</Text>
<Text style={styles.ModalTXt}>First Purchase</Text>

<Text style={styles.ModalTXt}>Package Updated at</Text>



</View>
<View style={styles.InnerModalHeader}>
  {
    isInvested === false ?
<>
<Text style={styles.ModalTXt}>N/A</Text>
<Text style={styles.ModalTXt}>N/A</Text>
<Text style={styles.ModalTXt}>N/A</Text>
<Text style={styles.ModalTXt}>N/A</Text>
<Text style={styles.ModalTXt}>N/A</Text>
<Text style={styles.ModalTXt}>N/A</Text>
</>:
<>

<Text style={styles.ModalTXt}>1 year</Text>
<Text style={styles.ModalTXt}>{MyPackages.daily_income} USDT</Text>
<Text style={styles.ModalTXt}>{MyPackages.daily_income*40} USDT</Text>

<Text style={styles.ModalTXt}>{MyPackages.amount}</Text>
<Text style={styles.ModalTXt}>{MyPackages.balance_got}</Text>
<Text style={styles.ModalTXt}>{MyPackages.package_name}</Text>
<Text style={styles.ModalTXt}>{moment(MyPackages.created_at).format("DD-MM-YYYY")}</Text>
<Text style={styles.ModalTXt}>{MyPackages.updated_date}</Text>

</>

  }


</View>

</View>

<Text style={{color:Colors.PrimaryColor,marginBottom:10}}>You have not invested on any package yet</Text>

<Pressable
  onPress={()=> setIsOpenInvModal(true)}
style={GlobalStyles.DullBtn}>
<Text 
style={styles.ModalTXt}
>
{isInvested===false?"Invest":"Upgrade"} 
</Text>
</Pressable>
</View>
{/* 
<View style={styles.UpperCart}>


</View> */}

</View>
)
}


function onSelectPackage(){
  setIsOpenInvModal(false)
  forceReload()
  console.log("CHAL PARRA HAI YARR")
}

  return (
    <SafeAreaView style={styles.Container}>

<View style={GlobalStyles.HeaderWrapper}>
<View style={styles.Header}>
    <Text style={styles.OuterTxt}>Weclcome To{'\n'} <Text style={styles.InnerTxt}>Investment Screen</Text></Text>
  





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
{/* <UpperCart /> */}

<LowerCart />
{
  isOpenInvModal === true && 
<InvestmentListMOdal 
isShow={isOpenInvModal}
onSelect={onSelectPackage}
dataFinal={dataFinal}
currentDate={currentDate}
isInvested={isInvested}

/>
}
</ScrollView>

    </SafeAreaView>
  )
}
export default InvestmentScreen;

