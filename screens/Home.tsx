import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import styled from 'styled-components';
import {BASE_API_URL} from '../helpers';
import {CocktailCard} from '../components';
import axios from 'axios';

export function Home({navigation}: {navigation: any}) {
  const [searchText, setSearchText] = useState<string>('');
  const [randomCocktail, setRandomCocktail] = useState<any>(null);
  const [searchedCocktails, setSearchedCocktails] = useState<any[]>([]);

  const handleFetchRandomCocktail = useCallback(async (): Promise<void> => {
    try {
      const {data: cocktail} = await axios.get(`${BASE_API_URL}/random.php`);
      setRandomCocktail(cocktail);
    } catch {}
  }, []);

  const handleSearchCocktail = useCallback(
    async (search: string): Promise<void> => {
      try {
        const {data: cocktails} = await axios.get(
          `${BASE_API_URL}/search.php?s=${search}`,
        );
        setSearchedCocktails(cocktails);
      } catch {}
    },
    [],
  );

  useEffect(() => {
    (async () => {
      await handleFetchRandomCocktail();
    })();
  }, []);

  return (
    <HomeContainer>
      <ScrollView>
        {searchText ? (
          <Title></Title>
        ) : (
          <View>
            <TouchableOpacity onPress={handleFetchRandomCocktail}>
              <Title>
                While you thinking what cocktail you want heres random cocktail
              </Title>
            </TouchableOpacity>
            {randomCocktail && (
              <CocktailCard
                cocktail={randomCocktail.drinks[0]}
                navigation={navigation}
              />
            )}
          </View>
        )}
      </ScrollView>
    </HomeContainer>
  );
}

const Title = styled(Text)`
  color: ${({theme}) => theme.colors.font};
  font-size: 30px;
  padding: 10px;
`;

const HomeContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;
