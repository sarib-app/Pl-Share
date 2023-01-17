import React, { useState } from 'react';
import {
  Text,
  Image,
  View,
ScrollView,
Pressable,
ImageBackground,
Modal,
TextInput,
Dimensions,
Alert
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import malepic from '../../assets/icons/male.png'
import Colors from '../GlobalStyles/Color';
import dropdown from '../../assets/icons/dropdown.png'
import BackBtn from '../GlobalStyles/BackButton';
import gobackIcon from '../../assets/icons/gobackIcon.png'
import getAsync from '../GetAsynData/getAsync';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
import PrivacyPolicy from '../App\'sContent/PrivacyPolicy';
import Tos from '../App\'sContent/Tos';
const WindowHeight = Dimensions.get('window').height;

function AccepDialogue({IsVisible,onHideModal}) {
    const asyncdata = getAsync()


const navigation = useNavigation()

const [showPrivacy, setShowPrivacy] = useState(false);
const [showTos, setShowTos] = useState(false);



function onHideTos(){
setShowTos((p)=> !p)
}
function onHidePrivacy(){
  setShowPrivacy((p)=> !p)

}

return (
    <Modal
    visible={IsVisible}
    transparent={true}
    animationType="slide"
    >
    <SafeAreaView style={[styles.Container,{justifyContent:"center",backgroundColor:'rgba(0,0,0,0.9)'}]}>





<View  style={styles.TicketBox}>



<Text 
style={[styles.ModalTitles,{margin:20,fontSize:30,textAlign:"center"}]}>Terms Of Services/Privacy Privacy</Text>
<Text style={{color:"white",textAlign:"center"}}>
    To continue please accept our terms of services and privacy policy.
</Text>
<Text 
onPress={()=> setShowTos(true)}
style={{color:Colors.PrimaryColor,textAlign:"center",textDecorationLine:"underline"}}>
    Terms of Services
</Text>
<Text 
onPress={()=> setShowPrivacy(true)}

style={{color:Colors.PrimaryColor,textAlign:"center",textDecorationLine:"underline"}}>
    Privacy Policy
</Text>
<View>
    <View style={{alignItems:'center'}}>

    <Text 
    onPress={()=> onHideModal()}
    style={{color:Colors.send,fontSize:24,fontWeight:"bold",margin:20,textDecorationLine:'underline'}}>I aknowledge and accept.</Text>



    </View>

</View>

</View>



<PrivacyPolicy
isVisible={showPrivacy}
onHide={onHidePrivacy}

/>

<Tos 
isVisible={showTos}
onHide={onHideTos}

/>

    </SafeAreaView>
    </Modal>
  )

}
export default AccepDialogue;

