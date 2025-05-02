// components/HeaderRightButtons.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderCartButton from './headerCartButton';

interface HeaderRightButtonsProps {
  onSearchPress: () => void;
}

const HeaderRightButtons: React.FC<HeaderRightButtonsProps> = ({ onSearchPress }) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onSearchPress}>
        <Icon name="search" size={22} color="#000" style={styles.icon} />
      </TouchableOpacity>
      <HeaderCartButton />
    </View>
  );
};

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 16,
    },
  });

export default HeaderRightButtons;
