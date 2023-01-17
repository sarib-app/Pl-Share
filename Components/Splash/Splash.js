import React ,{useEffect} from "react";
import { Image ,Dimensions} from "react-native";

import Splash from '../../assets/icons/splash_screen.png'
import AsyncStorage from "@react-native-async-storage/async-storage";

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height;
import { useNavigation } from "@react-navigation/native";
function SplashScreen(){
const navigation = useNavigation()
    useEffect(()=>{

        setTimeout(() => {
            getAsyncData()
           
          },1500);

        
        },[])



       
    
        async function getAsyncData () {
          const token = await AsyncStorage.getItem('token')
          if(token){
        
        navigation.navigate("Main")
            
        
          }
          else{
            navigation.navigate("Register")

          }
        }
      



  return(
    <>
    <Image
    source={Splash}
style={{width:WindowWidth,height:WindowHeight}}
    
    />
    </>
  )



}
export default SplashScreen