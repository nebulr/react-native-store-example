import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable } from 'react-native';
import { Badge, VStack } from 'native-base';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useCartContext } from '@/context/cart';

export function CartIcon() {
  const colorScheme = useColorScheme();
  const cartContext = useCartContext();
  return (
    <Link href="/cart" asChild>
      <Pressable>
        {({ pressed }) => (
          <VStack>
            <Badge
              colorScheme="danger" rounded="full" mb={-3} mr={-1} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
              fontSize: 12
            }}>
              {cartContext.cart.length}
            </Badge>
              <FontAwesome
                name="shopping-cart"
                size={25}
                color={Colors[colorScheme ?? 'light'].iconDefault}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
          </VStack>
        )}
      </Pressable>
    </Link>
  );
}