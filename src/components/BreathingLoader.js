import { StyleSheet, Pressable } from 'react-native';
import {MotiView} from "moti";
import { Easing } from 'react-native-reanimated'
import { SIZE_CHART } from './utils';

const BREATHING_LOADER_FROM = { scale: 1, borderWidth: 5, opacity: 0.9 };
const BREATHING_LOADER_ANIMATE = {  scale: 1.2, borderWidth: 8, opacity: 1 }
const BREATHING_LOADER_TRANSITION = (duration) => ({
    type: 'timing',
    duration: duration,
    easing: Easing.out(Easing.ease),
    loop: true
});

export default function BreathingLoader({ size, ringColor, shadowColor, from, animate, duration, transition, onPress}) {
    return (
        <Pressable onPress={onPress}>
            <MotiView
                style={{
                    ...styles.floatingRing,
                    height: SIZE_CHART[size],
                    width: SIZE_CHART[size],
                    borderRadius: SIZE_CHART[size] / 2,
                    borderColor: ringColor,
                    shadowColor: shadowColor,
                }}

                from={{...BREATHING_LOADER_FROM, ...from}}
                animate={{...BREATHING_LOADER_ANIMATE, ...animate}}
                transition={{ ...BREATHING_LOADER_TRANSITION(duration), ...transition}}
                onPress={() => onPress()}
            />
        </Pressable>
    )
}

BreathingLoader.defaultProps = {
  size: 'md',
    ringColor: "#fff",
    shadowColor: "#fff",
    from: BREATHING_LOADER_FROM,
    animate: BREATHING_LOADER_ANIMATE,
    transition: BREATHING_LOADER_TRANSITION,
    duration: 1000,
};

const styles = StyleSheet.create({
    floatingRing: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 8,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        zIndex: 20000,
    },
});