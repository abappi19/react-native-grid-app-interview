import { Stack } from "expo-router";
// import Slot from "expo-router/Slot";

// Import your global CSS file
import "../global.css"

// export default Slot


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title:'Home'
      }} />
    </Stack>
  );
}
