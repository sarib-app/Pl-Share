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
        backgroundColor: Colors.BgColor,
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
        flexDirection: 'row',
        alignItems:"center",
        margin:10,
        marginTop:15
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

    ProfileWrapper: {
        alignItems: 'center',
        marginRight: 33
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
    lowerProfilesCart: {
        width: WindowWidth / 1.15,
        // height:20,
        // backgroundColor:Colors.BgColorII,
        alignSelf: 'center',
        marginBottom:10

    },
    ListingRow:{
width:WindowWidth/1.4,
flexDirection:'row',
justifyContent:"space-between",
alignItems:'center',
marginTop:10
    },
    ListingTitle:{
color:Colors.BgColor,
fontWeight:'bold',
fontSize:17
    },
    ListingText:{
color:Colors.bgIII,

    },



    scrollViewI:{
        height:WindowHeight/1.1

    },
    scrollViewII:{
        height:WindowHeight/1.8
        
    },
    ModalDetail:{
        width:WindowWidth/1.2,
        // height:WindowHeight/2.5,
        borderRadius:20,
        backgroundColor:Colors.BgColorII,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        padding:20
       },
       ModalHeader:{
        width:WindowWidth/1.2,
        // justifyContent:"space-evenly",
        alignItems:"center",
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10,
        flexDirection:"row"
    },
    InnerModalHeader:{
        width:WindowWidth/2.4,
        alignItems:"center"
    },
       ModalTitles:{
        color:Colors.danger,
       },
       ModalTXt:{
        color:Colors.FontColorI,
        fontWeight:'bold',
        fontSize:16,
        textAlign:'center'
        // marginLeft:20
       }
    



});

export default styles