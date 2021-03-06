import React, {useContext} from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {MAX_WIDTH, ThemeContext} from '../helpers';

export function CocktailSkelaton() {
  //@ts-ignore
  const {currentTheme} = useContext(ThemeContext);

  const isDark: boolean = currentTheme === 'dark';

  return (
    <SkeletonContent
      isLoading={true}
      animationDirection="horizontalLeft"
      boneColor="grey"
      highlightColor="#e9e1e1"
      containerStyle={{
        flex: 1,
        height: 300,
        backgroundColor: isDark ? '#003847' : '#f0efeb',
        width: MAX_WIDTH,
        marginTop: 30,
      }}
      layout={[
        {width: 200, height: 20, marginLeft: 6, marginTop: 10},
        {width: 300, height: 20, marginLeft: 6, marginTop: 10},
        {width: MAX_WIDTH, height: 200, marginTop: 10},
      ]}
    />
  );
}
