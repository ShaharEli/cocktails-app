import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, ScrollView, Image} from 'react-native';
import styled from 'styled-components';
import {BASE_API_URL, MAX_WIDTH} from '../helpers';
import axios from 'axios';
import {ICocktail} from '../types';
import Icon from 'react-native-vector-icons/FontAwesome5';

export function Cocktail({navigation, route}: {navigation: any; route: any}) {
  const [cocktail, setCocktail] = useState<ICocktail | null>(null);
  const {id}: {id: string} = route.params;
  useEffect(() => {
    (async () => {
      try {
        const {data: cocktailData} = await axios.get(
          `${BASE_API_URL}/lookup.php?i=${id}`,
        );
        setCocktail(cocktailData.drinks[0]);
      } catch {}
    })();
  }, [id]);
  return (
    <CocktailContainer>
      <ScrollView contentContainerStyle={ScrollViewStyle}>
        {cocktail && (
          <>
            <Title>{cocktail.strDrink}</Title>
            {cocktail.strDrinkThumb && (
              <StyledImage source={{uri: cocktail.strDrinkThumb}} />
            )}
            <Label>
              <LabelIcon name="glass-martini-alt" size={25} />
              <LabelTxt>{cocktail.strAlcoholic}</LabelTxt>
            </Label>
            <Label>
              <LabelIcon name="glass-cheers" size={25} />
              <LabelTxt>{cocktail.strGlass}</LabelTxt>
            </Label>
            <InstructionsTitle>Instructions:</InstructionsTitle>
            <Instructions>{cocktail.strInstructions}</Instructions>
          </>
        )}
      </ScrollView>
    </CocktailContainer>
  );
}

const Instructions = styled(Text)`
  margin-top: 12px;
  margin-left: 12px;
  color: ${({theme}) => theme.colors.font};
  font-size: 15px;
`;

const InstructionsTitle = styled(Text)`
  align-self: flex-start;
  margin: 12px;
  color: ${({theme}) => theme.colors.font};
  font-size: 20px;
`;

const LabelIcon = styled(Icon)`
  color: ${({theme}) => theme.colors.font};
  margin-right: 10px;
`;

const LabelTxt = styled(Text)`
  color: ${({theme}) => theme.colors.font};
  font-size: 18px;
`;

const Label = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const ScrollViewStyle = {alignItems: 'center'};

const StyledImage = styled(Image)`
  width: ${MAX_WIDTH * 0.8}px;
  height: ${MAX_WIDTH * 0.8}px;
`;

const Title = styled(Text)`
  color: ${({theme}) => theme.colors.font};
  font-size: 30px;
  padding: 10px;
`;

const CocktailContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  align-items: center;
`;
