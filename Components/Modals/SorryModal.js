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

function Sorry({IsVisible,onHideModal}) {
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
style={[styles.ModalTitles,{margin:20,fontSize:30,color:Colors.danger}]}>NOTICE!</Text>
<Text style={{color:"white",textAlign:"center"}}>
    If you are facing any issue regarding design of application ,please uninstall the app and then install again{'\n'}
</Text>
<Text style={{color:"white",textAlign:"center"}}>
اگر آپ کو ایپلیکیشن کے ڈیزائن کے حوالے سے کوئی مسئلہ درپیش ہے تو براہ کرم ایپ کو ان انسٹال کریں اور پھر دوبارہ انسٹال کریں۔

</Text>
<View>
    <View style={{alignItems:'center'}}>
    <Text style={{color:"white",textAlign:"center"}}>
   If you are not facing any issue, please ignore this message.
</Text>
    <Text 
    onPress={()=> onHideModal()}
    style={{color:Colors.send,fontSize:24,fontWeight:"bold",margin:20,textDecorationLine:'underline'}}>Okay uninstall and install</Text>



    </View>

</View>

</View>
    </SafeAreaView>
    </Modal>
  )

}
export default Sorry;

