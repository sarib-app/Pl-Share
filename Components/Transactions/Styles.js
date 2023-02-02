import {
    StyleSheet,
    Dimensions
} from 'react-native'
import { Button } from 'react-native-paper';
import Colors from '../GlobalStyles/Color';
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    Container: {
        width: WindowWidth,
        height: WindowHeight,
        backgroundColor: Colors.BgColorII,

        alignItems: "center",


    },
    Header: {
        width: WindowWidth / 1.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    InnerTxt: { fontWeight: 'bold', fontSize: 20 },
    OuterTxt: { color: Colors.FontColorI, textAlign: "left" },
    UpperCart: {
        width: WindowWidth / 1.15,
        // padding: 15,
        // height:WindowHeight/3,
        borderRadius: 30,
        // backgroundColor: Colors.BgColorII,
        borderColor: Colors.PrimaryColor,
        // borderWidth: 1,
        alignItems: 'center',
        marginBottom:25
        // margin: 25,

    
    },
    balanceTitle: { color: Colors.lightTxt },
    BalanceTxt: {
        color: Colors.FontColorI,
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 10,
        textShadowColor: Colors.PrimaryColor,
        elevation: 10,
        shadowOpacity: 10
    },
    LvlContainer: {
        backgroundColor: Colors.placeHolder,
        borderRadius: 20,
        marginTop: 10
    },
    LvlTxt: {
        marginLeft: 10,
        marginRight: 10,
        color: Colors.FontColorI
    },
    LvlinnerTxt: {
        color: Colors.PrimaryColor,
        fontWeight: 'bold'
    },
    CatIcon: {
        width: 60,
        height: 60,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft:10,
        backgroundColor: 'red'
    },
    catSection: {
        width: WindowWidth / 1.15,
        flexDirection: 'row',
        alignItems:"center",
        // margin:10,
        marginTop:20
        // backgroundColor:"blue",
        
        // justifyContent:'space-between'
    },
    iconWrapper: {
        alignItems: 'center',
        marginRight: 24.5,
    },
    LowerCart: {
        width: WindowWidth,
        height: WindowHeight / 1.1,


        backgroundColor: Colors.BgColorII,
  
       
    
    


        
    },
    L_Cart_Title: {
        color: Colors.FontColorI,
        fontWeight: 'bold',
        margin: 25,
        marginBottom: 10,
        fontSize: 18
    },
    lowerProfilesCart: {
        width: WindowWidth / 1.15,
        // height:20,
        // backgroundColor:Colors.BgColorII,
        alignSelf: 'center',
        marginBottom:10

    },
    ProfileWrapper: {
        alignItems: 'center',
        marginRight: 33
    },
    TrickContainer:{
        width:WindowWidth/1.1,
        // height:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        // borderBottomWidth:1,
        borderColor:Colors.placeHolder,
        alignSelf:"center",
        paddingTop:15,
        marginBottom:5,
        paddingBottom:15,
         backgroundColor:Colors.bgIv,
         padding:5,
         borderRadius:8,
        // marginBottom:15,
        alignItems:'center'
    },

    
 
    InnerTricks:{
        // width:WindowWidth/2,
        marginLeft:15,
        // height:20,
        
    },
    TransactionText:{
        
    fontWeight:"bold",
    fontSize:16 
    },
IconWrapper:{

        backgroundColor:Colors.BgColorII,
        width:50,
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
      
      },


    scrollViewI:{
        height:WindowHeight/1.1

    },
    scrollViewII:{
        height:WindowHeight/1.8
        
    }



});

export default styles