import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Button, Icon, Stack } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';

import { View } from '@/components/Themed';
import { ProductListItem } from '@/components/ProductListItem';
import { ProductSelectedType } from '@/types/ProductSelected';
import { useCartContext } from '@/context/cart';

export default function CartScreen() {
  const cartContext = useCartContext();
  const [products, setProducts] = useState(cartContext.cart);

  const removed = (sku: string) => {
    const copy = [...products];
    copy.splice(copy.findIndex((item) => item.sku === sku), 1)
    setProducts(copy);
    cartContext.removeFromCart(sku)
  };

  const clearCart = () => {
    setProducts([]);
    cartContext.clearCart();
  }

  return (
    <View style={styles.container}>
      {products.map((item : ProductSelectedType) => 
        (<ProductListItem key={item.sku} product={item} removed={removed} />)
      )}
      <Link href="/checkout"  asChild>
        <Button marginTop="5" minW="80" leftIcon={
          <Icon as={FontAwesome} name="shopping-cart" size="sm" />
          }>
          Proceed to Checkout
        </Button>
      </Link>

      <Button size="sm" minW="80" colorScheme="secondary" marginTop="5" leftIcon={
          <Icon as={FontAwesome} name="shopping-cart" size="sm" />
          } onPress={clearCart}>
        Clear Cart
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
