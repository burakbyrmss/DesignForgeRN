import './global.css';

import { StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DesignSystemProvider } from '@/features/design-system/context/DesignSystemContext';
import { RootNavigator } from '@/navigation/RootNavigator';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <DesignSystemProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootNavigator />
        </DesignSystemProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
