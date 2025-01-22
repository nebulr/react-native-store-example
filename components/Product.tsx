import  {  Box, AspectRatio, Image, Center, 
          Stack, Heading, HStack, Text 
        } from 'native-base';
import { ProductType } from '@/types/Product';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export function Product(props : { product: ProductType }) {
  const { product } = props;
  const colorScheme = useColorScheme();
  return (
    <Box alignItems="center">
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" marginTop="5" 
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
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
              <Image source={{
                  uri: product?.image
                }} alt="image" />
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
        </Stack>
      </Box>
    </Box>
  );
};