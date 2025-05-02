// components/HeaderSearchBar.tsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface HeaderSearchBarProps {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

const HeaderSearchBar: React.FC<HeaderSearchBarProps> = ({ value, onChange, onSubmit }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search products..."
      value={value}
      onChangeText={onChange}
      returnKeyType="search"
      onSubmitEditing={onSubmit}
      placeholderTextColor="#333"
      autoFocus
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    borderRadius: 8,
    width: 250,
    height: 40,
  },
});

export default HeaderSearchBar;
