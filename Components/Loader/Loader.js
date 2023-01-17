import React from 'react';
import {

  Text,


 
} from 'react-native';
import SpinnerButton from 'react-native-spinner-button';

import Colors from '../GlobalStyles/Color';

function Loader({val}){
    return(
      <>
      <SpinnerButton
                          buttonStyle={{  backgroundColor: Colors.PrimaryColor,
                          // borderRadius: 6,
                        // width:40,height:40,
                        
                        }}
                          isLoading={val}
                          spinnerType='MaterialIndicator'
                          indicatorCount={0}
  >
  
  </SpinnerButton>
  <Text style={{color:Colors.FontColorI,alignSelf:'center',marginTop:10}}>Loading........</Text>
      </>
    )
  }
  
  export default Loader