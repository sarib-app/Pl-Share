import React,{useEffect,useState} from 'react';
import {
  StyleSheet,

} from 'react-native';



import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


import { useIsFocused } from '@react-navigation/native';
import Loading from '../Loading/loading';
const StateChanger = () => {
  const [loggedin,setLoggedIn]=useState(4)
  const focused = useIsFocused()
const navigation = useNavigation()
  useEffect(() => {
    getAsyncData()
  }, []);


  async function getAsyncData () {
    const token = await AsyncStorage.getItem('token')
    if(token){
      setLoggedIn(2)
      
      console.log("yes")
    }
    else{
        setLoggedIn(1)
    }
    
  }
  function onChangeState(){
    if(loggedin === 1){
        setLoggedIn(2)
    }
    else if(loggedin === 2){
        setLoggedIn(3)
    }
    else if(loggedin === 3){
        setLoggedIn(2)
    }

  }
  function onNavigate(){
    if(loggedin === 3){
        setLoggedIn(1)
    }
    else if(loggedin === 1){
        setLoggedIn(3)
    }
  }


if(loggedin === 1){
return <Register 
onNavigate={onNavigate}
onChangeState={onChangeState}
/>
}
else if(loggedin === 2){
   return <Main 
   onChangeState={onChangeState}
   />

}
else if(loggedin === 4){
    return <Loading />
}
else{
    return <Login 
    onNavigate={onNavigate}
    onChangeState={onChangeState}

    />
}



};



export default StateChanger;
