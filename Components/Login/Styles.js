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
    HeaderTitle: {
        color: Colors.FontColorI,
        fontWeight: 'bold',
        fontSize: 30
    },
    SubHeaderTitle: {
        color: Colors.FontColorI,
        opacity:0.5,
        fontWeight: 'bold',
        fontSize: 15,
        marginTop:10,
    },
    TitleTxt:{
       color:Colors.FontColorI,
       fontWeight:'bold',
       fontSize:16,
       margin:10,
       marginLeft:0
    },
    MidContainer: {
        width: WindowWidth,
        height: WindowHeight / 1.32,
        backgroundColor: Colors.BgColorII,
        // alignItems: "center",
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 27,
        borderTopRightRadius: 27,
        borderWidth: 0.5,
        borderColor:Colors.PrimaryColor,
        alignItems:'center'


    },
    TopBar: {
     
        height: WindowHeight/37,
        width: WindowWidth,
      },
      marginer:
        {width:WindowWidth/1.12,marginTop:20,
    
    },
    RegisterBtn:{
        width:170,
        height:40,
        borderWidth:0.5,
        borderRadius:8,
        borderColor:Colors.PrimaryColor,
        backgroundColor:Colors.BgColorII,
        marginBottom:20,
        alignItems:"center",
        justifyContent:"center",
        shadowColor:"black",
        elevation:4
    },
    PrivacyTxt:{
        color:Colors.placeHolder,
        marginTop:10,
        opacity:0.8
    }
      

});

export default styles