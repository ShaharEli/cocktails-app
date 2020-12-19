import React, {useContext} from 'react';
import styled from 'styled-components';
import {Switch} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView, View} from 'react-native';
import {ThemeContext} from '../helpers';

export function SideBar({navigation}: {navigation: any}) {
  //@ts-ignore
  const {currentTheme, setCurrentTheme} = useContext<ThemeType>(ThemeContext);

  const onToggleTheme = async (): Promise<void> => {
    try {
      switch (currentTheme) {
        case 'light':
          setCurrentTheme('dark');
          await AsyncStorage.setItem('theme', 'dark');
          break;
        case 'dark':
          setCurrentTheme('light');
          await AsyncStorage.setItem('theme', 'light');
          break;
      }
    } catch {}
  };

  const getToggleIconName = (): string =>
    currentTheme === 'dark' ? 'moon' : 'sun';

  const getToggleIconColor = (): string =>
    currentTheme === 'dark' ? 'blue' : 'yellow';

  return (
    <SideBarContainer>
      <ThemeToggle>
        {/* @ts-ignore */}
        <Switch value={currentTheme === 'dark'} onValueChange={onToggleTheme} />
        <Icon
          size={28}
          name={getToggleIconName()}
          color={getToggleIconColor()}
        />
      </ThemeToggle>
    </SideBarContainer>
  );
}

const ThemeToggle = styled(View)`
  flex-direction: row;
  align-self: center;
  width: 100px;
  justify-content: space-around;
`;

const SideBarContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.sideBar};
`;
