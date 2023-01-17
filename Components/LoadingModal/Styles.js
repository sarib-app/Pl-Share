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

    ModalDetail:{
        width:WindowWidth/1.2,
        height:WindowHeight/2.5,
        borderRadius:20,
        backgroundColor:Colors.BgColorII,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        padding:20
       },
       ModalHeader:{
        width:WindowWidth/1.2,
        justifyContent:"space-evenly",
        alignItems:"center",
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10,
        flexDirection:"row"
    },
       ModalTitles:{
        color:Colors.send,
       },
       ModalTXt:{
        color:Colors.FontColorI,
        fontWeight:'bold',
        fontSize:16,
        // marginLeft:20
       }
    



});

export default styles