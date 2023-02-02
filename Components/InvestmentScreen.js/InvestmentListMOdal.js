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
Modal


} from 'react-native';
import styles from './Styles';





import { SafeAreaView } from 'react-native-safe-area-context';
import gobackIcon from '../../assets/icons/gobackIcon.png'

import { useNavigation } from '@react-navigation/native';
import Profile from '../../assets/icons/5.png'
import Colors from '../GlobalStyles/Color';
import TipsIcon from '../../assets/icons/tips.png'
import DropDwn from '../../assets/icons/dropdown.png'

import LinearGradient from 'react-native-linear-gradient';
import credited from '../../assets/icons/credited.png'
import debited from '../../assets/icons/debited.png'
import Button from './../../assets/icons/smallBtn.png'
import logo from './../../assets/icons/logo.png'

import GlobalStyles from '../GlobalStyles/GlobalStyles';

import {INvestmentList,DepositTransaction} from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import { InvestmentIcons } from '../data/TopInvestors';
import Endpoints from '../../EnDPoints';
import Confirmation from './ConfirmationModal';
import getAsync from '../GetAsynData/getAsync';
import AsyncStorage from '@react-native-async-storage/async-storage';



function InvestmentListMOdal({isShow,onSelect,currentDate,dataFinal,isInvested}) {
  const asyncdata = getAsync()

    function InvestmentLists ({item}){
        const [showConfirmation,setShowConfirmation]=useState(false)
          const [isOpen ,setIsOpen]=useState(false)
        
  function onHideModal(){
    setShowConfirmation((p)=>!p)
    // onSelect()

  }
  
  
  
        return(
          <View style={styles.TrickContainer}>
        <Pressable
        onPress={()=> setIsOpen((p)=>!p)}
        style={styles.TrickContainerInner}>
   
        <Image 
        style={{width:49,height:49}} 
        source={logo}
        borderRadius={1000}
        />
        
        <View style={styles.InnerTricks}>
        {/* <Text style={{fontWeight:'bold',fontSize:18,color:Colors.FontColorI}}>{item.title}</Text> */}
        {/* <Text>please see the video.. below.......</Text> */}
       
          <Text style={styles.ListingText}>Name: <Text style={{color:Colors.send}}>{item.package_name}</Text></Text>
          <Text style={styles.ListingText}>Price: <Text style={{color:Colors.deposit}}>{item.amount}</Text></Text>
  
         
        </View>
        <TouchableOpacity onPress={()=> setIsOpen((p)=>!p)}>
        <Image 
        source={DropDwn}
        style={{width:15,height:12}}
        />
        </TouchableOpacity>
        
        </Pressable>
        {
          isOpen === true &&
          <>
        <Text style={{textAlign:'center',marginTop:10,color:Colors.FontColorII}}> 
        {item.description}
        
        </Text>
  
     <View style={styles.ListingRow}>
  
  <View style={{alignItems:"center"}}>
      <Text style={styles.ListingTitle}>
      Daily Profit
      </Text>
      <Text style={styles.ListingText}>{ item.daily_profits} USD</Text>
  </View>
  <View style={{alignItems:"center"}}>
      <Text style={styles.ListingTitle}>
      Price
      </Text>
      <Text style={styles.ListingText}>{item.amount}</Text>
  </View>
  <View style={{alignItems:"center"}}>
      <Text style={styles.ListingTitle}>
      Package Id
      </Text>
      <Text style={styles.ListingText}>{ item.id}</Text>
  </View>
     </View>
  
  
     <View style={styles.ListingRow}>
  
  <View style={{alignItems:"center"}}>
      <Text style={styles.ListingTitle}>
      Name
      </Text>
      
    
        <Text style={styles.ListingText}>{item.package_name}</Text>
       
      
  </View>
 

  <View style={{alignItems:"center"}}>
      <Text style={styles.ListingTitle}>
      Porductive Duration
      </Text>
      <Text style={styles.ListingText}>{item.working_days}</Text>
  </View>
  <View style={{alignItems:"center"}}>
      <Text style={styles.ListingTitle}>
      Level
      </Text>
      <Text style={styles.ListingText}>{item.levels}</Text>
  </View>
  
     </View>
  
  
 
     <TouchableOpacity 
  onPress={()=> {
    // setSelectedPackage(item)
  setShowConfirmation(true)
  
  }}
  style={[GlobalStyles.DullBtn,{marginTop:10}]}
  >
  
 
  <Text style={[GlobalStyles.BtnText,{color:Colors.FontColorI}]}>{isInvested === false ?"Invest":"Upgrade To"}</Text>

  </TouchableOpacity>   
  
  
  {
    showConfirmation === true &&
  <Confirmation 
  IsVisible={showConfirmation} 
  onHideModal={onHideModal} 
  selectedPackage={item}
  user={asyncdata.user}
  currentDate={currentDate}
  isInvested={isInvested}
  />
  
  }
        </>
  
        }
        </View>
        
        
        )
        }
        
return(

    <Modal
    
    visible={isShow}
    animationType='slide'
    transparent={true}
    >
        <View style={styles.Container}>
        <Pressable
    onPress={()=> onSelect()}
    
    style={{flexDirection:"row",margin:10,alignSelf:'flex-start',left:15,alignItems:'center'}}>
      <Image  source={gobackIcon}
      style={{width:12,height:15,tintColor:Colors.PrimaryColor}}
      />
    <Text style={{color:Colors.PrimaryColor}}> Go Back</Text>
    </Pressable>

            <Text  style={[styles.L_Cart_Title,{color:Colors.PrimaryColor}]}> Choose any of package </Text>
        <ScrollView
showsVerticalScrollIndicator={false}
nestedScrollEnabled={true}
// refreshControl={
//   <RefreshControl
//   refreshing={refreshing}
//   onRefresh={onRefresh}

//   />
// }
>
{
dataFinal.length > 0 ?

dataFinal.map((item)=>{
  return(
    <InvestmentLists item={item} />

  )
}) :
<Text style={{color:Colors.BgColor,fontSize:18,marginTop:40,alignSelf:"center"}}>No data found!</Text>


}
<View style={{height:150,width:100}}>

</View>
</ScrollView>
        </View>
    </Modal>
)


}
export default InvestmentListMOdal