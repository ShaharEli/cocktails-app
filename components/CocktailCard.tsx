import React from 'react';
import {Card, Title, Chip} from 'react-native-paper';
import styled from 'styled-components';
import {ICocktail} from '../types';
import {View} from 'react-native';

export function CocktailCard({
  cocktail,
  navigation,
}: {
  cocktail: ICocktail;
  navigation: any;
}) {
  const handleNavigation = () =>
    navigation.navigate('Cocktail', {id: cocktail.idDrink});
  return (
    // @ts-ignore
    <StyledCard onPress={handleNavigation}>
      <Card.Content>
        <StyledTitle>{cocktail.strDrink}</StyledTitle>
        <ChipContainer>
          {cocktail.strCategory && (
            // @ts-ignore
            <Chip mode="outlined" icon="format-list-bulleted-type">
              {cocktail.strCategory}
            </Chip>
          )}
          {cocktail.strAlcoholic && (
            // @ts-ignore
            <Chip mode="outlined" icon="glass-cocktail">
              {cocktail.strAlcoholic}
            </Chip>
          )}
        </ChipContainer>
      </Card.Content>
      {cocktail.strDrinkThumb && (
        // @ts-ignore
        <StyledCocktailCover source={{uri: cocktail.strDrinkThumb}} />
      )}
    </StyledCard>
  );
}

const StyledCocktailCover = styled(Card.Cover)`
  height: 250px;
  margin-top: 20px;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 20px;
  color: ${({theme}) => theme.colors.font};
`;

const StyledCard = styled(Card)`
  background-color: ${({theme}) => theme.colors.sideBar};
  margin-bottom: 25px;
`;

const ChipContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
`;
