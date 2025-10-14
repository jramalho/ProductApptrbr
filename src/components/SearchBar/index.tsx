import React from 'react';
import { TextInput } from 'react-native';
import * as S from './styles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  testID?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  placeholder = 'Search products...',
  testID = 'search-input'
}) => {
  return (
    <S.Container>
      <S.SearchInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        testID={testID}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </S.Container>
  );
};

export default SearchBar;
