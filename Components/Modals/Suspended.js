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
import styles from '../Help/Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import Colors from '../GlobalStyles/Color';

import getAsync from '../GetAsynData/getAsync';

const WindowHeight = Dimensions.get('window').height;

function Suspended({IsVisible,Message}) {
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
style={[styles.ModalTitles,{margin:20,fontSize:30}]}>NOTICE!</Text>
<Text style={{color:"white",textAlign:"center"}}>
   {Message}
</Text>

{/* <View>
    <View style={{alignItems:'center'}}>

    <Text 
    onPress={()=> onHideModal()}
    style={{color:Colors.send,fontSize:24,fontWeight:"bold",margin:20,textDecorationLine:'underline'}}>Okay uninstall and install</Text>



    </View>

</View> */}

</View>
    </SafeAreaView>
    </Modal>
  )

}
export default Suspended;

