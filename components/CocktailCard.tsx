import React from 'react';
import {Card, Title, Paragraph, Chip} from 'react-native-paper';
import styled from 'styled-components';
import {Text} from 'react-native';
import {MAX_WIDTH} from '../helpers';

export function CocktailCard({
  cocktail,
  navigation,
}: {
  cocktail: any;
  navigation: any;
}) {
  console.log(cocktail);

  return (
    // @ts-ignore
    <Card>
      <Card.Content>
        <Title>{cocktail.strDrink}</Title>
        <Paragraph>
          {/* @ts-ignore */}
          <Chip
            style={{width: MAX_WIDTH * 0.5, overflow: 'hidden'}}
            mode="outlined"
            icon="format-list-bulleted-type">
            {cocktail.strCategory}
          </Chip>
          {/* @ts-ignore */}
          <Chip
            style={{width: MAX_WIDTH * 0.4, overflow: 'hidden'}}
            mode="outlined"
            icon="glass-cocktail">
            {cocktail.strAlcoholic}
          </Chip>
          {/* @ts-ignore */}
        </Paragraph>
      </Card.Content>
      {/* @ts-ignore */}
      <Card.Cover
        style={{height: 250}}
        source={{uri: cocktail.strDrinkThumb}}
      />
    </Card>
  );
}

const StyledCocktailCover = styled(Card.Cover)``;
