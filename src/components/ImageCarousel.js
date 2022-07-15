import { useRef } from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('screen');

const data = [
    'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
    'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200'
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

function BackgroundImage({image, index, scrollX}) {
    const inputRange = [
        (index - 1) * width,    // prev
        index * width,          // current
        (index + 1) * width,    // next
    ]
    const outputRange = [
        0,  // prev
        1,  // current
        0   // next
    ]

    const opacity = scrollX.interpolate({
        inputRange,
        outputRange
    })

    return (
        <Animated.Image
            key={`image-${index}`}
            source={{uri: image}}
            style={[StyleSheet.absoluteFillObject, { opacity }]}
            blurRadius={30}
        />
    )
}

export default function ImageCarousel({ images }) {
    const scrollX = useRef(new Animated.Value(0)).current

    return (
        <>
            <View style={StyleSheet.absoluteFillObject}>
                {data.map((image, index) => <BackgroundImage image={image} index={index} scrollX={scrollX} />)}
            </View>
            <Animated.FlatList
                data={images}
                onScroll={Animated.event(
                    [{nativeEvent: { contentOffset: { x: scrollX }}}],
                    { useNativeDriver: true }
                )}
                horizontal
                pagingEnabled
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item, index}) => {
                    return (
                        <View style={[styles.imageBox, { width }]}>
                            <Image
                                key={`display-image-${index}`}
                                source={{uri: item}}
                                style={styles.displayImage}
                            />
                        </View>
                    )
                }}
            />
        </>
    );
};

ImageCarousel.defaultProps = {
    images: data,
};

const styles = StyleSheet.create({
    imageBox: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
            width: 0 ,
            height: 10
        },
    },
    displayImage: {
        height: imageH,
        width: imageW,
        resizeMode: 'cover',
        borderRadius: 16
    }
});