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
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import {ICocktail} from '../types';

export function Home({navigation}: {navigation: any}) {
  const [searchText, setSearchText] = useState<string>('');
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
      try {
        const {data: cocktails} = await axios.get(
          `${BASE_API_URL}/search.php?s=${search}`,
        );
        setSearchedCocktails(cocktails.drinks);
      } catch {}
    },
    [],
  );

  useEffect(() => {
    (async () => {
      await handleFetchRandomCocktail();
    })();
  }, []);
  console.log(searchedCocktails);

  const handleSearch = async (search: string) => {
    setSearchText(search);
    await handleSearchCocktail(search);
  };

  return (
    <HomeContainer>
      <StyledInput
        label="Search drink"
        value={searchText}
        onChangeText={(text) => handleSearch(text)}
      />
      <ScrollView>
        {searchText ? (
          <>
            <Title></Title>
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
                While you thinking what cocktail you want heres random cocktail
              </Title>
            </TouchableOpacity>
            {randomCocktail && (
              <CocktailCard cocktail={randomCocktail} navigation={navigation} />
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

const StyledInput = styled(TextInput)`
  background-color: grey;
  margin-top: 20px;
`;
