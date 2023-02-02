import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

import { Notifications } from 'react-native-notifications';

import RNPusherPushNotifications from 'react-native-pusher-push-notifications';


const id = "ba8515ce-4660-4b11-a8bc-e66a85f84dca"
const donutsInterest = 'debug-a';
export default async function GetNotif () {
  const user = await AsyncStorage.getItem('user')
  let userParsed=JSON.parse(user) 

  if(userParsed){

    init(userParsed.id)


  }

  }
  // Initialize notifications
   const init = (user_id) => {
    console.log(user_id)
    // Set your app key and register for push
    RNPusherPushNotifications.setInstanceId(id);
  
    // Init interests after registration
    RNPusherPushNotifications.on('registered', () => {
      if (Platform.OS === 'ios') {
        setSubscriptions(`${user_id}`);

      }
      else{
        subscribe(`${user_id}`);

      }

    });
    // Setup notification listeners
    RNPusherPushNotifications.on('notification', handleNotification);
    // Optionally you can assign the listeners to variables so you can clean them up later.
    //    const listener = RNPusherPushNotifications.on('registered', () => {});
    //    listener.remove();
  };
  // Handle notifications received
  const handleNotification = notification => {
    console.log(notification)
    // console.log(notification);
    // iOS app specific handling
    AsyncStorage.setItem("newnotif","1")
    if (Platform.OS === 'ios') {
      switch (notification.appState) {
        case 'inactive':
    
        // inactive: App came in foreground by clicking on notification.
        //           Use notification.userInfo for redirecting to specific view controller
        case 'background':
          console.log('back ground',notification);

        // background: App is in background and notification is received.
        //             You can fetch required data here don't do anything with UI
        case 'active':
          Notifications.postLocalNotification({
            title: notification.title,
            body: notification.body,
            extra: "data"
        })
        // App is foreground and notification is received. Show a alert or something.
        default:
          break;
      } 
    }
    else {

      Notifications.postLocalNotification({
        title: notification.title,
        body: notification.body,
        extra: "data"
    })

  }
  };
  // Subscribe to an interest
  const subscribe = interest => {
    // Note that only Android devices will respond to success/error callbacks
    RNPusherPushNotifications.subscribe(
      interest,
      (statusCode, response) => {
        console.error(statusCode, response);
      },
      () => {
        console.log('Success');
      }
    );
  };






  const setSubscriptions = interest => {
    // Note that only Android devices will respond to success/error callbacks
    RNPusherPushNotifications.setSubscriptions(
      interest,
      (statusCode, response) => {
        console.error(statusCode, response);
      },
      () => {
        console.log('Success');
      }
    );
  };




  // Unsubscribe from an interest
  const unsubscribe = interest => {
    RNPusherPushNotifications.unsubscribe(
      interest,
      (statusCode, response) => {
        console.tron.logImportant(statusCode, response);
      },
      () => {
        console.tron.logImportant('Success');
      }
    );
  };  

  /////////////////////////////////////
////////CHANNEL CODE///////////////
  
// const [id,setId]=useState()
    // const userid = await AsyncStorage.getItem('userid')
    // const token = await AsyncStorage.getItem('token')
    // let user_id=JSON.parse(userid) 
//     // if(token){
//     //   Start(user_id,token)
//     // }


//     useEffect(()=>{
//       getAsyncData()
//         },[])


//     async function getAsyncData () {
//       const userid = await AsyncStorage.getItem('userid')
//       let user_id=JSON.parse(userid) 
  
//       if(user_id){
//         console.log(user_id)
//         setId(user_id)
//         GetNotifss()
//       }
//     }





//     async function GetNotifss(){
//       const pusher = Pusher.getInstance();
  
//       await pusher.init({
      
//         apiKey: "3d61258d23cb5fecc159",
//         cluster: "eu",
//         onEvent,
//         onSubscriptionSucceeded,
//       }
//         );
      
      
      
      
//         const a =await  AsyncStorage.getItem("Channel")
      
      
//           await pusher.connect();
      
//             await pusher.subscribe({ 
//               channelName:"my-channel"
            
//             });
      
      
      
//       }
  
  
//     const onEvent = async (event: any) => {
//       const userid = await AsyncStorage.getItem('userid')
//       let user_id=JSON.parse(userid) 
//       console.log(user_id)
  
//   if(user_id){
  
//       const parseddata = JSON.parse(event.data)
//       if(parseddata.message != "hello world"){
//         if(parseddata.message.notification[0].receiver_id===user_id){
//           console.log(parseddata.message.notification[0].Title)
//           Notifications.postLocalNotification({
//             title: parseddata.message.notification[0].Title,
//             body: parseddata.message.notification[0].body,
//             extra: "data"
//         })
//         }
      
//       }
//     }
      
//       };
      
      
//       const onSubscriptionSucceeded = (channelName: string, data: any) => {
//         AsyncStorage.setItem("Channel","1")
//         console.log(
//           `onSubscriptionSucceeded: ${channelName} data: ${JSON.stringify(data)}`
//         );
      
//       };
      






























  /////////////////////////////////////







// import AsyncStorage from "@react-native-async-storage/async-storage";

// import BaseUrl from "../../configuration/url";
// import EndPoints from '../../configuration/EndPoints';
// import { Notifications } from 'react-native-notifications';
// import BackgroundService from 'react-native-background-actions';
// import BackgroundJob from 'react-native-background-actions';


// const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));


// export default async function GetAsyncData () {
//     const userid = await AsyncStorage.getItem('userid')
//     const token = await AsyncStorage.getItem('token')
//     let user_id=JSON.parse(userid) 
//     if(token){
//       Start(user_id,token)
//     }
//   }





//   function Start(id,token)

//   {
//   const Options = {
//     taskName: 'hamyk',
//     taskTitle: 'hamyk Running',
//     taskDesc: 'hamyk',
//     taskIcon: {
//         name: 'ic_launcher',
//         type: 'mipmap',
//     },
//     color: '#ff00ff',
//     parameters: {
//         delay: 5000,
//         id:id,
//         token:token
//     },
//     actions: '["Exit"]'
//   };
  
//     BackgroundService.start(VeryIntensiveTask, Options);
//   }





//   async function VeryIntensiveTask(taskDataArguments)
//   {
//       const { delay } = taskDataArguments;
//       const { id } = taskDataArguments;
//       const { token } = taskDataArguments;


//       await new Promise(async (resolve) => {
//           var i = 0;
//           for (let i = 0; BackgroundJob.isRunning(); i++) {  
//               // })

//               Fetch_Notification(id,token)
              
// //   Notifications.postLocalNotification({
// //     title: "Welcome !",
// //     body: "Welcome to hamyk a platform where you will be entertained",
// //     extra: "data"
// // });

//              await sleep(delay);    
//             }                     
//       });
//   }
//   function Fetch_Notification (id,token){
// if(id&& token){
// var myHeaders = new Headers();
// myHeaders.append("Authorization", `Bearer ${token}`);

// var formdata = new FormData();
// formdata.append("user_id", id);

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: formdata,
//   redirect: 'follow'
// };

// fetch(`${BaseUrl}${EndPoints.getNotif}`, requestOptions)
//   .then(response => response.json())
//   .then(result => {
    
//     if(result.status === "300"){

// return null
//     }else{
// sendNotification(result.data)
//     }
//   })
//   .catch(error => console.log('error', error));
// }else{
// }
//   } 

// function sendNotification (data){


// data.map((item)=>{

// console.log('notification',item)
// return(

//     Notifications.postLocalNotification({
//         title: item.title,
//         body: item.body,
//         extra: "data"
//     })
    
//     )
// })

// }




