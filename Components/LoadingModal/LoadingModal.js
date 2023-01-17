import React, { useState } from 'react';
import {
  Text,
  View,

Modal,
TouchableOpacity
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Loader from '../Loader/Loader';



function GlobalProgressLoader({
  IsVisible,
  onHideLoader,

}) {

const navigation = useNavigation()

return (
    <Modal
    visible={IsVisible}
    transparent={true}
    animationType="fade"
    >
    <SafeAreaView style={[styles.Container,{backgroundColor:"rgba(0,0,0,0.8)",justifyContent: "center",
}]}>


<View style={styles.ModalDetail}>
<Text 
// onPress={()=> onHideLoader()}
style={styles.ModalTitles}>We are making your transaction.</Text>


<Loader val= {true}/>
<Text style={styles.ModalTXt}>Please be patient.....</Text>


</View>








    </SafeAreaView>
    </Modal>

  )
}
export default  GlobalProgressLoader;

