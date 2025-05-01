import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';

interface Props {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress: () => void;
}

const ProductCard: React.FC<Props> = ({
  title,
  description,
  price,
  thumbnail,
  isFavorite,
  onToggleFavorite,
  onPress,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 4 }}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: thumbnail }} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onToggleFavorite}>
              <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={20} color="#ff4d4d" />
            </TouchableOpacity>
          </View>
          <Text style={styles.desc} numberOfLines={2}>{description}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  desc: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 8,
  },
});

export default ProductCard;
