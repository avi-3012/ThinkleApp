import CustomChart from "@/components/CustomChart";
import TopComponent from "@/components/TopComponent";
import { Colors } from "@/constants/Colors";
import { useApi } from "@/hooks/useApi";
import { PopulationData } from "@/types";
import {
  formatNumberWithCommas,
  getPopulationGrowth,
  getPopulationGrowthPercentage,
} from "@/utils/functions";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Platform, ActivityIndicator } from "react-native";
import { View, Text } from "tamagui";

export default function HomeScreen() {
  const data = useApi();
  const { populationList, index, isLoading, status } = data;

  if (isLoading) {
    return (
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor={Colors.dark.background}
      >
        <ActivityIndicator color={"#ffffff"} />
      </View>
    );
  }

  if (populationList?.length === 0) {
    return (
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor={Colors.dark.background}
      >
        <Text
          fontSize={20}
          fontWeight={"bold"}
          paddingHorizontal={30}
          color={Colors.dark.text}
          paddingTop={10}
        >
          No data available
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1 }}
      // marginTop={30}
      backgroundColor={Colors.dark.background}
    >
      <TopComponent />
      <Text
        fontSize={20}
        fontWeight={"bold"}
        paddingHorizontal={30}
        color={Colors.dark.text}
        paddingTop={10}
      >
        US Population Insights
      </Text>
      <Text
        fontSize={40}
        fontWeight={"500"}
        paddingHorizontal={30}
        color={Colors.dark.text}
        paddingTop={5}
      >
        {populationList?.length > 0 &&
          formatNumberWithCommas(populationList[index]?.Population)}
      </Text>
      <View
        paddingHorizontal={30}
        paddingTop={5}
        display="flex"
        flexDirection="row"
      ><Text
      fontSize={16}
      color={Colors.dark.progressive}
      >

        {"+20,879,999 (56%)"}
      </Text>
      <Text fontSize={16} color={Colors.dark.mutedText}>

        {" since "}
        {populationList[0]?.Year}
      </Text>
      </View>
      <CustomChart index={index} />
      <Text
        fontSize={20}
        fontWeight={"400"}
        paddingHorizontal={20}
        color={Colors.dark.text}
        paddingTop={10}
        marginBottom={10}
      >
        Key Statistics
      </Text>
      {populationList && populationList.length > 0 && (
        <View
          display="flex"
          flexDirection="row"
          paddingHorizontal={20}
          justifyContent="space-between"
        >
          <View
            width={"48%"}
            backgroundColor={Colors.dark.muted}
            paddingVertical={12}
            paddingHorizontal={10}
            borderRadius={10}
          >
            <Text fontSize={14} fontWeight={"400"} color={Colors.dark.text}>
              {populationList[0]?.Year} to {populationList[index]?.Year}
            </Text>
            <Text
              fontSize={22}
              fontWeight={"500"}
              color={Colors.dark.text}
              paddingTop={5}
            >
              +
              {getPopulationGrowth(
                populationList[0]?.Year,
                populationList[index]?.Year,
                populationList
              )}
            </Text>
            <Text fontSize={12} color={Colors.dark.progressive} paddingTop={5}>
              {getPopulationGrowthPercentage(
                populationList[0]?.Year,
                populationList[index]?.Year,
                populationList
              )}
              % increase
            </Text>
          </View>
          <View
            width={"48%"}
            backgroundColor={Colors.dark.muted}
            paddingVertical={12}
            paddingHorizontal={10}
            borderRadius={10}
          >
            <Text fontSize={14} fontWeight={"400"} color={Colors.dark.text}>
              {populationList[0]?.Year} to{" "}
              {populationList[populationList?.length - 1]?.Year}
            </Text>
            <Text
              fontSize={22}
              fontWeight={"500"}
              color={Colors.dark.text}
              paddingTop={5}
            >
              +
              {getPopulationGrowth(
                populationList[0]?.Year,
                populationList[populationList?.length - 1]?.Year,
                populationList
              )}
            </Text>
            <Text fontSize={12} color={Colors.dark.progressive} paddingTop={5}>
              {getPopulationGrowthPercentage(
                populationList[0]?.Year,
                populationList[populationList?.length - 1]?.Year,
                populationList
              )}
              % increase
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
