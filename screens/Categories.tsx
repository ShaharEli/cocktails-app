import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';
import {BASE_API_URL} from '../helpers';
import {ICategorie} from '../types';
import {Info} from '../components';

export function Categories({navigation}: {navigation: any}) {
  const [categories, setCategories] = useState<ICategorie[]>([]);

  useEffect(() => {
    (async () => {
      const {data: cocktailsCategories} = await axios.get(
        `${BASE_API_URL}/list.php?c=list`,
      );
      setCategories(cocktailsCategories.drinks);
    })();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {categories &&
          categories.map(({strCategory: category}) => (
            <Info navigation={navigation} info={category} key={category} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
