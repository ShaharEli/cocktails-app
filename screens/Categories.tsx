import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';
import {BASE_API_URL} from '../helpers';
import {ICategorie} from '../types';
import styled from 'styled-components';
import {Info} from '../components';

export function Categories({navigation, route}: {navigation: any; route: any}) {
  const [categories, setCategories] = useState<string[]>([]);
  const {query}: {query: string} = route.params;
  useEffect(() => {
    (async () => {
      try {
        const {
          data: {drinks: cocktailsCategories},
        } = await axios.get(`${BASE_API_URL}/list.php?${query}=list`);
        const newValues: string[] = [];
        for (let item of cocktailsCategories) {
          //@ts-ignore
          newValues.push(Object.values(item)[0]);
        }
        setCategories(newValues);
      } catch {}
    })();
  }, [query]);

  return (
    <CategoriesContainer>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {categories &&
          categories.map((category: string) => (
            <Info
              query={query}
              navigation={navigation}
              info={category}
              key={category}
            />
          ))}
      </ScrollView>
    </CategoriesContainer>
  );
}

const CategoriesContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;
