/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import RNFS from 'react-native-fs';

import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeModules} from 'react-native';
import Video from 'react-native-video';

const {LivePhotoModule} = NativeModules;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [photos, setPhotos] = React.useState<PhotoIdentifier[]>([]);
  const [videoUrl, setVideo] = React.useState<string>('');

  React.useEffect(() => {
    LivePhotoModule.getLivePhotoMov('22688AE4-B872-4705-9DB6-FAC8CB7CA68B')
      .then((r: any) => {
        console.log('🚀 / .then / r:', r);
        setVideo(r);
      })
      .catch((e: any) => {
        console.log('🚀 / App / e:', e);
      });
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All',
    }).then(r => {
      setPhotos(r.edges);
    });
  }, []);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <Text>Hello World</Text>
          {photos.map((photo, index) => (
            <View key={index}>
              <Text>{photo.node.image.uri}</Text>
              <Text>{photo.node.image.extension}</Text>
              <Text>{photo.node.type}</Text>

              <Image
                source={{uri: photo.node.image.uri, width: 100, height: 100}}
              />
            </View>
          ))}

          <Image
            source={{
              uri: 'ph://22688AE4-B872-4705-9DB6-FAC8CB7CA68B/L0/001',
              width: 300,
              height: 300,
            }}
          />
          {videoUrl && (
            <Video
              source={{
                uri: videoUrl,
              }}
              style={{width: 300, height: 300}}
              repeat
              resizeMode="contain"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
