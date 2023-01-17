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
    marginer:
    {width:WindowWidth/1.12,marginTop:20,

    },
    TitleTxt:{
        color:Colors.FontColorI,
        fontWeight:'bold',
        fontSize:16,
        margin:10,
        marginLeft:0
     },
    HeaderTitle: {
        color: Colors.FontColorI,
        fontWeight: 'bold',
        fontSize: 30,
    },
    SubHeaderTitle: {
        color: Colors.FontColorI,
        opacity:0.5,
        fontWeight: 'bold',
        fontSize: 15,
        marginTop:10,
        marginBottom:40
    },
    Card:{
        width:WindowWidth/1.05,
        // height:WindowHeight/3,
        borderRadius:10,
        borderColor:Colors.PrimaryColor,
        borderWidth:1,
        marginTop:20,
        backgroundColor:Colors.BgColorII,
        padding:15
        // alignItems:'center'    
    },
    QuestionBox:{
        width:WindowWidth/1.05,
        padding:10,
        marginTop:10,
        backgroundColor:Colors.bgIII
    },
    NextTextSTyle:{color:Colors.PrimaryColor,textDecorationStyle:'solid',textDecorationLine:'underline',alignSelf:'flex-end',marginTop:10,fontSize:17}

});

export default styles