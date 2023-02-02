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

<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>1: </Text>Plan 1 {"(Basic)"}
2% daily ROI on $50 {"(Upto level 2)"}.</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>2: </Text>Plan 2 Silver
2.5% daily ROI on $100 Upto level 3</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>3: </Text>Plan 3 Gold
2.5% daily ROI on $250 Upto level 4</Text>

<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>4: </Text>Plan 4 Platinum
2.75% daily ROI on $500 Upto level 4</Text>

<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>5: </Text>Plan 5 Emerald
2.75% daily ROI on $1000 Upto Level 5</Text>
<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>6: </Text>Plan 6 Diamond
3% daily ROI on $5000 Upto level 5</Text>

<Text style={styles.DescriptionStyle}><Text style={{fontWeight:"bold"}}>7: </Text>Plan 7 Bussiness Plan
3.33% daily ROI on $10,000 Upto level 6</Text>


   
    </ScrollView>

 

</View>
</View>
    )
}


  return (
    <View style={styles.Container}>  
<Text style={styles.Text}>Investment Plans</Text>

{/* 
<Text style={{color:Colors.placeHolder,marginLeft:15}}>Your Level</Text>
<Text style={[styles.Text,{marginTop:5}]}>Level 0</Text> */}
<Text style={{color:Colors.PrimaryColor,fontWeight:'600',marginLeft:15,marginTop:-10}}>Increase your level read the guidence below</Text>

<LowerCart />

</View>
  )
}
export default InvestmentPlans;

