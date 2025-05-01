import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchProducts, fetchCategories } from "../api";
import { Product } from '../types/product';
import FastImage from 'react-native-fast-image';
import { addToCart } from '../store-not-used/cartSlice';
