import React, { useState ,useEffect} from 'react';
import {

  Text,
  View,
  Pressable,
  Modal,
FlatList,
TextInput,
Image
 
} from 'react-native';
import styles from '../BankAllList/Styles';

import BankList   from '../data/BankList';
import Colors from '../GlobalStyles/Color';
import gobackIcon from '../../assets/icons/gobackIcon.png'

import countries from '../data/CountryCode';
function CountryCode({
    isVisible,
    onSelectBank,
}) {

const data = countries
const [searchInput,setSearchInput]=useState("")

function BanksLists({item}){

      return(
        <Pressable 
        onPress={()=> onSelectBank(item.code)}
        style={styles.ListContainer}> 
              <Text style={{color:"white",fontSize:16,fontWeight:'bold'}}>+{item.code}</Text>  

      <Text style={{color:"white",fontSize:16,fontWeight:'500'}}>{item.name}</Text>  

        </Pressable>
      )

}
  
return (
    <Modal
    visible={isVisible}
    transparent={true}
    >

    <View style={styles.Container}> 

    <Pressable
    onPress={()=> onSelectBank(92)}
    
    style={{flexDirection:"row",marginTop:10,alignSelf:'flex-start',left:15,alignItems:'center'}}>
      <Image  source={gobackIcon}
      style={{width:12,height:15}}
      />
    <Text style={{color:Colors.PrimaryColor}}> Go Back</Text>
    </Pressable>


<Text style={styles.TitleText}>Select Country COde</Text>
<View style={styles.InputBox}>
<TextInput
placeholder='Search For Banks'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI}}
cursorColor={Colors.PrimaryColor}
onChangeText={(e)=> setSearchInput(e)}
// onPressIn={()=> setIsKeyOpen(true)}
// onEndEditing={()=> setIsKeyOpen(false)}
/>
  
</View>

<FlatList 
data={data.filter((item)=> item.name.toLowerCase().includes(searchInput.toLowerCase()))}
renderItem={({item})=>
<BanksLists
item={item}
/>
}
/>

<View style={{width:200,height:30}}>

</View>
</View>





</Modal>

  )
}
export default  CountryCode;

