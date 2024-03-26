import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../../../colors';
import {Photo} from '../../../types/photo';

type Props = {
  detailView: boolean;
  setDetailView: (value: boolean) => void;
  photos: Photo[];
  setCurrentDetailPhotoIndex: (value: number) => void;
  currentDetailPhotoIndex: number;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export const ViewDetailModal = ({
  detailView,
  setDetailView,
  photos,
  setCurrentDetailPhotoIndex,
  currentDetailPhotoIndex,
}: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={detailView}
      onRequestClose={() => {
        setDetailView(false);
      }}>
      <View className="h-full w-full pt-[55px] bg-main_bg">
        <View className="flex flex-row justify-between items-center mx-3">
          <TouchableOpacity
            className="rounded-full bg-light_gray/50 p-2"
            onPress={() => {
              setDetailView(false);
            }}>
            <Icon name="close" color={colors.dark_gray} size={20} />
          </TouchableOpacity>
        </View>
        <Swiper
          loop={false}
          horizontal
          showsPagination={false}
          onIndexChanged={index => {
            setCurrentDetailPhotoIndex(index);
          }}
          index={currentDetailPhotoIndex}>
          {photos.map((photo, index) => (
            <View key={index} className="p-1">
              <Image
                source={{uri: `http://localhost:1323/${photo.thumbnail_url}`}}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          ))}
        </Swiper>
      </View>
    </Modal>
  );
};