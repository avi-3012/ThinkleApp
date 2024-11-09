import { View } from "tamagui";
import Search from "@/assets/icons/search.svg";
import Favourite from "@/assets/icons/favorite.svg";
import Close from "@/assets/icons/close.svg";
import { Colors } from "@/constants/Colors";

const TopComponent = () => {
  return (
    <View
      flexDirection="row"
      display="flex"
      justifyContent="space-between"
      backgroundColor={Colors.dark.background}
      paddingHorizontal={30}
      paddingVertical={10}
    >
      <View>
        <Search />
      </View>
      <View display="flex" flexDirection="row" gap={5}>
        <Favourite />
        <Close />
      </View>
    </View>
  );
};

export default TopComponent;
