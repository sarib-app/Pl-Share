import React, { useState } from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
ImageBackground,
Dimensions,
Modal
 
} from 'react-native';
import styles from './Styles';
import { WebView } from 'react-native-webview';


import { useNavigation } from '@react-navigation/native';
import Colors from '../GlobalStyles/Color';
import SettingsTit from '../../assets/icons/SettingsTit.png'
import SmallBtn from '../../assets/icons/smallBtn.png'
import RenderHtml from 'react-native-render-html';
const WindowWidth = Dimensions.get('window').width

function ContentBottom({title,Content,onHide}) {

const navigation = useNavigation()



function LowerCart(){

return(

  <View style={styles.LowerCart}>
    <View style={{flexDirection:'row',margin:15,alignItems:'center'}}>

    <Image 
    source={SettingsTit}
    style={{width:20,height:20,marginRight:10}}
    />
  <Text style={styles.L_Cart_Title}>{title}</Text>
  </View>
<View style={styles.InnerLowerCart}>
  <ScrollView>
{
  title === "Terms of Services"?

  <WebView 
style={{width:350,height:450}}
source={{uri: "https://termsandservices.tradingtube.co/"}}
javaScriptEnabled={true}
domStorageEnabled={true}
startInLoadingState={true}
>
</WebView>:

<RenderHtml 

contentWidth={WindowWidth / 2}
source={Content}
/>
}
</ScrollView>

</View>
<View style={{flexDirection:'row',marginLeft:15,alignItems:'center',marginTop:5}}>

<Image 
source={SettingsTit}
style={{width:20,height:20,marginRight:10}}
/>
<Text style={{color:'white'}} >I agree with the {title}</Text>
</View>

<View style={styles.ButtonsCart} >
<View style={{width:115,height:32,borderRadius:20,borderColor:Colors.PrimaryColor,borderWidth:1,alignItems:'center',justifyContent:'center'}}>
<Text style={{fontWeight:'bold',color:Colors.PrimaryColor,fontSize:16,textDecorationLine:"line-through",textDecorationColor:'black'}}>Decline</Text>

</View>

<Pressable

onPress={()=> onHide()}
>

<ImageBackground 
source={SmallBtn}
style={{width:115,height:32,alignItems:'center',justifyContent:'center'}}
>
  <Text style={{fontWeight:'bold',color:Colors.BgColor,fontSize:16}}>Accept</Text>
  </ImageBackground>
  </Pressable>

</View>


</View>

)
}





  return (

<LowerCart/>

  )
}
export default ContentBottom;

