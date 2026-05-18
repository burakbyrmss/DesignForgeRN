import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccessibilityScreen } from '@/features/design-system/screens/AccessibilityScreen';
import { BorderScreen } from '@/features/design-system/screens/BorderScreen';
import { BrandScreen } from '@/features/design-system/screens/BrandScreen';
import { ColorScreen } from '@/features/design-system/screens/ColorScreen';
import { ElevationScreen } from '@/features/design-system/screens/ElevationScreen';
import { ExportScreen } from '@/features/design-system/screens/ExportScreen';
import { MotionScreen } from '@/features/design-system/screens/MotionScreen';
import { RadiusScreen } from '@/features/design-system/screens/RadiusScreen';
import { SpacingScreen } from '@/features/design-system/screens/SpacingScreen';
import { ThemingScreen } from '@/features/design-system/screens/ThemingScreen';
import { TypographyScreen } from '@/features/design-system/screens/TypographyScreen';
import type { RootStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Brand"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
        <Stack.Screen name="Brand" component={BrandScreen} />
        <Stack.Screen name="Color" component={ColorScreen} />
        <Stack.Screen name="Typography" component={TypographyScreen} />
        <Stack.Screen name="Spacing" component={SpacingScreen} />
        <Stack.Screen name="Radius" component={RadiusScreen} />
        <Stack.Screen name="Elevation" component={ElevationScreen} />
        <Stack.Screen name="Border" component={BorderScreen} />
        <Stack.Screen name="Motion" component={MotionScreen} />
        <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
        <Stack.Screen name="Theming" component={ThemingScreen} />
        <Stack.Screen name="Export" component={ExportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
