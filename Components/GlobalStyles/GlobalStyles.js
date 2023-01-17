import {
    StyleSheet,
   Dimensions
  } from 'react-native'
import { Divider } from 'react-native-paper';
import Colors from './Color';
  const WindowWidth = Dimensions.get('window').width
  const WindowHeight = Dimensions.get('window').height; 
  const GlobalStyles = StyleSheet.create({

   Header:{
      width:WindowWidth,
      height:WindowHeight/15.5,
      backgroundColor:Colors.PrimaryColor,
      alignItems:"center",
      justifyContent:"center"
    },
    HeaderText:{
        color:Colors.BgColor,
        fontWeight:"bold",
        fontSize:22,
        
    },
    PorfilePic:{
        borderRadius:1000,
        width:50,
        height:50
    },
    TextInput:{
      width:WindowWidth/1.12,
      height:WindowHeight/14,
      borderRadius:10,
      borderColor:Colors.PrimaryColor,
      borderWidth:0.5,
      marginTop:0,
      backgroundColor:Colors.BgColorII,
      shadowColor:"black",
      // shadowOpacity:20,
      // shadowRadius:2,
      elevation:8 ,
      flexDirection:"row",
      alignItems:"center",
      alignSelf:"center"
      
    },
    Button:{
      width:170,
      height:40,
      borderRadius:8,
      // borderRadius:10,
      marginTop:20,
      alignItems:"center",
    justifyContent:'center'},
    BtnText:{color:Colors.BgColor,fontWeight:'bold',fontSize:20,
  },
    BtnShadow:{elevation:4,shadowColor:Colors.PrimaryColor},


     /////////TRANSACTION STYLES//////////////
     HistoryCard:{
      width:WindowWidth/1.1,
      height:WindowHeight/1.5,
      borderRadius:20,
      backgroundColor:Colors.bgIII,
      alignSelf:'center',
      alignItems:'center'
  },
  historyWrapper:{
    width:WindowWidth/1.25,
    // height:WindowHeight/11,
    paddingTop:15,
    paddingBottom:15,
    borderBottomColor:Colors.placeHolder,
    borderBottomWidth:1,
    // backgroundColor:'red',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:"space-between"
},
IconWrapper:{

  backgroundColor:Colors.PrimaryColor,
  width:35,
  height:35,
  borderRadius:5,
  justifyContent:'center',
  alignItems:'center'

},
TransactionWrapper:{
  backgroundColor:Colors.BgColor,
  borderRadius:15,
  justifyContent:'center',
  alignItems:'center',
  width:WindowWidth/5,
  height:WindowHeight/25,
  marginTop:4
},
TitlesWrapper:{
  justifyContent:"center",
  width:WindowWidth/2.2,
  // backgroundColor:"red"
},
TitleText:{
  fontWeight:"bold",
  color:Colors.FontColorI,
  fontSize:17
},
ScndTxt:{color:Colors.placeHolder},

////////////end///////////////


  });

  export default GlobalStyles