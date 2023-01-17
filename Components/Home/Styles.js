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
        // backgroundColor: Colors.BgColor,
        backgroundColor: "#0D0B0D",

        alignItems: "center",

    },
    Header: {
        width: WindowWidth / 1.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    Banner:{
      width:320,
      height:120,
      margin:10,
      alignSelf:"center"  
    },
    InnerTxt: { fontWeight: 'bold', fontSize: 20 },
    OuterTxt: { color: Colors.FontColorI, textAlign: "left" },
    UpperCart: {
        width: WindowWidth / 1.15,
        padding: 15,
        // height:WindowHeight/3,
        borderRadius: 30,
        backgroundColor: Colors.BgColorII,
        borderColor: Colors.PrimaryColor,
        borderWidth: 1,
        alignItems: 'center',
        margin: 25
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
        width: 50,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft:10,
        backgroundColor: 'red'
    },
    catSection: {
        width: WindowWidth / 1.27,
        height: 0,
        flexDirection: 'row',
        marginTop:5
        // backgroundColor:"black",
        // justifyContent:'space-between'
    },
    iconWrapper: {
        alignItems: 'center',
        marginRight: 20,
    },
    LowerCart: {
        width: WindowWidth,
        height: WindowHeight / 1.1,


        backgroundColor: Colors.FontColorI,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: Colors.PrimaryColor,
    },
    L_Cart_Title: {
        color: Colors.BgColor,
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
        marginRight: 24
    },
    TrickContainer:{
        width:WindowWidth/1.1,
        // height:20,
        borderRadius:20,
        borderWidth:0.5,
        borderColor:Colors.PrimaryColor,
        alignSelf:"center",
        padding:15,
        shadowColor:Colors.BgColor,
        elevation:1,
        shadowRadius:4,
        backgroundColor:Colors.FontColorI,
        marginBottom:15,
        alignItems:'center'
    },
    TrickContainerInner:{
        width:WindowWidth/1.1,
        // height:20,
        borderRadius:20,
      
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    InnerTricks:{
        width:WindowWidth/1.6,
        // height:20,
        // backgroundColor:'red',
        
    },
    scrollViewI:{
        height:WindowHeight/1.1

    },
    scrollViewII:{
        height:WindowHeight/1.8
        
    }



});

export default styles