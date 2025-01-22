import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Input } from 'native-base';

import { View } from '@/components/Themed';

import { Product } from '@/components/Product';
import { getProducts } from '@/services/products';
import { ProductType } from '@/types/Product';
import { useDebounce } from '@/utils/debounce';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function ProductsScreen() {
  const [products, setProducts] = useState<ProductType[]>();
  const [data, setData] = useState<ProductType[]>();
  const colorScheme = useColorScheme();
  const [search, setSearch] = useState<string>("");
  
  async function getProds() {
    const prods = await getProducts();
    setProducts(prods);
    setData(prods);
  };

  getProds();

  return (
    <View style={styles.container}>
      <Input mx="3" color={Colors[colorScheme ?? 'light'].text}
        placeholder="Search..." w="100%"
        onChangeText={(text) => setSearch(text.toLowerCase())} 
        />
      {products?.filter((item) => {
        return item.name.toLowerCase().indexOf(search) > -1 
                || item.type.toLowerCase().indexOf(search) > -1
                || item.details.toLowerCase().indexOf(search) > -1
        })?.map((item: ProductType) => {
        return (
          <Link key={item.id} href={{
            pathname: '/productDetails/[id]',
            params: { id: item.id, name: item.name },
          }} asChild>
            <Pressable>
              {({ pressed }) => (
                <Product product={item}/>
              )}
            </Pressable>
          </Link>
        );
      })}
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
