import React, { useState,useEffect } from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
TouchableOpacity,

 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Profile from '../../assets/icons/5.png'
import Colors from '../GlobalStyles/Color';
import BaseUrl from '../../Urls';
import LinearGradient from 'react-native-linear-gradient';
import plansIcon from '../../assets/icons/plans.png'
import RechargeIcon from '../../assets/icons/Recharge.png'
import withdrawIcon from '../../assets/icons/withdraw.png'
import promotion from '../../assets/gif/promotion.gif'

import helpIcon from '../../assets/icons/help.png'
import jobsIcon from '../../assets/icons/jobs.png'
import nftIcon from '../../assets/icons/nft.png'
import tradeIcon from '../../assets/icons/trade.png'
import TipsIcon from '../../assets/icons/tips.png'
import shopIcon from '../../assets/icons/shop.png'
import notification from '../../assets/icons/notification.png'

import gameIcon from '../../assets/icons/game.png'
import {TopInvestors, TipsTricks} from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import DropDwn from '../../assets/icons/dropdown.png'
import Banner from '../../assets/icons/Banner.png'
import WebView from 'react-native-webview';
import Coming_Soon from '../Help/Comingg_Soon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sorry from '../Modals/SorryModal';

// import { BannerAd, BannerAdSize, TestIds,InterstitialAd,AdEventType } from 'react-native-google-mobile-ads';
import { useIsFocused } from '@react-navigation/native';
import Suspended from '../Modals/Suspended';
// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7224745157985009/9676971080';
// const adUnitIdPopUp = __DEV__ ? TestIds.APP_OPEN  : 'ca-app-pub-7224745157985009/6687446284';



// const interstitial = InterstitialAd.createForAdRequest(adUnitIdPopUp, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ['fashion', 'clothing','trading'],
// });




function Home({data,total_Record}) {
const [username,setUsername]=useState("username")
const [isPromotion,setIspromotion]=useState("0")
const [refer,setRefer]=useState("N/A")
const [newNotifCount,setNewNotifCount]=useState("0")
const [SuspendedMessage,setSuspendedMessage]=useState("hello there")
const [isSuspended,setIsSuspended]=useState(false)

const focused = useIsFocused()


const [loaded, setLoaded] = useState(false);




// useEffect(()=>{
//   const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
//     setLoaded(true);
//     console.log("ffff")
//   });

//   // Start loading the interstitial straight away
//   interstitial.load();

//   // Unsubscribe from events on unmount
//   return unsubscribe;



//   },[focused])



  useEffect(()=>{
    getAsyncData()



    },[])
  
  
    async function getAsyncData () {
      const user = await AsyncStorage.getItem('user')
      const token = await AsyncStorage.getItem('token')
      const new_notif = await AsyncStorage.getItem('newnotif')

      let userParsed=JSON.parse(user) 
      if(token){
        setRefer(userParsed.referal_code)
        setUsername(userParsed.username)
        getCheck(userParsed.id)
        // getData(userParsed.id) 
      }
    
    }
  
  
function getCheck(id){

  var formdata = new FormData();
  formdata.append("user_id", String(id));

  var requestOptions = {
    method: 'POST',
    body: formdata,

    redirect: 'follow'
  };

  fetch(`${BaseUrl}getcheck`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.status === "200"){
setIspromotion(result.check)
setNewNotifCount(result.notification_count)
        console.log(result.check)
      }
      else if(result.status ==="402"){
        setIsSuspended(true)
        setSuspendedMessage(result.message)
      }


console.log(result)

    })
    .catch(error => console.log('error in check', error));
}




const navigation = useNavigation()


const start={x: 0.1, y: 0.8}
const end = {x: 0, y: 0}


