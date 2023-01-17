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
        alignItems:'center',
        marginTop: 20
    },
    InnerTxt: { fontWeight: 'bold', fontSize: 18 ,color: Colors.FontColorI,marginLeft:10},
    OuterTxt: {  textAlign: "left" ,fontWeight:'300',fontSize:15},
    UpperCart: {
        width: WindowWidth / 1.15,
        padding: 40,
        // height:WindowHeight/3,
        borderRadius: 30,
        backgroundColor: Colors.BgColorII,
        borderColor: Colors.PrimaryColor,
        borderWidth: 1,
        alignItems: 'center',
        margin: 25
    },
    uperInnerCart:{
 width:WindowWidth/1.15,
 flexDirection:"row",
 justifyContent:"space-around",
 alignItems:"center"
    },
    balanceTitle: { color: Colors.PrimaryColor },
    BalanceTxt: {
        color: Colors.FontColorI,
        fontWeight: 'bold',
        fontSize: 20,
        // marginTop: 10,
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
        marginRight: 29,
    },
    LowerCart: {
        width: WindowWidth,
        height: WindowHeight / 1.1,


        backgroundColor: Colors.FontColorI,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: Colors.PrimaryColor,
    },
    OptionWrapper:{
width:100,
height:100,
backgroundColor:'white',
shadowColor:Colors.PrimaryColor,
elevation:4,
shadowOffset:{ width: 100 ,height: 10 },
borderRadius:10,
shadowRadius:10,
margin:10,
alignItems:"center",
justifyContent:"center"
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
        marginRight: 33
    },
    TrickContainer:{
        width:WindowWidth/1.1,
        // height:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:Colors.placeHolder,
        alignSelf:"center",
        paddingTop:15,
        paddingBottom:15,

        // marginBottom:15,
        alignItems:'center'
    },

    
 
    InnerTricks:{
        width:WindowWidth/2,
        marginLeft:15,
        // height:20,
        
    },
    TransactionText:{
        
    fontWeight:"bold",
    fontSize:16 
    },
IconWrapper:{

        backgroundColor:"rgba(23, 23, 23, 0.1)",
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