import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Category } from '../types/category';

interface Props {
  categories: Category[];
  selected: string;
  onSelect: (category: string) => void;
  scrollViewRef: React.RefObject<ScrollView | null>;
}

const CategoryTabs: React.FC<Props> = ({ categories, selected, onSelect, scrollViewRef }) => {
  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.slug}
          onPress={() => onSelect(category.slug)}
          style={[
            styles.card,
            selected === category.slug && styles.selectedTab,
          ]}
        >
          <Text style={[styles.text, selected === category.slug && styles.selectedText]} numberOfLines={2} ellipsizeMode="tail">
            {category.name.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
  },
  card: {
    width: 120,
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 4,
    marginStart: 8,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // tab: {
  //   width: 120,
  //   paddingHorizontal: 16,
  //   paddingVertical: 8,
  //   marginHorizontal: 4,
  //   backgroundColor: '#eee',
  //   borderRadius: 16,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  selectedTab: {
    backgroundColor: '#007bff',
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#333',
    fontWeight: '500',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CategoryTabs;
