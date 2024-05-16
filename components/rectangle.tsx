import { useState } from "react";
import { Dimensions, PanResponder, Text, View } from "react-native";
import Grid from "./grid";
import Svg, { Rect } from 'react-native-svg';


type RectangleType = {
    x: number,
    y: number,
    width: number,
    height: number
}

export default function Rectangle({ color, rows, cols }: {
    color: string,
    rows: number,
    cols: number
}) {

    const { width } = Dimensions.get('window');
    // const [color, setColor] = useState('#a91e1e');
    const [rectangles, setRectangles] = useState<Array<RectangleType>>([]);
    const [currentRect, setCurrentRect] = useState<RectangleType | null>({
        x: 0, y: 0,
        width: 0, height: 0
    });



    const gridWidth = width / rows;
    const gridHeight = width / cols;


    const panResponser = PanResponder.create({
        onStartShouldSetPanResponder(e, gestureState) {
            return true;
        },
        onPanResponderGrant(e, gestureState) {
            const { locationX, locationY } = e.nativeEvent;
            setCurrentRect({ x: locationX, y: locationY, width: 0, height: 0 });

        },
        onPanResponderMove: (evt) => {
            if (currentRect) {
                const { locationX, locationY } = evt.nativeEvent;
                setCurrentRect((prevRect) => {

                    if (!prevRect) {
                        return {
                            x: 0,
                            y: 0,
                            height: locationY,
                            width: locationX
                        }
                    }

                    return ({
                        ...prevRect,
                        width: locationX - prevRect.x,
                        height: locationY - prevRect.y,
                    })
                });
            }
        },
        onPanResponderRelease: () => {
            if (currentRect) {
                setRectangles((prevRects) => [...prevRects, currentRect]);
                setCurrentRect(null);
            }
        },

    });



    return (
        <View
            {...panResponser.panHandlers}
            className="flex flex-row flex-wrap relative"
            style={{
                width: width,
                height: width,
                // backgroundColor: color,
            }}

        >


            <View className="absolute top-0 left-0 bottom-0 right-0 flex flex-row flex-wrap">

                {Array.from({ length: rows * cols }).map((_, index) => (
                    <Grid key={index} color={color} width={gridWidth} height={gridHeight} />
                ))}

            </View>


            <Svg
                className="absolute top-0 left-0"
                height={width} width={width}
            >
                {rectangles.map((rect, index) => (
                    <Rect
                        key={index}
                        x={rect.x}
                        y={rect.y}
                        width={rect.width}
                        height={rect.height}
                        fill="rgba(0, 0, 255, 0.5)"
                        stroke="blue"
                    />
                ))}


                {currentRect && (
                    <Rect
                        x={currentRect.x}
                        y={currentRect.y}
                        width={currentRect.width}
                        height={currentRect.height}
                        fill="rgba(0, 0, 255, 0.5)"
                        stroke="blue"
                    />
                )}
            </Svg>





        </View>
    );
}