import Slide from '@/components/onboarding/slide';
import Slider from '@/components/onboarding/slider';
import { OnboardingData } from '@/configs/constants';
import React, { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Onboarding = () => {
  const [index, setIndex] = useState(0);
  const Prev = OnboardingData[index - 1];
  const Next = OnboardingData[index + 1];

  return (
<GestureHandlerRootView style={{ flex: 1 }}>
  <Slider 
  key={index}
  index={index}
  setIndex={setIndex}
  Prev={Prev && <Slide slide={Prev} totalSlides={OnboardingData.length} />}
  Next={Next && <Slide slide={Next} totalSlides={OnboardingData.length} />}
  >
    <Slide
          slide={OnboardingData[index]}
          index={index}
          setIndex={setIndex}
          totalSlides={OnboardingData.length}
        />

  </Slider>
</GestureHandlerRootView>
  )
}

export default Onboarding;