import React, { useState,useRef,useEffect } from 'react';
import {
  Text,
  View,
FlatList,
TextInput,
Dimensions
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../GlobalStyles/Color';
import BackBtn from '../GlobalStyles/BackButton';
import Endpoints from '../../EnDPoints';
import BaseUrl from '../../Urls';
import getAsync from '../GetAsynData/getAsync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const WindowHeight = Dimensions.get('window').height;

function LiveChat() {
const [isKeyOpen,setIsKeyOpen] = useState(false)
const flatlistRef = useRef();
const [user,setUser]=useState()

const [starCounter,setStartCounter]=useState(false)


const [chat,setChat]=useState([])
const [ChatInput,setChatInput]=useState([])

const [ChatCount,setChatCount]=useState(0)

const focused = useIsFocused()


useEffect(()=>{
    getAsyncData()
    },[])
  
















  
    async function getAsyncData () {
      const user = await AsyncStorage.getItem('user')

      const token = await AsyncStorage.getItem('token')
      let userParsed=JSON.parse(user) 
    if(token){
      setUser(userParsed)
      getChat(userParsed)
      console.log(userParsed.id)


      
    }
    }


 
    function getChat(userParsed){
        var formdata = new FormData();
        formdata.append("user_id", userParsed.id);
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch(`${BaseUrl}${Endpoints.LiveChatList}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.status === "200"){
                // setChat(result.messages)
                setChat(result.messages)
                if(result.messages.length > 5){

                const timer = setTimeout(() => {
                    onScrollDown()
                },
              
                1000);
                  return () => clearTimeout(timer);
                }

                }
            else{
              console.log(result)
            }
            })
          .catch(error => console.log('error', error));
    }
function sendChat(){

const Obj ={
    "sender_id": user.id,
    "user_id": user.id,
    "message": ChatInput,
    "sent_by": "User",
    "sender_email": user.email,
  "sender_name": user.username,
   "receiver_id": "1001",
}
setChat(p=>[...p,Obj])
{chat.length > 5 && 

   onScrollDown()
}

    setChatInput("")
    var formdata = new FormData();
    formdata.append("sender_id", user.id);
    formdata.append("user_id", user.id);
    formdata.append("message", ChatInput);
    formdata.append("sent_by", "User");
    formdata.append("sender_email", user.email);
    formdata.append("sender_name", user.username);
    formdata.append("receiver_id", "1001");
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}${Endpoints.sendLiveChat}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status === "200"){
            getChat(user)
        }
        })
      .catch(error => console.log('error', error));
}

const onScrollDown=()=>{
    flatlistRef.current.scrollToEnd({animating: true});
  
  }



const navigation = useNavigation()


function ChatList({item}){
    return(
<>
<View style={[styles.ChatBox,
{
    alignSelf:item.sent_by === "Admin" ? 'flex-end':'flex-start',
    backgroundColor: item.sent_by === "Admin" ?Colors.BgColorII: Colors.bgIII
}
    ]}>
    <Text style={styles.chatTxt}>
        {item.message}
    </Text>
</View>
</>
    )
}

return (

    <SafeAreaView style={styles.Container}>
    <BackBtn />
<Text 
style={styles.HeaderText}>Inbox</Text>
<Text style={styles.ModalBelowTitles}>Have a Live Chat with our operator</Text>


<View 
style={styles.ModalHeader}
/>

{
    chat.length > 0 ?
<FlatList 
ref={flatlistRef}

data={chat}
renderItem={({item})=>
<ChatList  item={item} 
/>


}

/>:
<Text

style={{color:Colors.FontColorI,fontWeight:'400',fontSize:17,alignSelf:"center",marginTop:200}}
>You have no chats yet</Text>
}


<View 
style={{width:100,height:100}}
/>

<View style={[styles.InputBox,{bottom:isKeyOpen===true ? WindowHeight/2.5:50,flexDirection:"row"}]}>
<TextInput
placeholder='Enter Your Reply here'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI}}
cursorColor={Colors.PrimaryColor}
onPressIn={()=> setIsKeyOpen(true)}
onEndEditing={()=> setIsKeyOpen(false)}
value={ChatInput}
onChangeText={(e)=>setChatInput(e)}
/>
  <Text
  onPress={()=> sendChat()}
  style={{color:Colors.FontColorI,fontWeight:'bold',fontSize:17}}>Send</Text>
</View>


    </SafeAreaView>
  )
}
export default LiveChat;

