import React, { useState } from 'react';
import {
  Text,
  View,

Modal,
TouchableOpacity,
Alert
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import Colors from '../GlobalStyles/Color';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import GlobalProgressLoader from '../LoadingModal/LoadingModal';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
import moment from 'moment/moment';
function Confirmation({
  IsVisible,
  onHideModal,
  selectedPackage,
  user,
  currentDate,
  isInvested

}) {




const navigation = useNavigation()
const [showProgressLoader,setshowProgressLoader]=useState(false)
function onHideLoader(){
  
  setshowProgressLoader((p)=>!p)
}
function InvestOnpackage(val){
  setshowProgressLoader(true)


const Endpoint_val = val === "Invest"?Endpoints.AddInvestment:Endpoints.UpgradeInvestment




      var formdata = new FormData();






      formdata.append("user_id",  user.id);
      formdata.append("package_id", selectedPackage.id);
      formdata.append("daily_income", selectedPackage.daily_profits);
      formdata.append("package_name",selectedPackage.package_name);
      formdata.append("amount", selectedPackage.amount);





      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      
      fetch(`${BaseUrl}${Endpoint_val}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if(result.status==="200"){
        
            setshowProgressLoader(false)
            // onHideLoader()
              Alert.alert("Congratulations!","You have successfully invested on this package.")

          }
          else if(result.status==="401"){
            setshowProgressLoader(false)
            // onHideLoader()
              Alert.alert("Sorry!",result.message)
          }
        })
        .catch(error => {
          setshowProgressLoader(false)
          // onHideLoader()
            Alert.alert("Sorry!","Something Went Wrong Try Again Later!")
          console.log('error', error)});





}





return (
    <Modal
    visible={IsVisible}
    transparent={true}
    animationType="slide"
    >

    <SafeAreaView style={[styles.Container,{backgroundColor:"rgba(0,0,0,0.8)",justifyContent: "center",
}]}>


<View style={styles.ModalDetail}>
<Text 
onPress={()=> onHideModal()}
style={styles.ModalTitles}>Close</Text>


<View style={styles.ModalHeader}>
<View style={[styles.InnerModalHeader,{borderColor:Colors.placeHolder,borderRightWidth:1}]}>
<Text style={styles.ModalTXt}>Package Id</Text>
<Text style={styles.ModalTXt}>Package</Text>
<Text style={styles.ModalTXt}>Daily Profit</Text>
<Text style={styles.ModalTXt}>Daily Profit %</Text>

<Text style={styles.ModalTXt}>Price</Text>
<Text style={styles.ModalTXt}>Working days</Text>




</View>
<View style={styles.InnerModalHeader}>
<Text style={styles.ModalTXt}>{selectedPackage.id}</Text>
<Text style={styles.ModalTXt}>{selectedPackage.package_name}</Text>
<Text style={styles.ModalTXt}>{selectedPackage.daily_profits} USD</Text>
<Text style={styles.ModalTXt}>{selectedPackage.daily_percentage}%</Text>

<Text style={styles.ModalTXt}>{selectedPackage.amount}</Text>
<Text style={styles.ModalTXt}>{selectedPackage.working_days}</Text>



</View>
</View>






  <Text style={[styles.ModalTXt,{color:Colors.PrimaryColor}]}>Are you sure you want to Invest ?</Text>

  <Text 
  onPress={()=>  {
    InvestOnpackage(isInvested===false?"Invest":"Upgrade")
    // setshowProgressLoader(true)
  
  }}
  
  style={[styles.ModalTXt,{color:Colors.send,marginTop:20,textDecorationLine:"underline"}]}>Yes, I want to Invest!</Text>


</View>




{
  showProgressLoader === true &&
<GlobalProgressLoader 
IsVisible={showProgressLoader} 
onHideLoader={onHideLoader} 

/>

}



    </SafeAreaView>
    </Modal>

  )
}
export default  Confirmation;

