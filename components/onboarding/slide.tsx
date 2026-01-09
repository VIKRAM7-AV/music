import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import React from "react";
import { Defs, RadialGradient, Rect, Stop, Svg } from "react-native-svg";
import { HEIGHT, WIDTH } from "@/configs/constants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Slide({
  slide,
  index,
  setIndex,
  totalSlides,
}: {
  slide: onBoardingTypes;
  index: number;
  setIndex: (value: number) => void;
  totalSlides: number;
}) {

  const handlePress = (index: number, setIndex: (index: number) => void) => {
    if (index === 2) {
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={slide.color} />
            <Stop offset="100%" stopColor={slide.color} />
          </RadialGradient>
        </Defs>
        <Rect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          fill={"url(#gradient)"}
        />
      </Svg>
      <View style={styles.container}>
        <View>{slide.image}</View>
        <View>
          <View
            style={{
              width: wp("88%"),
              paddingHorizontal: wp("6%"),
            }}
          >
            <Text
              style={{
                fontSize: wp("7%"),
                fontWeight: "600",
                color: "#05030D",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {slide.title}
            </Text>
            <Text
              style={{
                fontSize: wp("7%"),
                fontWeight: "600",
                color: "#05030D",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {slide.subtitle}
            </Text>
            <Text
              style={{
                paddingVertical: hp("1%"),
                fontSize: wp("4.5%"),
                color: "#3E3B54",
                fontFamily: "Poppins_300Light",
              }}
            >
              {slide.description}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.indicatorContainer}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.indicator, i === index && styles.activeIndicator]}
          />
        ))}
      </View>
      {/* Next Button */}
      {index <= totalSlides - 1 && (
        <LinearGradient
          colors={["#6D55FE", "#8976FC"]}
          style={styles.nextButton}
        >
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
            onPress={() => handlePress(index, setIndex)}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </LinearGradient>
      )}
      {index < totalSlides - 1 && (
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => handlePress(index, setIndex)}
        >
          <Ionicons
            name="chevron-forward-outline"
            size={wp("6%")}
            color="black"
          />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: wp("6%"),
    paddingTop: hp("10%"),
    alignItems: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: hp("5%"),
    position: "absolute",
    bottom: hp("7%"),
    left: wp("6%"),
  },
  indicator: {
    height: hp("1.5%"),
    width: wp("4%"),
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: wp("1%"),
    borderRadius: wp("1%"),
  },
  activeIndicator: {
    height: hp("1.5%"),
    width: wp("4%"),
    backgroundColor: "white",
  },
  nextButton: {
    position: "absolute",
    zIndex: 999999999,
    right: wp("6%"),
    bottom: hp("7%"),
    marginTop: hp("5%"),
    alignItems: "center",
    justifyContent: "center",
    width: wp("35%"),
    height: hp("7%"),
    borderRadius: wp("10%"),
  },
  nextButtonText: {
    color: "white",
    fontSize: wp("5.5%"),
    fontWeight: "bold",
  },
  arrowButton: {
    position: "absolute",
    width: wp("6%"),
    height: wp("6%"),
    borderRadius: wp("4%"),
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    right: wp("1%"),
    top: Platform.OS === "ios" ? hp("45%") : hp("50%"),
    transform: [{ translateY: -30 }],
  },
});