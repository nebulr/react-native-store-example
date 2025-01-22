import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { Button, Icon, Box, VStack } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { View } from '@/components/Themed';
import { ProductListItem } from '@/components/ProductListItem';
import { ProductSelectedType } from '@/types/ProductSelected';
import { useCartContext } from '@/context/cart';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { FormInput } from '@/components/FormInput';
import { CreditCardFormData, CreditCardInput, CreditCardView } from 'react-native-credit-card-input';
import { StateSelect } from '@/components/StateSelect';

export default function CheckoutScreen() {
  const [info, setInfo] = useState<any>({});
  const cartContext = useCartContext();
  const colorScheme = useColorScheme();
  const [products, setProducts] = useState(cartContext.cart);
  const [card, setCard] = useState<CreditCardFormData>();

  return (
    <View style={styles.container}>
      <VStack>
        {products?.map((item : ProductSelectedType) => 
          (<ProductListItem key={item.sku} product={item} />)
        )}
      </VStack>
      <Box alignItems="left" marginLeft="-5">
        <FormInput label="Name" /> 
        <FormInput label="Phone" />
        <FormInput label="Street Address" />
        <FormInput label="Apt. Number / Suite" />
        <StateSelect onChange={(state) => {console.log(state)}}/>
        <FormInput label="Postal Code" />
        <CreditCardView
          style={{ marginTop: '20' }}
          type={card?.values.type}
          number={card?.values.number}
          expiry={card?.values.expiry}
          cvc={card?.values.cvc}
        />
        <CreditCardInput 
          placeholderColor={Colors[colorScheme ?? 'light'].text}
          inputStyle={{ color: Colors[colorScheme ?? 'light'].text }}
          onChange={(card : CreditCardFormData) => setCard(card)}
          />
      </Box>
      <Button marginTop="5" minW="80" leftIcon={
        <Icon as={FontAwesome} name="shopping-cart" size="sm" />
        }>
        Complete Payment
      </Button>
    </View>
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
