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
const WindowHeight = Dimensions.get('window').height;

function Coming_Soon({IsVisible,onHideModal}) {
    const asyncdata = getAsync()


const navigation = useNavigation()



return (
    <Modal
    visible={IsVisible}
    transparent={true}
    animationType="slide"
    >
    <SafeAreaView style={[styles.Container,{justifyContent:"center",backgroundColor:'rgba(0,0,0,0.9)'}]}>





<View  style={styles.TicketBox}>



<Text 
style={[styles.ModalTitles,{margin:20,fontSize:30}]}>Coming Soon</Text>
<Text style={{color:"white",textAlign:"center"}}>
    We are working on the quality of these modules, please keep patience we are launching these modules soon
</Text>

<View>
    <View style={{alignItems:'center'}}>

    <Text 
    onPress={()=> onHideModal()}
    style={{color:Colors.send,fontSize:24,fontWeight:"bold",margin:20,textDecorationLine:'underline'}}>Okay I will Wait</Text>



    </View>

</View>

</View>
    </SafeAreaView>
    </Modal>
  )

}
export default Coming_Soon;

