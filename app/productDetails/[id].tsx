import { StyleSheet } from 'react-native';
import { useLayoutEffect, useState, useEffect } from 'react';
import  {  Box, AspectRatio, Image, Center, Icon,
  Stack, Heading, HStack, Text, Select, CheckIcon, Button
} from 'native-base';
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons';;

import { getProduct } from '@/services/products';
import { ProductType } from '@/types/Product';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useCartContext } from '@/context/cart';

export default function ProductDetailsScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const [product, setProduct] = useState<ProductType>()
  const [variation, setVariation] = useState<string>();
  const cartContext = useCartContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product?.name || 'Product',
    });
  }, [navigation, product, product?.name]);

  async function getProd() {
    const prod = await getProduct(String(id));
    setProduct(prod);
  };

  useEffect(() => {
    setVariation(product?.variations[0])
  }, [product])
  
  const addToCart = () => {
    cartContext.addToCart(product, variation);
  };

  getProd();

  return (
    <Box>
      <Box>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
          {(product) ? (
            <Image source={{
              uri: product?.image
            }} alt="image" />
          ) : null}
          </AspectRatio>
          <Center bg="red.500" _dark={{
              bg: "red.400"
            }} _text={{
              color: Colors[colorScheme ?? 'light'].text,
              fontWeight: "700",
              fontSize: "xs"
            }} position="absolute" bottom="0" px="3" py="1.5">
            NEW
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
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
          </Stack>
          <Text fontWeight="400" color={Colors[colorScheme ?? 'light'].text}>
            {product?.details}
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
              </Text>
            </HStack>
          </HStack>
          <Box>
            <Text color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }} fontWeight="400">
              {`Select your ${product?.type} option`}
            </Text>
            <Select color={Colors[colorScheme ?? 'light'].text} selectedValue={variation} minWidth="200" 
              accessibilityLabel={`Select ${product?.type}`} placeholder={`Select ${product?.type}`} _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setVariation(itemValue)}>
              {product?.variations.map((item) => {
                return (<Select.Item key={item} label={item} value={item} />)
              })}
            </Select>
          </Box>
          <Button 
            isLoading={false} spinnerPlacement="end" 
            isLoadingText="Adding to Cart" 
            leftIcon={<Icon as={FontAwesome} name="shopping-cart" size="sm" />}
            onPress={addToCart}
            >
            Add to Cart
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
