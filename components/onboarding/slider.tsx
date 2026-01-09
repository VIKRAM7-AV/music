import { View, Platform, Animated, StyleSheet } from 'react-native'
import React, { JSX, useEffect } from 'react'
import { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { snapPoint, useVector } from 'react-native-redash';
import { HEIGHT, LEFT_SNAP_POINT, MARGINWIDTH, MIN_LENGTH, NEXT, PREV, RIGHT_SNAP_POINT, WIDTH, Side } from '@/configs/constants';
import { Gesture,GestureDetector } from 'react-native-gesture-handler';

interface Sliderprops {
    index: number,
    setIndex: (value: number) => void,
    children: JSX.Element,
    Prev?: JSX.Element,
    Next?: JSX.Element,
}

const Slider = ({
    index,
    setIndex,
    Prev,
    Next,
    children: current
}: Sliderprops) => {
    const hasPrev = !!Prev;
    const hasNext = !!Next;
    const zIndex = useSharedValue(0);
    const activeIndex = useSharedValue(Side.NONE);
    const isTransitionLeft = useSharedValue(false);
    const isTransitionRight = useSharedValue(false);
    const left = useVector(MIN_LENGTH, HEIGHT / 2);
    const right = useVector(MIN_LENGTH, HEIGHT / 2);


    const pendGesture = Gesture.Pan().onStart(({ x }) => {
        if (x <= MARGINWIDTH && hasPrev) {
            activeIndex.value = Side.LEFT;
            zIndex.value = 100;
        } else if (x >= WIDTH - MARGINWIDTH && hasNext) {
            activeIndex.value = Side.RIGHT;
        } else {
            activeIndex.value = Side.NONE;
        }
    }).onUpdate(({ x, y }) => {
        if (activeIndex.value === Side.LEFT) {
            left.x.value = Math.max(x, MIN_LENGTH);
            left.y.value = y;
        } else if (activeIndex.value === Side.RIGHT) {
            right.x.value = Math.min(WIDTH - x, MARGINWIDTH);
        }
    }).onEnd(({ velocityX, velocityY, x }) => {
        if (activeIndex.value === Side.LEFT) {
            const dest = snapPoint(x, velocityX, LEFT_SNAP_POINT);
            isTransitionLeft.value = dest === PREV;
            left.x.value = withSpring(dest, {
                velocity: velocityX,
                overshootClamping: isTransitionLeft.value ? true : false,
                restSpeedThreshold: isTransitionLeft.value ? 100 : 0.01,
                restDisplacementThreshold: isTransitionLeft.value ? 100 : 0.01,
            }, () => {
                if (isTransitionLeft.value) {
                    runOnJS(setIndex)(index - 1);
                } else {
                    zIndex.value = 0;
                    activeIndex.value = Side.NONE;
                }
            });
            left.y.value = withSpring(HEIGHT / 2, { velocity: velocityY });
        } else if (activeIndex.value === Side.RIGHT) {
            const dest = snapPoint(x, velocityX, RIGHT_SNAP_POINT);
            isTransitionRight.value = dest === NEXT;
            right.x.value = withSpring(WIDTH - dest, {
                velocity: velocityX,
                overshootClamping: isTransitionRight.value ? true : false,
                restSpeedThreshold: isTransitionRight.value ? 100 : 0.01,
                restDisplacementThreshold: isTransitionRight.value ? 100 : 0.01,
            }, () => {
                if (isTransitionRight.value) {
                    runOnJS(setIndex)(index + 1);
                } else {
                    activeIndex.value = Side.NONE;
                }
            })

            right.y.value = withSpring(HEIGHT / 2, { velocity: velocityY });
        }
    });

    const leftStyle = useAnimatedStyle(() => ({
        zIndex: zIndex.value,
    }));


    useEffect(() => {
        if (Platform.OS === 'android') {
            right.x.value = withSpring(WIDTH * 0.185)
        } else {
            right.x.value = withSpring(WIDTH * 0.167)
        }

    }, [left, right]);

    return (
        <GestureDetector gesture={pendGesture}>
            <Animated.View style={StyleSheet.absoluteFill}>
                {current}
                {
                    Prev && (
                        <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>

                        </Animated.View>
                    )
                }
                {
                    Next && (
                        <View style={StyleSheet.absoluteFill}>

                        </View>
                    )
                }

            </Animated.View>
        </GestureDetector>
    )
}

export default Slider 