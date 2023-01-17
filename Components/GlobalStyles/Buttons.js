import React from "react"
import Colors from "./Color"
import LinearGradient from "react-native-linear-gradient"
import GlobalStyles from "./GlobalStyles"
import { Text } from "react-native"
function ButtonBig({title}) {
    return(
        <LinearGradient 
start={{x: -0.2, y: 1}} end={{x: 3, y: 7}}
colors={[Colors.PrimaryColor, Colors.FontColorI, Colors.PrimaryColor]} 

style={GlobalStyles.Button}>
  <Text style={GlobalStyles.BtnText}>
    {title}
  </Text>
</LinearGradient>
    )
}
function ButtonSmall({title}) {
    return(
        <LinearGradient 
start={{x: 0, y: 0}} end={{x: 1.5, y: 4}}
colors={[Colors.PrimaryColor, Colors.FontColorI]} 

style={GlobalStyles.Button}>
  <Text style={GlobalStyles.BtnText}>
    Login Now
  </Text>
</LinearGradient>
    )
}
export {
    ButtonBig,
    ButtonSmall
}