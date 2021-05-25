import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import {BASE_API_URL} from '../helpers';
import {ICocktail} from '../types';
import {CocktailCard, CocktailSkelaton} from '../components';

export function CocktailsList({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const {query, info}: {query: string; info: string} = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [coctails, setCocktails] = useState<ICocktail[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: {drinks: cocktailsToAdd},
        } = await axios.get(`${BASE_API_URL}/filter.php?${query}=${info}`);
        setCocktails(cocktailsToAdd);
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  });

  return (
    <Container>
      <ScrollView>
        {loading ? (
          <>
            <CocktailSkelaton />
            <CocktailSkelaton />
          </>
        ) : (
          coctails.map((cocktail: ICocktail) => (
            <CocktailCard
              navigation={navigation}
              cocktail={cocktail}
              key={cocktail.idDrink}
            />
          ))
        )}
      </ScrollView>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
`;
