import { ScrollView } from 'react-native'
import { SharedValue } from 'react-native-reanimated'

export interface BackgroundContext {
  scrollY: SharedValue<number>
  scrollViewRef: React.MutableRefObject<ScrollView | undefined>
}
