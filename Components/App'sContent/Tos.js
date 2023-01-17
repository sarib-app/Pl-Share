import React, { useState } from 'react';
import {

  Text,
  Pressable,
  Image,
  Modal

 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import terms_icon from '../../assets/icons/terms_icon.png'
import ContentPrivacy from './PrivacyContent';
import ContentHeader from './ContentHeader';
import ContentBottom from './ContentBottom';
import gobackIcon from '../../assets/icons/gobackIcon.png'
import Colors from '../GlobalStyles/Color';

function Tos(
  {
    isVisible,
    onHide
    
  }
) {

const navigation = useNavigation()








  return (
    <Modal
    visible={isVisible}
    transparen={true}
    animationType="slide"
    >

    <SafeAreaView style={styles.Container}>

<Pressable
    onPress={()=> onHide()}
    
    style={{flexDirection:"row",marginTop:10,alignSelf:'flex-start',left:15,alignItems:'center'}}>
      <Image  source={gobackIcon}
      style={{width:12,height:15}}
      />
    <Text style={{color:Colors.PrimaryColor}}> Go Back</Text>
    </Pressable>
<ContentHeader 
icon ={terms_icon}
width={39}
height={51}
title={"Terms of Services"}
/>

<ContentBottom
title="Terms of Services"
Content={"nothing"}
onHide={onHide}
/>


    </SafeAreaView>
    </Modal>

  )
}
export default Tos;

