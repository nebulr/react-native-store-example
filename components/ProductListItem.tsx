import FontAwesome from '@expo/vector-icons/FontAwesome';
import {  Box, Image, Heading, Text, VStack, Flex, Center } from 'native-base';
import { Pressable } from 'react-native';
import { ProductSelectedType } from '@/types/ProductSelected';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useCartContext } from '@/context/cart';

export function ProductListItem(props : { product: ProductSelectedType, removed?: (sku : string) => void }) {
  const { product, removed } = props;
  const colorScheme = useColorScheme();

  const removeFromCart = () => {
    if (removed) {
      removed(product?.sku);
    }
  }

  return (
    <Box alignItems="center" key={product?.sku}>
      <Box maxW="80" minW="80" maxH="75" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" marginTop="5" 
        style={{
          borderColor: Colors[colorScheme ?? 'light'].borderColor,
          backgroundColor: Colors[colorScheme ?? 'light'].view
        }}
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700"
        }} _web={{
          shadow: 2,
          borderWidth: 0
        }} _light={{
          backgroundColor: "gray.50"
        }}>
        <Flex direction="row">
          <Box padding={2}>
            <Image size={60} borderRadius={100} source={{
                uri: product?.image
              }} alt="image" />
          </Box>
          <VStack padding={2} minW="2/3">
            <Heading size="md" ml="-1" color={Colors[colorScheme ?? 'light'].text}>
              {product?.name}
            </Heading>
            <Text fontSize="xs" _light={{
                color: "red.500"
              }} _dark={{
                color: "red.400"
              }} fontWeight="500" ml="-0.5" mt="-1">
              {product?.type.toUpperCase()}
            </Text>
            <Text fontWeight="400" color={Colors[colorScheme ?? 'light'].text}>
              {product?.variation}
            </Text>
          </VStack>
          <Center>
            {(removed) ? (
              <Pressable onPress={removeFromCart}>
                {({ pressed }) => (
                  <VStack>
                      <FontAwesome
                        name="remove"
                        size={25}
                        color={Colors[colorScheme ?? 'light'].iconDefault}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                  </VStack>
                )}
              </Pressable>) :
              null
            }
          </Center>
        </Flex>
      </Box>
    </Box>
  );
};