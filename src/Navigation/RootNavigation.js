import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {View, Text, TouchableOpacity } from 'react-native'


import RippleEffect from '../components/RippleEffect';
import BreathingLoader from '../components/BreathingLoader';
import ImageCarousel from '../components/ImageCarousel';
import ProductScreen from '../components/ProductScreen';

const Stack = createNativeStackNavigator();

const pageData = [
    {
        title: 'Breathing Loader',
        icon: <AntDesign name="reload1" size={24} color="white" />,
        route: 'RingRipple',
    },
    {
        title: 'Photo Gallery',
        icon: <MaterialCommunityIcons name="view-gallery-outline" size={24} color="white" />,
        route: 'PhotoGallery'
    },
    {
        title: 'Product Page',
        icon: <FontAwesome5 name="store" size={24} color="white" />,
        route: 'ProductPage'
    },
]

function Home({navigation}) {
    return (
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#003366'}}>
            <View style={{ padding: 20, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    pageData.map(page => (
                        <TouchableOpacity
                            style={{
                                height: 100,
                                width: 100,
                                margin: 8,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: 20,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => navigation.navigate(page.route)}
                        >
                            {page.icon}
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: "#fff",
                                    marginTop: 10,
                                    textAlign: 'center'
                                }}
                            >
                                {page.title}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}

function RingRipple({ navigation, onPress }) {
    return (
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#003366'}}>
            <RippleEffect>
                <BreathingLoader />
            </RippleEffect>
        </View>
    )
}

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false}} />
                <Stack.Screen name="RingRipple" component={RingRipple} options={{ headerShown: false}} />
                <Stack.Screen name="PhotoGallery" component={ImageCarousel} options={{ headerShown: false }} />
                <Stack.Screen name="ProductPage" component={ProductScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}