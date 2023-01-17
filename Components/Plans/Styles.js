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
 Text:{
    color:Colors.FontColorI,
    fontWeight:'bold',
    fontSize:28,
    margin:15
      },
      DepoistMethods:{
        width:WindowWidth/1.1,
        // height:WindowHeight/10,
        alignSelf:'center',
        alignItems:'center',
        margin:15
      },
      LowerCart: {
        width: WindowWidth,
        height: WindowHeight / 1.1,
        marginTop:20,

        backgroundColor: Colors.BgColorII,
        borderRadius: 40,
        // borderWidth: 0.7,
        elevation:20,
        shadowColor:"black",
        borderColor: Colors.PrimaryColor,
    },
    InnerlowCart:{
width:WindowWidth/1.1,
height:20,
alignItems:'center',
alignSelf:'center',
margin:20,
flexDirection:'row',
justifyContent:'space-between',
// borderBottomColor:Colors.bgIII,
// borderBottomWidth:1,

    },
    TxtClr:{
        color:Colors.FontColorI,
        fontWeight:'bold',
        fontSize:15
    },
    FilterWrap:{
        backgroundColor:Colors.bgIII,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        width:WindowWidth/4.5,
        height:WindowHeight/25,
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
 


    ModalDetail:{
        width:WindowWidth/1.5,
        // height:WindowHeight/2.5,
        borderRadius:20,
        backgroundColor:Colors.BgColorII,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        padding:20
       },
       ModalHeader:{
        width:WindowWidth/1.7,
        // justifyContent:"space-evenly",
        alignItems:"center",
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10,
        flexDirection:"row"
    },
       ModalTitles:{
        color:Colors.danger,
       },
       ModalTXt:{
        color:Colors.FontColorI,
        fontWeight:'bold',
        fontSize:18,
        marginLeft:20
       },
       DescriptionStyle:{
       textAlign:'center',
       color:Colors.FontColorI,
       fontSize:18,
       margin:10   
    
    }
    


});

export default styles