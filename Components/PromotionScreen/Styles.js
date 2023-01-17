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
    TitleText:{
        color:Colors.PrimaryColor,
        fontSize:30,
        top:-20,
        fontWeight:'bold',
        marginTop:40
    },
    DescriptTxt:{
        color:Colors.FontColorI,
        margin:10,
        textAlign:'center',
        fontSize:16
    },
    DetailTitle:{fontSize:24,color:Colors.PrimaryColor,fontWeight:'bold',margin:10,alignSelf:"flex-start"},
    DetailTxt:{color:"white",fontWeight:'400',fontSize:18},
    

    TxtInputTitle:{
        color:Colors.FontColorI,
        fontWeight:'bold',
        fontSize:16,
        marginLeft:25,
        marginTop:10
    }


});

export default styles