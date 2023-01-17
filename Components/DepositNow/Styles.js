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

    },

    TopBar: {
     
        height: WindowHeight/37,
        width: WindowWidth,
      },
TxtColor:{
    color:Colors.FontColorI,
    fontWeight:"bold",
    fontSize:28,
    margin:15
},
CardHeadTxt:{color:Colors.FontColorI,fontWeight:"bold",fontSize:16,margin:10,  textShadowColor: 'rgba(0, 0, 0, 0.50)',
textShadowOffset: {width: -1, height: 1},
textShadowRadius: 10},
UpperCardTxt:{
    width:WindowWidth/1.25,
    alignSelf:'center',
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:'row'
},
TxtInputTitle:{
    color:Colors.FontColorI,
    fontWeight:'bold',
    fontSize:16,
    marginLeft:25,
    marginTop:10
}

});

export default styles