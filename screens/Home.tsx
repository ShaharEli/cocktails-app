import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import styled from 'styled-components';
import {BASE_API_URL, MAX_WIDTH} from '../helpers';
import {CocktailCard, CocktailSkelaton} from '../components';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import {ICocktail} from '../types';

export function Home({navigation}: {navigation: any}) {
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [randomCocktail, setRandomCocktail] = useState<ICocktail | null>(null);
  const [searchedCocktails, setSearchedCocktails] = useState<ICocktail[]>([]);

  const handleFetchRandomCocktail = useCallback(async (): Promise<void> => {
    try {
      const {data: cocktail} = await axios.get(`${BASE_API_URL}/random.php`);
      setRandomCocktail(cocktail.drinks[0]);
    } catch {}
  }, []);

  const handleSearchCocktail = useCallback(
    async (search: string): Promise<void> => {
      setLoading(true);
      try {
        const {data: cocktails} = await axios.get(
          `${BASE_API_URL}/search.php?s=${search}`,
        );
        setSearchedCocktails(cocktails?.drinks || []);
      } catch {
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    (async () => {
      await handleFetchRandomCocktail();
    })();
  }, []);

  const handleSearch = async (search: string) => {
    setSearchText(search);
    await handleSearchCocktail(search);
  };

  return (
    <HomeContainer>
      <ScrollView>
        {/* @ts-ignore */}
        <StyledInput
          label="Search drink"
          value={searchText}
          onChangeText={(text) => handleSearch(text)}
        />
        {searchText ? (
          <>
            <Title>
              {!loading && searchedCocktails.length} Search results for{' '}
              {searchText}:
            </Title>
            {loading && (
              <>
                <CocktailSkelaton />
                <CocktailSkelaton />
              </>
            )}
            {searchedCocktails.map((cocktail: ICocktail) => (
              <CocktailCard
                key={cocktail.idDrink}
                cocktail={cocktail}
                navigation={navigation}
              />
            ))}
          </>
        ) : (
          <View>
            <TouchableOpacity onPress={handleFetchRandomCocktail}>
              <Title>
                While you are thinking what cocktail you want heres random
                cocktail
              </Title>
            </TouchableOpacity>
            {randomCocktail ? (
              <CocktailCard cocktail={randomCocktail} navigation={navigation} />
            ) : (
              <CocktailSkelaton />
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
  padding: 15px;
`;

const HomeContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

const StyledInput = styled(TextInput)`
  margin-top: 20px;
  width: 90%;
  align-self: center;
`;
