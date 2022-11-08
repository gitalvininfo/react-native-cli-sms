import React, { useState } from 'react'
import {
   SafeAreaView,
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   TextInput,
   NativeModules,
   PermissionsAndroid,
} from 'react-native';
let DirectSms = NativeModules.DirectSms;
const DirectSMSTest = () => {
   const phones = ["09456980302", "09096657155"];
   const messages = ["10:00AM", "11:00AM", "02:00PM"]
   const [mobileNumber, setMobileNumber] = useState('');
   const [bodySMS, setBodySMS] = useState('Hello patient. You have appointment tomorrow.');
   const sendDirectSms = async () => {
      if (mobileNumber) {
         try {
            const granted = await PermissionsAndroid.request(
               PermissionsAndroid.PERMISSIONS.SEND_SMS,
               {
                  title: 'Sending SMS App Sms Permission',
                  message: 'Send SMS App needs access to your inbox so you can send messages in  background',
                  buttonNegative: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
               },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               for (let i = 0; i < phones.length; i++) {
                  DirectSms.sendDirectSms(phones[i], `${bodySMS} ${phones[i]} ${messages[i]}`);
                  console.log('called sms')
               }

            } else {
               alert('SMS permission denied');
            }
         } catch (error) {
            console.warn(error);
            alert(error);
         }
      }
   };
   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.container}>
            <Text style={styles.titleText}>
               React Native Bridge Example for Android to Send
               Direct SMS
            </Text>
            <Text style={styles.titleTextsmall}>
               Enter Recipients Number
            </Text>
            <TextInput
               value={mobileNumber}
               onChangeText={mobileNumber =>
                  setMobileNumber(mobileNumber)}
               placeholder={'Enter Conatct Number to Call'}
               keyboardType="numeric"
               style={styles.textInput}
            />
            <Text style={styles.titleTextsmall}>Enter SMS Body</Text>
            <TextInput
               value={bodySMS}
               onChangeText={bodySMS => setBodySMS(bodySMS)}
               placeholder={'Enter SMS body'}
               style={styles.textInput}
            />
            <TouchableOpacity
               activeOpacity={0.7}
               style={styles.buttonStyle}
               onPress={sendDirectSms}
            >
               <Text style={styles.buttonTextStyle}>Send
                  Message</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
};
export default DirectSMSTest;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      textAlign: 'center',
   },
   titleText: {
      fontSize: 22,
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 16,
   },
   titleTextsmall: {
      marginVertical: 8,
      fontSize: 16,
   },
   buttonStyle: {
      justifyContent: 'center',
      marginTop: 15,
      padding: 10,
      backgroundColor: '#8ad24e',
   },
   buttonTextStyle: {
      color: '#fff',
      textAlign: 'center',
   },
   textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: '100%',
      paddingHorizontal: 10,
   },
});