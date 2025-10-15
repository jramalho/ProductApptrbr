import Styled from 'styled-components/native';

export const Container = Styled.View`
  flex: 1;
  padding: 35px 10px 0 10px;
  background-color: #FFFFFF;
`;

export const HeaderRow = Styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const FavoritesButton = Styled.Pressable`
  padding: 8px;
`;

export const Title = Styled.Text`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

export const Subtitles = Styled.Text`
  font-size: 18px;
  padding: 10px 0;
`;

export const SortList = Styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
