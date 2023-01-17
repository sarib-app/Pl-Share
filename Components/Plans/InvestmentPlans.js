import React, { useEffect, useState } from 'react';
import {

  Text,
  Image,
  View,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,

 
} from 'react-native';
import styles from './Styles';


import { useNavigation } from '@react-navigation/native';

import Colors from '../GlobalStyles/Color';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import filterIcon from '../../assets/icons/filter.png';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import getAsync from '../GetAsynData/getAsync';
function InvestmentPlans() {
const asyncdata = getAsync()

function LowerCart(){



    return(
        <View style={styles.LowerCart}>
    <View style={styles.InnerlowCart}>
<Text style={styles.TxtClr}>Activity</Text>

    </View>
   

<View style={GlobalStyles.HistoryCard}>
    <ScrollView
    showsVerticalScrollIndicator={false}
    >

<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>1: </Text>At Level 0 your investment limit is in between 2K-22K, achieve level 1 to invest more.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>2: </Text>At Level 1 your investment limit is in between 2K-50K, achieve level 2 to invest more.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>3: </Text>At Level 2 your investment limit is in between 2k-200k, achieve level 3 to invest more.</Text>

<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>4: </Text>At Level 3 your investment limit is in between 2K-500K, achieve level 4 to invest more.</Text>

<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>5: </Text>At Level 4 your investment limit is in between 2K-1000K, achieve level 5 to invest more.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>6: </Text>At Level 5 your investment limit is in between 2K-2000K.</Text>

<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>7: </Text>Invest in between 2k-50k {'->'} get 35% monthly profit {'->'} profit cycle is 10 days.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>8: </Text>Invest in between 50k-100k {'->'} get 40% monthly profit {'->'} profit cycle is 15 days.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>9: </Text>Invest in between 100k-500k {'->'} get 45% monthly profit {'->'} profit cycle is 30 days.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>10: </Text>Invest in between 500k-above {'->'} get 50% monthly profit {'->'} profit cycle is 45 days.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>NOTE: </Text>You will get your profit on daily basis and you have to collect your income daily other wise you will loose it.</Text>

   
    </ScrollView>

 

</View>
</View>
    )
}


  return (
    <View style={styles.Container}>  
<Text style={styles.Text}>Investment Plans</Text>


<Text style={{color:Colors.placeHolder,marginLeft:15}}>Your Level</Text>
<Text style={[styles.Text,{marginTop:5}]}>Level 0</Text>
<Text style={{color:Colors.PrimaryColor,fontWeight:'600',marginLeft:15,marginTop:-10}}>Increase your level read the guidence below</Text>

<LowerCart />

</View>
  )
}
export default InvestmentPlans;

