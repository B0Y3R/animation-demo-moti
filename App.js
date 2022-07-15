import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions, SafeAreaView, Pressable } from 'react-native';
import {MotiView, MotiText, MotiPressable} from "moti";
import { Easing } from 'react-native-reanimated'
import { useState } from 'react';


import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/Navigation/RootNavigation';





import RippleEffect from './src/components/RippleEffect';
import BreathingLoader from './src/components/BreathingLoader';
import ImageCarousel from './src/components/ImageCarousel';
import ProductScreen from './src/components/ProductScreen';

export default function App() {

    // const ANIMATION_COMPONENT_LIST = {
    //     'ringRipple':  (
    //         <RippleEffect>
    //             <BreathingLoader onPress={onPress} />
    //         </RippleEffect>
    //     ),
    //     'justRing': <BreathingLoader onPress={onPress} />,
    //     'imageCarousel': <ImageCarousel />,
    //     'productScreen': <ProductScreen />,
    // }

    // function renderContent() {
    //     return ANIMATION_COMPONENT_LIST[type]
    // }

    // const isRipple = type === 'ringRipple';
    const windowWidth = Dimensions.get('window').width;

    // if (type === 'productScreen') {
    //     return <ProductScreen />
    // }

  return (
            <SafeAreaView style={styles.container}>
                <RootNavigator />
            </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#003366',
      flex: 1,
  }
});


// { isRipple &&
// <MotiText
//     style={{ color: '#FFF', fontWeight: 'bold', fontSize: 28 }}
//     from={{ opacity: 0, translateX: -100 }}
//     animate={{ opacity: 1, translateX: 0 }}
//     transition={{
//         type: 'timing',
//         duration: 1000,
//         easing: Easing.inOut(Easing.ease)
//     }}
// >
//     Welcome
// </MotiText>
// }
//
// {renderContent()}
//
// {
//     !isRipple
//         ? (
//             <MotiText
//                 style={{ color: '#FFF', fontWeight: 'bold', fontSize: 20 }}
//                 from={{ opacity: 0 }}
//                 animate={{ opacity: 1}}
//                 transition={{
//                     type: 'timing',
//                     duration: 1000,
//                     delay: 2000,
//                     easing: Easing.inOut(Easing.ease)
//                 }}
//             >
//                 Press the ring to see a ripple effect!
//             </MotiText>
//         )
//         : (
//             <MotiView
//                 style={{width: '100%', paddingLeft: 15, paddingRight: 15}}
//                 from={{ opacity: 0 }}
//                 animate={{ opacity: 1}}
//                 transition={{
//                     type: 'timing',
//                     duration: 1000,
//                     delay: 3000,
//                     easing: Easing.inOut(Easing.ease)
//                 }}
//             >
//                 <Pressable onPress={() => setType('imageCarousel')} style={{ padding: 15, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 10,}}>
//                     <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff', fontSize: 20 }}>Let's Proceed</Text>
//                 </Pressable>
//             </MotiView>
//         )
// }
// }