import React,{useEffect,useState} from 'react';
import {
  StyleSheet,

} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import Recharge from './Components/Recharge/Recharge';
import DepositScreen from './Components/DepositNow/Deposit';
import Withdraw from './Components/Withdraw/Withdraw';
import Withdraw_now from './Components/Withdraw_Now/Withdraw_now';
import MyTeam from './Components/MyTeam/MyTeam';
import TeamComissionScreen from './Components/MyTeam/TeamComission';
import PrivacyPolicy from './Components/App\'sContent/PrivacyPolicy';
import Tos from './Components/App\'sContent/Tos';
import AboutUs from './Components/App\'sContent/AboutUs';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import Help from './Components/Help/Help';
import PromotionScreen from './Components/PromotionScreen/PromotionScreen';
import Decider from './Components/Help/Decider';
import LiveChat from './Components/Help/LiveChat';
import ForgetPassword from './Components/Register/ForgetPassword';
import DecideUpdate from './Components/UpdateProfile/DecideUpdate';
import PlanDecider from './Components/Plans/Decider';
import SharePlans from './Components/Plans/SharePlan';
import InvestmentPlans from './Components/Plans/InvestmentPlans';
import LevelRewards from './Components/LevelRewards/LevelRewards';
import SplashScreen from "react-native-splash-screen"; //import SplashScreen
import AsyncStorage from '@react-native-async-storage/async-storage';
import StateChanger from './Components/StateChanger/StateChanger';
import Notification from './Components/Notification/notification';
import { Notifications } from 'react-native-notifications';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loggedin,setLoggedIn]=useState(true)

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
    getAsyncData()
    
  //   Notifications.postLocalNotification({
  //     title: "Welcome",
  //     body: "Welcome to trading tube best investment platform",
  //     extra: "data"
  // })
  }, []);


  async function getAsyncData () {
    const token = await AsyncStorage.getItem('token')
    if(token){
      setLoggedIn(true)
      
      console.log("yes")
    }
    
  }
const route = loggedin === true ? "Main":"Register"
console.log(loggedin)


return( 
    <NavigationContainer>
    <Stack.Navigator initialRouteName="StateChanger" screenOptions={{
      headerShown: false
    }}
    >
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Main" component={Main} />
    <Stack.Screen name="Recharge" component={Recharge} />
    <Stack.Screen name="DepositScreen" component={DepositScreen} />
    <Stack.Screen name="Withdraw" component={Withdraw} />
    <Stack.Screen name="Withdraw_now" component={Withdraw_now} />
    <Stack.Screen name="MyTeam" component={MyTeam} />
    <Stack.Screen name="TeamComissionScreen" component={TeamComissionScreen} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Stack.Screen name="Tos" component={Tos} />
    <Stack.Screen name="AboutUs" component={AboutUs} />
    <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
    <Stack.Screen name="Help" component={Help} />
    <Stack.Screen name="Decider" component={Decider} />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    <Stack.Screen name="LiveChat" component={LiveChat} />
    <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
    <Stack.Screen name="DecideUpdate" component={DecideUpdate} />
    <Stack.Screen name="PlanDecider" component={PlanDecider} />
    <Stack.Screen name="SharePlans" component={SharePlans} />
    <Stack.Screen name="InvestmentPlans" component={InvestmentPlans} />
    <Stack.Screen name="LevelRewards" component={LevelRewards} />
    <Stack.Screen name="StateChanger" component={StateChanger} />
    <Stack.Screen name="Notification" component={Notification} />


    </Stack.Navigator>
    </NavigationContainer>
    )

};



export default App;
