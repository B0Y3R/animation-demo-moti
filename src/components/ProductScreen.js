import {useRef, useMemo, useCallback, useState} from 'react';
import { Animated, Image, FlatList, View, StatusBar, Dimensions, StyleSheet, Text } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'

const {width, height} = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .75;
const DOT_SIZE = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE * 2;

const images = [
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/9d284f7c-8830-49bf-a9f5-fa68f7cfb9ed/sb-nyjah-free-2-skate-shoes-s4Kt9q.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/480b4ebc-b590-4ff6-905d-e646cf656def/sb-nyjah-free-2-skate-shoes-s4Kt9q.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/2d6e0f0f-829a-4292-a8a6-08225a8a68ff/sb-nyjah-free-2-skate-shoes-s4Kt9q.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/b989235a-0572-4efb-8332-1f0c5fdc8e1f/sb-nyjah-free-2-skate-shoes-s4Kt9q.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/0029fd6f-cae0-47e8-82ca-a857eeac1106/sb-nyjah-free-2-skate-shoes-s4Kt9q.png',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/b22bc9ca-fdec-47a0-ae0a-710ce8d8de85/sb-nyjah-free-2-skate-shoes-s4Kt9q.png',
];

const product = {
    title: 'Nike SB Nyjah Free 2',
    description: [
        'The Nike SB Nyjah Free 2 is a sequel worthy of its predecessor. Inspired by the iconic Nike Air Zoom Spiridon, the original rubber design has been updated with mesh panels to help your feet stay cool through your hottest skate sessions.',
        'Shown: Summit White/Summit White/Summit White/Black',
    ],
    price: '$100'
}

export default function ProductScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const bottomSheetRef = useRef(null).current;
    const [index, setIndex] = useState(0)
    const snapPoints = useMemo(() => ['25%', '75%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log(index, 'HIT <<')
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={{height: ITEM_HEIGHT, overflow: 'hidden'}}>
                <Animated.FlatList
                    data={images}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                        { useNativeDriver: true }
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    showVerticalScrollIndicator={false}
                    bounces={false}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <Image source={{uri: item}} style={styles.image}/>
                            </View>
                        )
                    }}
                />
                <View style={styles.pagination}>
                    {
                        images.map((_, index) => (
                            <View style={[styles.dot]} key={`dot-${index}`} />
                        ))
                    }
                    <Animated.View style={[styles.dotIndicator, {
                        transform: [{
                            translateY: Animated.divide(scrollY, ITEM_HEIGHT).interpolate({
                                inputRange: [0,1],
                                outputRange: [0, DOT_SIZE * 3],
                            })
                        }]
                    }]} />
                </View>

            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <BottomSheetScrollView style={{ padding: 15}}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20,}}>{product.title}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>{product.price}</Text>
                    </View>
                    {product.description.map((d, index) => (
                        <Text style={{ fontSize: 16, marginTop: 16, }} key={index}>{d}</Text>
                    ))}
                    {product.description.map((d, index) => (
                        <Text style={{ fontSize: 16, marginTop: 16, }} key={index}>{d}</Text>
                    ))}
                    {product.description.map((d, index) => (
                        <Text style={{ fontSize: 16, marginTop: 16, }} key={index}>{d}</Text>
                    ))}
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: ITEM_HEIGHT,
        width: ITEM_WIDTH,
        resizeMode: 'cover',
    },
    pagination: {
        position: 'absolute',
        top: ITEM_HEIGHT / 2,
        left: 20,
    },
    dot: {
        height: DOT_SIZE,
        width: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#333',
        margin: DOT_SIZE
    },
    dotIndicator: {
        height: DOT_INDICATOR_SIZE,
        width: DOT_INDICATOR_SIZE,
        borderRadius: DOT_INDICATOR_SIZE / 2,
        borderWidth: 1,
        borderColor: '#333',
        position: 'absolute',
        top: DOT_SIZE / 2,
        left: DOT_SIZE / 2
    }
})