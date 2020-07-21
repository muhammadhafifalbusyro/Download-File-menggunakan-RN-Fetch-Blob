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
      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: `namas.pdf`,
          path: `${dirs.DownloadDir}/namas.pdf`,
        },
      })
        .fetch('GET', 'http://www.africau.edu/images/default/sample.pdf', {})
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
