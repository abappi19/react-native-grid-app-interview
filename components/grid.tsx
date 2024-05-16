import { View } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"

export default function Grid({ width, height, color }: {
    width: number,
    height: number,
    color: string,
}) {
    return (
        <View
            className="border border-gray-300"
            style={{
                height: height,
                width: width,
                backgroundColor: color
            }}>

        </View>
    )
}