import CustomChart from "@/components/CustomChart";
import TopComponent from "@/components/TopComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, useColorScheme, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { View, Text, ScrollView } from "tamagui";
import { useApi } from "@/hooks/useApi";
import { getPopulationGrowth, getYearlyGrowthPercentage } from "@/utils/functions";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const data = useApi();
  const { populationList, index, isLoading } = data;

  if (isLoading) {
    return (
    <View flex={1} justifyContent="center" alignItems="center" backgroundColor={Colors.dark.background}>
      <ActivityIndicator color={"#ffffff"}/>
    </View>
    )
  }

  if (populationList?.length === 0){
    return (
      <View flex={1} justifyContent="center" alignItems="center" backgroundColor={Colors.dark.background}>
        <Text fontSize={20} fontWeight= {'bold'} paddingHorizontal={30} color={Colors.dark.text} paddingTop={10}>No data available</Text>
      </View>
    )
  }

  return (
    
    <View
      style={{ flex: 1 }}
      // marginTop={30}
      backgroundColor={Colors.dark.background}
    >
    <ScrollView flex={1}>
      <TopComponent />
      <Text
        fontSize={26}
        fontWeight={"bold"}
        paddingHorizontal={30}
        color={Colors.dark.text}
        paddingTop={10}
      >
        Population Trends
      </Text>
      <CustomChart index={index}/>
      {populationList&&(populationList.length>0)&&<View
        marginHorizontal={20}
        backgroundColor={Colors.dark.muted}
        padding={15}
        borderRadius={10}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <View>
          <Text color={Colors.dark.text}>Total Growth</Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            color={Colors.dark.mutedText}
            paddingTop={2}
          >
           {populationList[index]?.Year}
          </Text>
        </View>
        <View>
          <Text
            fontSize={26}
            fontWeight={"bold"}
            color={Colors.dark.progressive}
          >
            {getPopulationGrowth(populationList[index>=1?index-1:0]?.Year,populationList[index]?.Year, populationList)}
          </Text>
        </View>
      </View>}
      {populationList&&(populationList.length>0)&&<View 
        marginTop={20}
        marginHorizontal={20}
        backgroundColor={Colors.dark.muted}
        padding={15}
        borderRadius={10}
        flexDirection="column"
        justifyContent="space-between"
        gap={2}
        > 
          <View flexDirection="row" justifyContent="space-between">
            <Text color={Colors.dark.text} marginBottom={2}>Recent Growth rate</Text>
          </View>
          {
            getYearlyGrowthPercentage(populationList).map((item,index)=>(
              <View flexDirection="row" justifyContent="space-between" key={populationList[index]?.ID_Nation}>
                <Text color={Colors.dark.mutedText}>{populationList[index]?.Year}-{populationList[index+1]?.Year}</Text>
                <Text color={Colors.dark.progressive}>{item}%</Text>
              </View>
            ))
          }
      </View>}
    </ScrollView>
    </View>
  );
}
