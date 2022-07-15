import { StyleSheet, Text, View } from 'react-native';
import {MotiView} from "moti";
import { Easing } from 'react-native-reanimated'
import { SIZE_CHART } from './utils';

const RIPPLE_EFFECT_DEFAULT_DELAY = 1000;
const RIPPLE_EFFECT_DEFAULT_DURATION = 4000;
const RIPPLE_EFFECT_FROM =  { opacity: 0.7, scale: 1, shadowOpacity: 0.5 };
const RIPPLE_EFFECT_ANIMATE = { opacity: 0, scale: 8, shadowOpacity: 0.1  };
const RIPPLE_EFFECT_TRANSITION = (index, duration, delay) => ({
    type: 'timing',
    duration: duration,
    easing: Easing.in(Easing.ease),
    loop: true,
    delay: index * delay,
    repeatReverse: false
});

const styles = StyleSheet.create({
    blackDot: {
        height: 100,
        width: 100,
        position: 'absolute',
        top: 0,
        backgroundColor: '#003366',
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
    }
});

export default function RippleEffect({ rippleCount, delay, duration, from, animate, transition, size, children }) {
    const rippleSet = [...Array(rippleCount).keys()]

    return (
        <View style={{ height: SIZE_CHART[size], width: SIZE_CHART[size] }}>
            {rippleSet.map((index) => (
                <MotiView
                    key={index}
                    from={{...RIPPLE_EFFECT_FROM, ...from}}
                    animate={{...RIPPLE_EFFECT_ANIMATE, ...animate}}
                    transition={RIPPLE_EFFECT_TRANSITION(index, duration, delay)}
                    style={styles.blackDot}
                />
            ))}
            {children}
        </View>
    )
}

RippleEffect.defaultProps = {
    rippleCount: 6,
    delay: RIPPLE_EFFECT_DEFAULT_DELAY,
    duration: RIPPLE_EFFECT_DEFAULT_DURATION,
    from: RIPPLE_EFFECT_FROM,
    animate: RIPPLE_EFFECT_ANIMATE,
    transition: RIPPLE_EFFECT_TRANSITION,
    size: 'md',
    children: null,
};
