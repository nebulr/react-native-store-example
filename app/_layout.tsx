import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Pressable } from 'react-native';

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { CartProvider } from '@/context/cart';
import { CartIcon } from '@/components/CartIcon';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <CartProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  title: 'Products',
                  headerRight: () => (
                    <CartIcon />
                  ),
                }}
              />
              <Stack.Screen
                name="productDetails/[id]"
                options={{ 
                  title: 'Product Details',
                  headerRight: () => (
                    <CartIcon />
                  ),
                }}
              />
              <Stack.Screen
                name="cart"
                options={{ title: 'Cart' }}
              />
              <Stack.Screen
                name="checkout"
                options={{ title: 'Checkout' }}
              />
              {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
            </Stack>
          </CartProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
