import React from 'react';
import {View, Text, Button, PermissionsAndroid, Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export default class App extends React.Component {
  async downloadFile() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const {dirs} = RNFetchBlob.fs;
      // https://drive.google.com/file/d/1dVlvNImeZMvKAyyijv_9JPhLvqasQbMa/view?usp=sharing
      //http://www.africau.edu/images/default/sample.pdf
      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: `fileza.jpg`,
          path: `${dirs.DownloadDir}/fileza.jpg`,
        },
      })
        .fetch(
          'GET',
          'https://drive.google.com/uc?export=view&id=1dVlvNImeZMvKAyyijv_9JPhLvqasQbMa',
          {},
        )
        .then((res) => {
          console.log('The file saved to ', res.path());
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      Alert.alert(
        'Permission Denied!',
        'You need to give storage permission to download the file',
      );
    }
  }
  render() {
    return (
      <View>
        <Button title="DOwnload" onPress={this.downloadFile} />
      </View>
    );
  }
}
