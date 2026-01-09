import { Dimensions, Image } from "react-native";
//@ts-ignore
import One from "../assets/images/3.png";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export const OnboardingData: onBoardingTypes[] = [
    {
        color: '#40E0D0',
        image: (
            <Image source={One} style={{ width: wp('72%'), height: hp('72%') }} />
        ),
        title: 'Welcome to Our App',
        subtitle: 'Discover new features',
        description: 'Explore the app to find out more about what we offer.'
    },
    {
        color: '#A7F893',
        image: (
            <Image source={One} style={{ width: wp('72%'), height: hp('72%') }} />
        ),
        title: 'Welcome to Our App',
        subtitle: 'Discover new features',
        description: 'Explore the app to find out more about what we offer.'
    },
    {
        color: '#FFC0CB',
        image: (
            <Image source={One} style={{ width: wp('72%'), height: hp('72%') }} />
        ),
        title: 'Welcome to Our App',
        subtitle: 'Discover new features',
        description: 'Explore the app to find out more about what we offer.'
    },

]

export enum Side {
    LEFT,
    RIGHT,
    NONE
}

export const MIN_LENGTH =25;
export const {width:WIDTH, height: HEIGHT} = Dimensions.get('screen');
export const MARGINWIDTH = MIN_LENGTH + 50;
export const PREV = WIDTH;
export const NEXT = 0;
export const LEFT_SNAP_POINT = [MARGINWIDTH, PREV];;
export const RIGHT_SNAP_POINT = [WIDTH - MARGINWIDTH, NEXT];