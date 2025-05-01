import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Category } from '../types/category';

interface Props {
  categories: Category[];
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryTabs: React.FC<Props> = ({ categories, selected, onSelect }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map((category) => (
            <TouchableOpacity
              key={category.slug}
              onPress={() => onSelect(category.slug)}
              style={[
                styles.tab,
                selected === category.slug && styles.selectedTab,
              ]}
            >
            <Text style={[styles.text, selected === category.slug && styles.selectedText]}>
                    {category.name.toUpperCase()}
            </Text>
            </TouchableOpacity>
          ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    marginHorizontal: 8,
    backgroundColor: '#f8f8f8',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: '#eee',
    borderRadius: 16,
  },
  selectedTab: {
    backgroundColor: '#007bff',
  },
  text: {
    color: '#333',
    fontWeight: '500',
  },
  selectedText: {
    color: '#fff',
  },
});

export default CategoryTabs;
