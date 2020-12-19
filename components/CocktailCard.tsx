import React from 'react';
import {Card, Title, Paragraph, Chip} from 'react-native-paper';
import styled from 'styled-components';
import {MAX_WIDTH} from '../helpers';
import {ICocktail} from '../types';

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
        <Paragraph>
          {/* @ts-ignore */}
          {cocktail.strCategory && (
            <Chip
              style={chipStyle}
              mode="outlined"
              icon="format-list-bulleted-type">
              {cocktail.strCategory}
            </Chip>
          )}
          {/* @ts-ignore */}
          {cocktail.strAlcoholic && (
            <Chip style={chipStyle} mode="outlined" icon="glass-cocktail">
              {cocktail.strAlcoholic}
            </Chip>
          )}
          {/* @ts-ignore */}
        </Paragraph>
      </Card.Content>
      {/* @ts-ignore */}
      {cocktail.strDrinkThumb && (
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

const chipStyle = {width: MAX_WIDTH * 0.4, overflow: 'hidden', margin: 20};

const StyledCard = styled(Card)`
  background-color: ${({theme}) => theme.colors.sideBar};
  margin-bottom: 25px;
`;
