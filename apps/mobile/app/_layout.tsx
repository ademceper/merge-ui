import { Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"
import "../global.css"

const AppLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack />
    </SafeAreaProvider>
  )
}

export default AppLayout
