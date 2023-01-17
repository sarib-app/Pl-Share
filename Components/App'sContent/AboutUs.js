import React, { useState } from 'react';
import {

  Text,
View,
SafeAreaView,
Image,
ImageBackground,
Pressable,
ScrollView
} from 'react-native';
import styles from './Styles';


import { useNavigation } from '@react-navigation/native';
import Abouts_Us from '../../assets/icons/Abouts_Us.png'
import ContentPrivacy from './PrivacyContent';
import ContentHeader from './ContentHeader';
import Colors from '../GlobalStyles/Color';
import SettingsTit from '../../assets/icons/SettingsTit.png'
import about_us_learn from '../../assets/icons/about_us_learn.jpeg'
import about_us_lac from '../../assets/icons/about_us_lac.jpeg'

import about_us_profit from '../../assets/icons/about_us_profit.jpeg'
import about_us_invest from '../../assets/icons/about_us_invest.jpeg'
import about_grow_earn from '../../assets/icons/about_grow_earn.jpeg'


function AboutUs() {
const navigation = useNavigation()
function LowerCart(){


const textStyle={color:Colors.FontColorI,margin:10,textAlign:'center',fontSize:15}

    return(
      <View style={styles.LowerCart}>
        <View style={{flexDirection:'row',margin:15,alignItems:'center'}}>
    
        <Image 
        source={SettingsTit}
        style={{width:20,height:20,marginRight:10}}
        />
      <Text style={styles.L_Cart_Title}>About Us</Text>
      </View>
    {/* <View style={styles.InnerLowerCart}> */}
        <ScrollView>

          <View style={{alignItems:"center"}}>
          <Text style={textStyle}>
          Doing simple tasks through your phone such as ordering lunch, paying bills, and whatnot, phones have made every task of our lives easier.{'\n'}{'\n'} In this highly competitive realm of trading, everyone wants to earn money easily simply through their phones but not everyone knows how to earn and where to invest we have decided to make it easier for you.{'\n'}{'\n'} 
          </Text>
          <Image
          style={{width:350,height:200}}
          source={about_us_learn}
          />
          </View>


          <View style={{alignItems:"center"}}>
          <Text style={textStyle}>
          If you want to invest and grow your money in little or no time we are here to save you from loads and loads of tiring works trading tube helps you to grow and earn more than five lac per month{'\n'}{'\n'}

          </Text>
          <Image
          style={{width:350,height:200}}
          source={about_us_profit}
          />
          </View>


          <View style={{alignItems:"center"}}>
          <Text style={textStyle}>
          <Text style={{fontSize:16,fontWeight:"bold"}}>
How does the trading tube do that?{'\n'}{'\n'}
</Text>

The trading tube is a company consisting of trading experts and business experts.{'\n'}{'\n'}
We collect a small number of investments from our users and generate a big amount of money then our experts invest that in various businesses. this reduces the  chances of failure in this process
Trading tube invests your money in different industries and earns profit for you.{'\n'}{'\n'}
 it maximizes your money without you even doing anything.{'\n'}{'\n'}
          </Text>
          <Image
          style={{width:350,height:200}}
          source={about_us_invest}
          />
          </View>








          <View style={{alignItems:"center"}}>
          <Text style={textStyle}>
          

          <Text style={{fontSize:16,fontWeight:"bold"}}>
Packages offered by trading tube{'\n'}{'\n'}

</Text>
The trading tube offers different packages starting from two thousand rupees to ten lac. you can invest thousands of lacs and earn many folds. there is a reward feature in this app that allows our users to earn rewards starting from 3 thousand to  50 thousand{'\n'}{'\n'}
Moreover, you can win bikes, cars, and other types of gifts just by participating in a lucky draw that trading tube offers.{'\n'}{'\n'}
 the minimum amount that you can invest is 2000 and the maximum is 20 lac earn 3000 to 50 lac per month with no work whatsoever.{'\n'}{'\n'}



          </Text>
          <Image
          style={{width:350,height:200}}
          source={about_us_lac}
          />
          </View>


    <View style={{alignItems:'center'}}>

        <Text style={textStyle}>

      




This application is a tool to earn money most easily with the cheapest of investments 
<Text style={{fontSize:16,fontWeight:"bold"}}>

{'\n'}{'\n'}How does the trading app work {'\n'}{'\n'}

</Text>
It consists of different levels.{'\n'}{'\n'} Level 1 allows you to invest from. 2k to 22k different levels comes with different ranges of investments and earnings that's how you can more and more from it 
This is a cycle of a maximum of 45 days of you are investing up to 2002k but the cycle period becomes less if the money you invest is less 
{'\n'}{'\n'}
<Text style={{fontSize:16,fontWeight:"bold",color:Colors.danger}}>


Important note {'\n'}{'\n'}
</Text>
You have to collect your earned money on daily basis otherwise you will lose it.

So stop thinking and invest in trading tube. We will help you grow your profit on daily basis and we will make your life easy.



        </Text>
        <Image
          style={{width:350,height:200}}
          source={about_grow_earn}
          />
          <Text style={{fontSize:16,fontWeight:"bold",color:Colors.send}}>


Thank you for reading our article!
</Text>
        </View>
    
    </ScrollView>
    
    <View style={{height:100,width:20}}>

</View>
    {/* </View> */}
    </View>
    
    )
    }



  return (
    <SafeAreaView style={styles.Container}>


<ContentHeader 
icon ={Abouts_Us}
width={51}
height={49}
title={"Abouts Us"}
/>


<LowerCart/>


    </SafeAreaView>
  )
}
export default AboutUs;

