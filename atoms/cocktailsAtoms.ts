import {atom} from 'recoil';

export const allCocktailsState = atom<any[]>({
  key: 'allCocktailsState',
  default: [],
});
