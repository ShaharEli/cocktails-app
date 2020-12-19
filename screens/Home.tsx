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
import {CocktailCard} from '../components';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import {ICocktail} from '../types';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

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
              {searchedCocktails.length} Search results for {searchText}:
            </Title>
            {loading && (
              <SkeletonContent
                isLoading={loading}
                animationDirection="horizontalLeft"
                boneColor="grey"
                highlightColor="#333333"
                containerStyle={{
                  flex: 1,
                  height: 250,
                  backgroundColor: '#121212',
                  width: MAX_WIDTH,
                }}
                layout={[
                  {width: 200, height: 20, marginLeft: 6, marginTop: 10},
                  {width: MAX_WIDTH, height: 200, marginTop: 10},
                ]}
              />
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
