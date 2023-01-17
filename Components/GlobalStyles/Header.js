import React, { useState } from 'react';
import {
  
  Text,
  
  View,

} from 'react-native';
import GlobalStyles from './GlobalStyles';
import Colors from './Color';
import LinearGradient from 'react-native-linear-gradient';

function Header({headertext}){
  return(
       
         <LinearGradient
          colors={[Colors.GoldI, Colors.GoldII, Colors.GoldIII ]}
          start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 4.0}}       
          style={GlobalStyles.Header}
        >
             <Text style={GlobalStyles.HeaderText}>
          {headertext}
         </Text>

        </LinearGradient>
        

  )
}
export default Header;

