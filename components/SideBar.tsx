import React, {useContext} from 'react';
import styled from 'styled-components';
import {Switch} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';
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

  const getRouteIconColor = (): string =>
    currentTheme === 'dark' ? 'white' : 'black';

  const handleNavigation = (route: string): void => {
    navigation.navigate(route);
  };

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
      <RouteLink onPress={() => handleNavigation('Home')}>
        <Icon size={28} name="home" color={getRouteIconColor()} />
        <RouteLinkText>Home</RouteLinkText>
      </RouteLink>
      <RouteLink onPress={() => handleNavigation('Categories')}>
        <Icon size={28} name="grid" color={getRouteIconColor()} />
        <RouteLinkText>Categories</RouteLinkText>
      </RouteLink>
    </SideBarContainer>
  );
}

const RouteLinkText = styled(Text)`
  color: ${({theme}) => theme.colors.font};
  font-size: 18px;
  margin-left: 6px;
`;

const RouteLink = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background-color: ${({theme}) => theme.colors.task};
`;

const ThemeToggle = styled(View)`
  flex-direction: row;
  margin-top: 20px;
  align-self: center;
  width: 100px;
  justify-content: space-around;
`;

const SideBarContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.sideBar};
`;
