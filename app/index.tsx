import Rectangle from "@/components/rectangle";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";

export default function Index() {
  const colors = ['red', 'green', 'blue'];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [gridWidth, setGridWidth] = useState(5);
  const [gridHeight, setGridHeight] = useState(8);

  return (
    <View>
      <Picker
        className="mx-5"
        selectedValue={selectedColor}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedColor(itemValue)
        }

      >
        {
          colors.map((c) => <Picker.Item label={c.replace(/^\w?/ig, function (w) { return w.toUpperCase() })} value={c} />)
        }
      </Picker>

      <View className="flex flex-row items-center mx-5 justify-between gap-2">
        <Text>Width: </Text>

        <TextInput
          className="font-bold text-xl mx-5 p-2 my-1 border border-gray-200 flex-shrink-0 flex-grow text-center"
          value={String(gridWidth)} placeholder="Width" onChangeText={(text) => {
            setGridWidth(Number(text));
          }} />

      </View>

      <View className="flex flex-row items-center mx-5 justify-between gap-2">
        <Text>Height: </Text>

        <TextInput
          className="font-bold text-xl mx-5 p-2 my-1 border border-gray-200 flex-shrink-0 flex-grow text-center"
          value={String(gridHeight)} placeholder="Height" onChangeText={(text) => {
            setGridHeight(Number(text));
          }} />

      </View>

      <Rectangle color={selectedColor} rows={gridWidth} cols={gridHeight} />
      
    </View>
  );
}