function UpperCart(){

  const totalBalance = Number(total_Record !=""? total_Record.Total_balance != null ? total_Record.Total_balance:0:0)

  const [showComingSoon,setShowComingSoon] = useState(false)
  function onHideComingsoon(){
setShowComingSoon((P)=> !P)
  }
  return(


<View style={[styles.UpperCart,{marginBottom:isPromotion === "0" ? 0 :25}]}>
<Text style={styles.balanceTitle}>Total Balance</Text>
<Text style={styles.BalanceTxt}>PKR {totalBalance.toFixed(2)}</Text>

<View style={styles.LvlContainer}>
<Text style={styles.LvlTxt}>Level <Text style={styles.LvlinnerTxt}>{total_Record.my_level}</Text></Text>
</View>
<View style={{height:80,marginTop:15}}>

<ScrollView 
showsHorizontalScrollIndicator={false}
horizontal={true}
// contentContainerStyle={{justifyContent:'space-between'}}
style={styles.catSection}>
<Pressable 
onPress={()=> {
  
  
  
  if(loaded === true){
  navigation.navigate('Recharge')
    
    // setLoaded(false)
    // interstitial.show();

  }else{

    navigation.navigate('Recharge')

  }
  
  
}}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={RechargeIcon}
style={{width:20,height:30}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Recharge</Text>
</Pressable>




<Pressable 
onPress={() => {
  
  

    if(loaded === true){
      navigation.navigate("Withdraw")
      // setLoaded(false)
    // interstitial.show();

  }else{
    navigation.navigate("Withdraw")

  }

  
  



}}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={withdrawIcon}
style={{width:27,height:27}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Withdraw</Text>
</Pressable>







<Pressable 
onPress={()=> navigation.navigate("PlanDecider")}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={plansIcon}
style={{width:27,height:27}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Plans</Text>
</Pressable>






<Pressable 
onPress={()=> navigation.navigate('Decider')}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={helpIcon}
style={{width:27,height:27}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Help</Text>
</Pressable>






<Pressable 
onPress={()=> setShowComingSoon(true)}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={jobsIcon}
style={{width:28,height:23}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Jobs</Text>
</Pressable>





<Pressable 
onPress={()=> setShowComingSoon(true)}

style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={gameIcon}
style={{width:30,height:24}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Games</Text>
</Pressable>




<Pressable 
onPress={()=> setShowComingSoon(true)}

style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={shopIcon}
style={{width:29,height:25}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Shop</Text>
</Pressable>




<Pressable 
onPress={()=> setShowComingSoon(true)}

style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={tradeIcon}
style={{width:31,height:22}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Trading</Text>
</Pressable>








<Pressable 
onPress={()=> setShowComingSoon(true)}

style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={nftIcon}
style={{width:30,height:28}}

/>


</LinearGradient>
<Text style={{color:"white"}}>NFT</Text>
</Pressable>
</ScrollView>
</View>

<Coming_Soon 
IsVisible={showComingSoon}
onHideModal={onHideComingsoon}
/>
</View>

  )
}




const Investor =({item}) =>(
<View style={styles.ProfileWrapper}>
<Image source={item.image} style={{width:60,height:60}} />
<Text style={{color:Colors.BgColor}}>{item.name}</Text>
</View>
)





function LowerCart(){
  const TipsTrickss =({item})=>{

    const [isOpen ,setIsOpen]=useState(false)
  
  return(
    <View style={styles.TrickContainer}>
  <Pressable 
  
  onPress={()=> setIsOpen((p)=>!p)}
  style={styles.TrickContainerInner}>
  
  
  
  <Image 
  style={{width:49,height:49}} 
  source={TipsIcon}
  />
  
  <View style={styles.InnerTricks}>
  <Text style={{fontWeight:'bold',fontSize:18,color:Colors.BgColor}}>{item.title}</Text>
  {/* <Text>please see the video.. below.......</Text> */}
  
  </View>
  <TouchableOpacity onPress={()=> setIsOpen((p)=>!p)}>
  <Image 
  source={DropDwn}
  style={{width:18,height:15}}
  />
  </TouchableOpacity>
  
  </Pressable>
  {
    isOpen === true &&
    <>
  <Text style={{textAlign:'center',marginTop:10,color:Colors.bgIII}}> 
  {item.body}
  </Text>
  <WebView 
  style={{width:300,height:150}}
  source={{uri: item.embeded_link}}
  
  javaScriptEnabled={true}
  domStorageEnabled={true}
  startInLoadingState={true}
  >
  </WebView>
  </>

  }
  </View>
  
  
  )
  }
  
return(
  <View style={styles.LowerCart}>
  
  <Text style={styles.L_Cart_Title}>Top Investors</Text>
  
  <View style={styles.lowerProfilesCart}>

<FlatList 
data={TopInvestors}
renderItem={Investor}
horizontal={true}
showsHorizontalScrollIndicator={false}
scrollEnabled={true}
/>

</View>

<Text style={[styles.L_Cart_Title,{marginTop:0}]}>Tips & Tricks</Text>

<ScrollView
showsVerticalScrollIndicator={false}
nestedScrollEnabled={true}
>

{
data.length > 0 &&
data.map((item)=>{
  return(
    <TipsTrickss item={item} />

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


<View style={styles.Header}>
    <Text style={styles.OuterTxt}>Weclcome{'\n'} <Text style={styles.InnerTxt}>{username}<Text style={{color:Colors.placeHolder,fontSize:14}}>  {`( ${refer} )`}</Text></Text></Text>

    <View style={{flexDirection:'row'}}>
      <View style={{flexDirection:'row' }}>
        <View style={{backgroundColor:Colors.deposit,borderRadius:1000,width:20,height:20,alignItems:"center",justifyContent:"center",left:10}}>

<Text style={{color:"white",fontWeight:"bold"}} >{newNotifCount}</Text>
        </View>
        {/* {
newNotif === "1" &&

        } */}
<TouchableOpacity
  onPress={()=> {




    if(loaded === true){
      setNewNotifCount("0")

      navigation.navigate("Notification")  
          // setLoaded(false)
      // interstitial.show();
  
    }else{
      setNewNotifCount("0")

      navigation.navigate("Notification")  
    }



   
  
  }}
  
>

    <Image source={notification} style={{width:35,height:35,tintColor:Colors.PrimaryColor}}/>
</TouchableOpacity>
  </View>
 
  <TouchableOpacity
  onPress={()=> navigation.navigate("LevelRewards")}
  >

   <Image source={{uri:"https://img.icons8.com/glyph-neue/64/null/packaging.png"}} style={{width:35,height:35,tintColor:Colors.PrimaryColor}}/>
  </TouchableOpacity>
  

  </View>

</View>

<View style={{alignItems:"center"}}>



{/* <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      
      /> */}
      </View>
<ScrollView nestedScrollEnabled={true}

>






<UpperCart/>
{/* <Pressable
onPress={()=> navigation.navigate("PromotionScreen")}

style={{backgroundColor:"red"}}
>
<Text style={{color:"white",fontWeight:"bold",fontSize:18,margin:10,alignSelf:"center"}}>
  Kindly Collect Your 500 Rupees Now
</Text>
  
</Pressable> */}


   {
    isPromotion === "0"&&
    <Pressable
onPress={()=>{
  
  if(loaded === true){
    navigation.navigate("PromotionScreen")
    // setLoaded(false)
    // interstitial.show();

  }else{
  navigation.navigate("PromotionScreen")

  }
}
  
  }
>

<Image 
source={require("../../assets/gif/promotionn.gif")}
style={{ width:320,
  height:120,
  margin:10,
  alignSelf:"center"  }}
/>
</Pressable>

}

<LowerCart/>

</ScrollView>
{/* <Pressable
onPress={()=> navigation.navigate("PromotionScreen")}
style={{right:0,top:100,position:'absolute'}}>
 
<Image 
source={promotion}
style={{width:80,height:80}}
/>
</Pressable> */}

<Suspended 
IsVisible={isSuspended}
Message={SuspendedMessage}

/>

    </SafeAreaView>
  )
}
export default Home;

