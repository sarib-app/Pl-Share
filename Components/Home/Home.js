import React, { useState,useEffect,useCallback } from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
TouchableOpacity,
Dimensions,
RefreshControl,
Share


 
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

import helpIcon from '../../assets/icons/helpCenter.png'
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
import GlobalStyles from '../GlobalStyles/GlobalStyles';
// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7224745157985009/9676971080';
// const adUnitIdPopUp = __DEV__ ? TestIds.APP_OPEN  : 'ca-app-pub-7224745157985009/6687446284';

import { LineChart } from 'react-native-gifted-charts';

// const interstitial = InterstitialAd.createForAdRequest(adUnitIdPopUp, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ['fashion', 'clothing','trading'],
// });

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height


function Home({data,total_Record,forceReload}) {
const [username,setUsername]=useState("username")
const [isPromotion,setIspromotion]=useState("1")
const [refer,setRefer]=useState("N/A")
const [newNotifCount,setNewNotifCount]=useState("0")
const [SuspendedMessage,setSuspendedMessage]=useState("hello there")
const [isSuspended,setIsSuspended]=useState(false)
const [refreshing, setRefreshing] = useState(false);





const onRefresh = useCallback(() => {

  forceReload()
  setRefreshing(true)
  setTimeout(() => {
  setRefreshing(false)
 
},2000);


}, [])



const onShare = async () => {

  try {
    const result = await Share.share({
      message:
        `Hey there click here to register on PLSHARE with my referal code URL https://registration.plshare.com/?${refer}`,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared

      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed

    }
  } catch (error) {
    alert(error.message);
  }
};


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


<View style={[styles.UpperCart,{marginBottom:isPromotion != "0" ? 25 :0}]}>
<Text style={styles.balanceTitle}>Total Balance</Text>
<Text style={styles.BalanceTxt}>USD {totalBalance.toFixed(2)}</Text>

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
 colors={[Colors.bgIv, Colors.bgIv]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={RechargeIcon}
style={{width:40,height:30,tintColor:Colors.FontColorI}}
/>


</LinearGradient>
<Text style={{color:"white"}}>Deposit</Text>
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
 colors={[Colors.bgIv, Colors.bgIv]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={withdrawIcon}
style={{width:30,height:30,tintColor:Colors.FontColorI}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Withdraw</Text>
</Pressable>







<Pressable 
onPress={()=> navigation.navigate("PlanDecider")}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.bgIv, Colors.bgIv]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={plansIcon}
style={{width:35,height:35,tintColor:Colors.FontColorI}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Plans</Text>
</Pressable>






<Pressable 
onPress={()=> navigation.navigate('Help')}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.bgIv, Colors.bgIv]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={helpIcon}
style={{width:30,height:30,tintColor:Colors.FontColorI}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Help</Text>
</Pressable>





{/* 
<Pressable 
onPress={()=> setShowComingSoon(true)}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.bgIv, Colors.bgIv]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={jobsIcon}
style={{width:33,height:32,tintColor:Colors.FontColorI}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Jobs</Text>
</Pressable> */}




{/* 
<Pressable 
onPress={()=> setShowComingSoon(true)}

style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.bgIv, Colors.bgIv]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={gameIcon}
style={{width:30,height:24,tintColor:Colors.FontColorI}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Games</Text>
</Pressable> */}




<Pressable 
onPress={()=> setShowComingSoon(true)}

style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.bgIv, Colors.bgIv]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={shopIcon}
style={{width:33,height:30,tintColor:Colors.FontColorI}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Shop</Text>
</Pressable>



{/* 
<Pressable 
onPress={()=> setShowComingSoon(true)}

style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.bgIv, Colors.bgIv]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={tradeIcon}
style={{width:31,height:22,tintColor:Colors.FontColorI}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Trading</Text>
</Pressable>








<Pressable 
onPress={()=> setShowComingSoon(true)}

style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.bgIv, Colors.bgIv]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={nftIcon}
style={{width:30,height:28,tintColor:Colors.FontColorI}}

/>


</LinearGradient>
<Text style={{color:"white"}}>NFT</Text>
</Pressable> */}
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
<Text style={{color:Colors.PrimaryColor}}>{item.name}</Text>
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
  source={{uri:"https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/null/external-video-art-and-design-studio-xnimrodx-lineal-color-xnimrodx.png"}}
  />
  
  <View style={styles.InnerTricks}>
  <Text style={{fontWeight:'bold',fontSize:18,color:Colors.FontColorI}}>{item.title}</Text>
  {/* <Text>please see the video.. below.......</Text> */}
  
  </View>
  <TouchableOpacity onPress={()=> setIsOpen((p)=>!p)}>
  <Image 
  source={DropDwn}
  style={{width:18,height:15,tintColor:Colors.PrimaryColor}}
  />
  </TouchableOpacity>
  
  </Pressable>
  {
    isOpen === true &&
    <>
  <Text style={{textAlign:'center',marginTop:10,color:Colors.FontColorII}}> 
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
  
  <Text style={styles.L_Cart_Title}>Promotion</Text>

  <Pressable 
  
  onPress={()=> navigation.navigate("PromotionScreen")}
  style={{backgroundColor: Colors.bgIv,alignSelf:'center',width:WindowWidth/1.1,borderRadius:8,shadowColor:Colors.BgColor,elevation:10,alignItems:"center",height:WindowHeight/8,flexDirection:'row'}}>
       
  <Image source={{uri:"https://img.icons8.com/arcade/64/null/packaging.png"}} style={{width:50,height:50,marginLeft:10}}/>
  <View >
  <Text style={styles.PromotionTitleTxt}>Congratulations!</Text>
<Text style={{textAlign:'left',marginLeft:10,color:Colors.FontColorII}}>
You have sucessfully recieved <Text style={{color:Colors.send,fontWeight:'bold'}}>2$</Text> {'\n'} as your registration <Text style={{color:Colors.send}}>reward !</Text> {'\n'}
Now click here and claim more free <Text style={{color:Colors.send,fontWeight:'bold'}}>5$</Text>
</Text>
  </View>
      </Pressable>

{/*   
  <View style={styles.lowerProfilesCart}>

<FlatList 
data={TopInvestors}
renderItem={Investor}
horizontal={true}
showsHorizontalScrollIndicator={false}
scrollEnabled={true}
/>

</View> */}

<Text style={[styles.L_Cart_Title,{marginTop:10}]}>Tutorials</Text>

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

<View style={GlobalStyles.HeaderWrapper}>


<View style={styles.Header}>
    <Text 
    onPress={()=> onShare()}
    style={styles.OuterTxt}>Weclcome{'\n'} <Text style={styles.InnerTxt}>{username}<Text style={{color:Colors.placeHolder,fontSize:14,textDecorationLine:"underline"}}>  {`( ${refer} )`}</Text></Text></Text>

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
{/*  
  <TouchableOpacity
  onPress={()=> navigation.navigate("LevelRewards")}
  >

   <Image source={{uri:"https://img.icons8.com/glyph-neue/64/null/packaging.png"}} style={{width:35,height:35,tintColor:Colors.PrimaryColor}}/>
  </TouchableOpacity> */}
  

  </View>

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
   {/* {
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

} */}

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

