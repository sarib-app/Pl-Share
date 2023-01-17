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
    BottomBar:{
        width:WindowWidth/1.1,
        height:WindowHeight/11.5,
        backgroundColor:Colors.BgColorII,
        borderRadius:40,
        position:'absolute',
        bottom:20,
        alignSelf:'center',
        elevation:2,
        shadowColor:Colors.BgColor,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    }

});

export default styles