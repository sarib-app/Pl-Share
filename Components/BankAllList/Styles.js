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
        alignItems:"center",
            
    },
    ListContainer:{
        width:WindowWidth/1.3,
        backgroundColor:Colors.bgIII,
        padding:20,
        alignItems:"center",
        justifyContent:"center",
        margin:5
    },
    TitleText:{
        color:Colors.FontColorI,
        fontWeight:"bold",
        fontSize:20
    },
    InputBox:{
        width:WindowWidth/1.2,
        height:WindowHeight/14,
        backgroundColor:Colors.BgColorII,
        borderRadius:10,
    // alignItems:"center",
    justifyContent:"center",
        alignSelf:'center',
        borderColor:Colors.PrimaryColor,
        borderWidth:1,
        margin:10
    
       },



});

export default styles