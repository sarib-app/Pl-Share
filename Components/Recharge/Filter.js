import React, { useState } from 'react';
import {
  Text,
  Image,
  View,
ScrollView,
Pressable,
ImageBackground,
Modal,
Touchable,
TouchableOpacity
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import radioButton from '../../assets/icons/radioButton.png'
import Colors from '../GlobalStyles/Color';
import dropdown from '../../assets/icons/dropdown.png'

function Filter({
  IsVisible,
  onHideModal,
  value,  
  onChangeValue
}) {



const navigation = useNavigation()

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
  <TouchableOpacity
  onPress={()=>   onChangeValue("approved")}
  >

<Image
  source={radioButton}
  style={{width:20,height:20,tintColor:value==="approved"?Colors.send:Colors.FontColorI}}
  />
  </TouchableOpacity>

  <Text style={styles.ModalTXt}>Approved</Text>
</View>
<View style={styles.ModalHeader}>
  <TouchableOpacity
  onPress={()=>   onChangeValue("unapproved")}
  
  >

  <Image
  source={radioButton}
  style={{width:20,height:20,tintColor:value==="unapproved"?Colors.send:Colors.FontColorI}}
  />
  </TouchableOpacity>

  <Text style={styles.ModalTXt}>Un-Approved</Text>
</View>







<View style={styles.ModalHeader}>
  <TouchableOpacity
  onPress={()=>   onChangeValue("rejected")}
  
  >

  <Image
  source={radioButton}
  style={{width:20,height:20,tintColor:value==="rejected"?Colors.send:Colors.FontColorI}}
  />
  </TouchableOpacity>

  <Text style={styles.ModalTXt}>Rejected</Text>
</View>
</View>
    </SafeAreaView>
    </Modal>

  )
}
export default Filter;

