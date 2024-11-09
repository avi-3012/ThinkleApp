import {useApi} from "@/hooks/useApi";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { View } from "tamagui"
import Svg, {
  Line,
  Circle,
  Polyline,
  Polygon,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 80; // Width of each label item
const DATA = ["2019", "2020", "2021", "2022", "2023", "2024"]; // Sample x-axis labels
const GRAPH_DATA = [150, 300, 100, 200, 250, 180]; // Sample y-axis values for each label
const EDGE_OFFSET = 6; // Offset for starting and ending points

const ScrollableGraph = ({index}:{index:number}) => {
  const scrollViewRef = useRef(null);
  const { years, population, isLoading, setIndex, status } = useApi();
  const [highlightedIndex, setHighlightedIndex] = useState(
    index
  );

  useEffect(() => {
    if (index !== highlightedIndex) {
      setHighlightedIndex(index);
      scrollViewRef.current.scrollTo({ x: index * ITEM_WIDTH, animated: true });
    }
  }, [index]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIndex(highlightedIndex);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [highlightedIndex]);

  if (isLoading || status !== "success" || !(years && population) || (years?.length==0 || population?.length==0)) {
    return (
    <View justifyContent="center" alignItems="center" height={220}>
      <ActivityIndicator color={"#ffffff"}/>
    </View>
  );
  }

  const handleScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    setHighlightedIndex(index);
    // setIndex(index);
  };

  const handleScrollEnd = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    scrollViewRef.current?.scrollTo({ x: index * ITEM_WIDTH, animated: true });
  };


  const maxGraphHeight = 200; // Maximum height of the graph
  const minGraphHeight = 20; // Minimum height for graph points
  const paddingTop = 20; // Padding to prevent circles from being cut off

  // Scale GRAPH_DATA points to fit within the graph height
  const scaledGraphData = population.map((value) => {
    const minValue = Math.min(...population);
    const maxValue = Math.max(...population);
    return (
      ((value - minValue) / (maxValue - minValue)) *
        (maxGraphHeight - minGraphHeight) +
      minGraphHeight
    );
  });

  // Points for the gradient fill polygon, including start and end extensions
  const gradientPoints = [
    `0,${maxGraphHeight + paddingTop - scaledGraphData[0]}`, // Start extended to screen edge
    ...scaledGraphData.map((y, index) => {
      const x = (index * width) / (years.length - 1);
      return `${
        index === 0
          ? x + EDGE_OFFSET
          : index === years.length - 1
          ? x - EDGE_OFFSET
          : x
      },${maxGraphHeight + paddingTop - y}`;
    }),
    `${width},${
      maxGraphHeight + paddingTop - scaledGraphData[scaledGraphData.length - 1]
    }`, // End extended to screen edge
  ].join(" ");

  const fullGradientPoints = `0,${
    maxGraphHeight + paddingTop
  } ${gradientPoints} ${width},${maxGraphHeight + paddingTop}`;

  return (
    <View style={styles.container}>
      {/* Graph */}
      {status==="success"&&<Svg height={maxGraphHeight + paddingTop} width={width}>
        {/* Define Gradient */}
        <Defs>
          <LinearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#03AD00" stopOpacity="0.4" />
            <Stop offset="100%" stopColor="#03AD00" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Gradient Fill Polygon */}
        <Polygon points={fullGradientPoints} fill="url(#gradientFill)" />

        {/* Line Graph */}
        <Polyline
          points={gradientPoints}
          fill="none"
          stroke="#03AD00"
          strokeWidth="2"
        />

        {/* Graph Data Points */}
        {scaledGraphData.map((y, index) => (
          <React.Fragment key={index}>
          {/* Shadow effect with multiple circles */}
          {highlightedIndex === index && (
            <>
              <Circle
                cx={
                  index === 0
                    ? EDGE_OFFSET
                    : index === years.length - 1
                    ? width - EDGE_OFFSET
                    : (index * width) / (years.length - 1)
                }
                cy={maxGraphHeight + paddingTop - y}
                r={15} // Larger radius for outer shadow
                fill={"#03AD00"}
                opacity={0.1} // Faint outer shadow
              />
              <Circle
                cx={
                  index === 0
                    ? EDGE_OFFSET
                    : index === years.length - 1
                    ? width - EDGE_OFFSET
                    : (index * width) / (years.length - 1)
                }
                cy={maxGraphHeight + paddingTop - y}
                r={12} // Medium radius
                fill={"#03AD00"}
                opacity={0.2}
              />
              <Circle
                cx={
                  index === 0
                    ? EDGE_OFFSET
                    : index === years.length - 1
                    ? width - EDGE_OFFSET
                    : (index * width) / (years.length - 1)
                }
                cy={maxGraphHeight + paddingTop - y}
                r={9} // Medium radius
                fill={"#03AD00"}
                opacity={0.3}
              />
              <Circle
                cx={
                  index === 0
                    ? EDGE_OFFSET
                    : index === years.length - 1
                    ? width - EDGE_OFFSET
                    : (index * width) / (years.length - 1)
                }
                cy={maxGraphHeight + paddingTop - y}
                r={6} // Medium radius
                fill={"#03AD00"}
                opacity={0.4}
              />
            </>
          )}
          {/* Main circle with glow effect */}
          {highlightedIndex === index && (
            <Circle
              cx={
                index === 0
                  ? EDGE_OFFSET
                  : index === years.length - 1
                  ? width - EDGE_OFFSET
                  : (index * width) / (years.length - 1)
              }
              cy={maxGraphHeight + paddingTop - y}
              r={3} // Glow radius
              fill={"#03AD00"}
              opacity={1}
            />
          )}
          {/* Main circle */}
          <Circle
            cx={
              index === 0
                ? EDGE_OFFSET
                : index === years.length - 1
                ? width - EDGE_OFFSET
                : (index * width) / (years.length - 1)
            }
            cy={maxGraphHeight + paddingTop - y}
            r={1} // Main pointer
            fill={"#03AD00"}
          />
        </React.Fragment>
        ))}
      </Svg>}

      {/* Scrollable X-Axis Labels */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={{ paddingHorizontal: (width - ITEM_WIDTH) / 2 }}
      >
        {years.map((year, index) => (
          <View
            key={index}
            style={[
              styles.item,
              highlightedIndex === index && styles.highlightedItem,
            ]}
            
          >
            <TouchableOpacity onPress={
                () => {
                    scrollViewRef.current.scrollTo({ x: index * ITEM_WIDTH, animated: true });
                }
            }>
            <Text
              style={[
                styles.label,
                highlightedIndex === index && styles.highlightedLabel,
              ]}
            >
              {year}
            </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: "black",
    alignItems: "center",
  },
  highlightText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  item: {
    width: ITEM_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  highlightedItem: {
    // Style for the highlighted item
  },
  label: {
    fontSize: 16,
    color: "gray",
  },
  highlightedLabel: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ScrollableGraph;
