import {Dimensions, PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {moderateScale} from 'react-native-size-matters';
import socket from '../utils/socket';
import axiosconfig from '../Providers/axios';
import moment from 'moment';
export const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
export const dummyImage =
  'https://designprosusa.com/the_night/storage/app/1678168286base64_image.png';
export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
import PhotoEditor from 'react-native-photo-editor';
export const Organization = [
  {id: 'Alpha Phi Alpha Fraternity, Inc.', color: 'blue'},
  {id: 'Alpha Kappa Alpha Sorority Inc.', color: 'green'},
  {id: 'Omega Psi Phi Fraternity, Inc.', color: 'red'},
  {id: 'Delta Sigma Theta Sorority Inc.', color: 'yellow'},
  {id: 'Kappa Alpha Psi Fraternity, Inc.', color: 'orange'},
  {id: 'Sigma Gamma Rho Sorority Inc.', color: 'brown'},
  {id: 'Phi Beta Sigma Fraternity, Inc.', color: 'pink'},
  {id: 'Zeta Phi Beta Sorority Inc.', color: 'purple'},
  {id: 'Iota Phi Theta Fraternity, Inc.', color: 'blue'},
];

const dummyToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ODk1ZTI5Ni00NGE0LTQ3NGQtODk3Zi1mZTMxNDI4ZjM5Y2UiLCJqdGkiOiJmNGY1Y2RmMTUwOWQ4Y2EyZDYwZjYzNWJmZjEyOWMzNDUwYWFjMjZjMDgyYjk5YzE2ZjgyZGFmMjVlYzQ5MTk5ZjZiNThlMDE0MTI3ZTM0ZiIsImlhdCI6MTY4NjU1MTgyNi43NDI0NTQsIm5iZiI6MTY4NjU1MTgyNi43NDI0NTcsImV4cCI6MTcxODE3NDIyNi43MjQ1NTYsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.kAdmgrg_7pimuKzi603LVLbCIdBqAz2JpXvsCvgdFcdK3LSRIUcxQBDEWxC2R2X2ChHq5vkSUscroVj3c8047Xlw9knqqcU0FJHCyNgrwnooGIAK9-DaDSNCeQiR3EbR8Nw0lYW6K845U4i8zBlXc1LO8cJ8tFPX0tVh7Vu51uYHSiNhCkQ-hL2fkfaCURiJBp7souV2MqbtVbZdK9OQzXmp171aXdeq_XyQIBI5O8gLHJLCgpklcTI9ZnhCyxwHwFSmznNi5uq7ItJ41Wx6_PIUUrUh2mclfY072uzH2q-b2JwBrcBvQTULjmnLi4gs1-YSpyBvoSS-ae2F_-pkuLL-83RwASr8F6f7f6KY6SdDjqt3C0nfql1ac7hV6bA35wOaII7SjiZnFuzd3-EKsD1k1ATpxp6PoG09gJn-Y95C7eeaia5xe5Um_8K9vf7wm0ODXrwnEJJzsXXRsN6F0VMYHXJoL0QDUMpTGK-VL_g9b-xeNhV5RWFRyWfIzDijEpfhxbtTWiJs9aVL32CDxvWlXKYdcQytkyBH0PxKGwcbgysOpVybzjJyZJip_MVeAQZogQw25iGtT-kCUu1DLYWqegRx1oOI7jXK4cWaIatWQoLghqh8EwDD-JNFgukd9pF6uW28x9qcU5DwVoLSBTPaHLrZ9ePK-nowLzcRfDo';

export const theme = 'dark';

// const requestCameraPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'App needs camera permission',
//         },
//       );
//       // If CAMERA Permission is granted
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   } else return true;
// };

// const requestExternalWritePermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'External Storage Write Permission',
//           message: 'App needs write permission',
//         },
//       );
//       // If WRITE_EXTERNAL_STORAGE Permission is granted
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       alert('Write permission err', err);
//     }
//     return false;
//   } else return true;
// };

// const requestExternalReadPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         {
//           title: 'External Storage Write Permission',
//           message: 'App needs write permission',
//         },
//       );
//       // If WRITE_EXTERNAL_STORAGE Permission is granted
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       alert('Write permission err', err);
//     }
//     return false;
//   } else return true;
// };

// export const captureImage = async (type, refRBSheet, stories, setStories) => {
//   let options = {
//     mediaType: type,
//     maxWidth: Dimensions.get('screen').width,
//     maxHeight: moderateScale(370, 0.1),
//     quality: 1,
//     videoQuality: 'low',
//     durationLimit: 30, //Video max duration in seconds
//     saveToPhotos: true,
//   };
//   let isCameraPermitted = await requestCameraPermission();
//   let isStoragePermitted = await requestExternalWritePermission();
//   let isReadStoragePermitted = await requestExternalReadPermission();

//   if (isCameraPermitted || isStoragePermitted || isReadStoragePermitted) {
//     launchCamera(options, response => {
//       // console.log('Response = ', response);

//       if (response.didCancel) {
//         alert('User cancelled camera picker');
//         return;
//       } else if (response.errorCode == 'camera_unavailable') {
//         alert('Camera not available on device');
//         return;
//       } else if (response.errorCode == 'permission') {
//         alert('Permission not satisfied');
//         return;
//       } else if (response.errorCode == 'others') {
//         alert(response.errorMessage);
//         return;
//       }
//       let source = response;

//       refRBSheet.current.close();
//       console.log('data', stories, setStories);
//       convert(source, stories, setStories);
//     });
//   }
// };

// export const chooseFile = async (type, refRBSheet, stories, setStories) => {
//   var options = {
//     title: 'Select Image',
//     customButtons: [
//       {
//         name: 'customOptionKey',
//         title: 'Choose file from Custom Option',
//       },
//     ],
//     storageOptions: {
//       skipBackup: true,
//       path: 'images',
//     },
//   };
//   launchImageLibrary(options, res => {
//     console.log('Response = ', res);
//     if (res.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (res.error) {
//       console.log('ImagePicker Error: ', res.error);
//     } else if (res.customButton) {
//       console.log('User tapped custom button: ', res.customButton);
//       alert(res.customButton);
//     } else {
//       let source = res;

//       refRBSheet.current.close();
//       console.log('data', stories, setStories);
//       convert(source, stories, setStories);
//     }
//   });
// };

// const _onPress = async (imageToeEdit, stories, setStories) => {
//   setTimeout(() => {
//     try {
//       PhotoEditor.Edit({
//         path:
//           Platform.OS == 'ios'
//             ? imageToeEdit
//             : RNFS.DocumentDirectoryPath + '/photo.jpg',

//         hiddenControls: ['save'],
//         colors: undefined,
//         onDone: res => {
//           convertToBase64(`file://${res}`, stories, setStories);
//           // let temp = stories[0].stories;

//           // temp.push({
//           //   id: stories[0]?.stories?.length + 1,
//           //   url: `file://${res}`,
//           //   type: 'image',
//           //   duration: 30,
//           //   isReadMore: true,
//           //   url_readmore: 'https://github.com/iguilhermeluis',
//           //   created: new Date(),
//           // });
//           // setStories([{...stories[0], stories: temp}]);
//         },
//         onCancel: () => {
//           console.log('on cancel');
//         },
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }, 1000);
// };

// const convert = (source, setStories) => {
//   if (Platform.OS == 'ios') {
//     _onPress(source.assets[0].uri, setStories);
//   } else {
//     let photoPath = RNFS.DocumentDirectoryPath + '/photo.jpg';
//     RNFS.moveFile(source.assets[0].uri, photoPath)
//       .then(() => {
//         _onPress(false, setStories);
//       })
//       .catch(err => {
//         console.log(err.message);
//       });
//   }
// };

// const convertToBase64 = async (image, stories, setStories) => {
//   await RNFS.readFile(image, 'base64')
//     .then(res => {
//       let base64 = `data:image/png;base64,${res}`;
//       createStory(base64, stories, setStories);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// export const createStory = async (base64, stories, setStories) => {
//   if (!base64) {
//     return;
//   }
//   const data = {
//     story_id: stories[0]?.stories?.length + 1,
//     image: base64,
//     swipe_text: 'Custom swipe text for this story',
//     privacy_option: '1',
//   };

//   await axiosconfig
//     .post(`story_store`, data, {
//       headers: {
//         Authorization: `Bearer ${dummyToken}`,
//         Accept: 'application/json',
//       },
//     })
//     .then(res => {
//       getStories(stories, setStories);
//     })
//     .catch(err => {
//       console.log(err);
//       getStories(stories, setStories);
//     });
// };

// const getStories = async (stories, setStories) => {
//   await axiosconfig
//     .get('story_index', {
//       headers: {
//         Authorization: `Bearer ${dummyToken}`,
//         Accept: 'application/json',
//       },
//     })
//     .then(res => {
//       createStoryData(res.data?.user, setStories);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// const createStoryData = (data, setStories) => {
//   let temp = {
//     user_id: data.id,
//     profile: data.image ? data.image : dummyImage,
//     organization: data.organization,
//     username: data.name + ' ' + data.last_name,
//     title: data.name + ' ' + data.last_name,
//     stories: data.stories.map(elem => {
//       return {
//         id: elem.story_id,
//         url: elem.story_image,
//         type: 'image',
//         duration: 10,
//         isReadMore: true,
//         url_readmore: 'https://github.com/iguilhermeluis',
//         created: data.created_at,
//       };
//     }),
//   };
//   setStories([temp]);
// };

export const captureImage = async (type, refRBSheet, setFilePath) => {
  let options = {
    mediaType: type,
    maxWidth: moderateScale(300, 0.1),
    maxHeight: moderateScale(270, 0.1),
    quality: 1,
    videoQuality: 'low',
    durationLimit: 30,
    saveToPhotos: true,
  };
  let isCameraPermitted = await requestCameraPermission();
  let isStoragePermitted = await requestExternalWritePermission();
  if (isCameraPermitted || isStoragePermitted) {
    launchCamera(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      convert(response.assets[0].uri, setFilePath);
      refRBSheet.current.close();
    });
  }
};

const convert = (source, setStories) => {
  let photoPath = RNFS.DocumentDirectoryPath + '/photo.jpg';
  RNFS.moveFile(source, photoPath)
    .then(() => {
      editImage(setStories);
    })
    .catch(err => {
      console.log(err);
    });
};

const editImage = async setStories => {
  setTimeout(() => {
    try {
      PhotoEditor.Edit({
        path: RNFS.DocumentDirectoryPath + '/photo.jpg',
        hiddenControls: ['save'],
        colors: undefined,
        onDone: res => {
          convertToBase64(`file://${res}`, setStories);
        },
        onCancel: () => {},
      });
    } catch (err) {
      console.log(err);
    }
  }, 100);
};

const convertToBase64 = async (image, setStories) => {
  await RNFS.readFile(image, 'base64')
    .then(res => {
      let base64 = `data:image/png;base64,${res}`;
      createStory(base64, setStories);
    })
    .catch(err => {
      console.log(err);
    });
};

const createStory = async (base64, setStories) => {
  if (!base64) {
    return;
  }
  const data = {
    story_id: Math.random() * 100,
    image: base64,
    swipe_text: 'Custom swipe text for this story',
    privacy_option: '1',
  };
  await axiosconfig
    .post(`story_store`, data, {
      headers: {
        Authorization: `Bearer ${dummyToken}`,
        Accept: 'application/json',
      },
    })
    .then(res => {
      getStories(setStories);
    })
    .catch(err => {
      console.log(err);
    });
};

const getStories = async setStories => {
  await axiosconfig
    .get('story_index', {
      headers: {
        Authorization: `Bearer ${dummyToken}`,
        Accept: 'application/json',
      },
    })
    .then(res => {
      createStoryData(res.data?.user, setStories);
    })
    .catch(err => {
      console.log(err);
    });
};

const createStoryData = (data, setStories) => {
  let temp = {
    user_id: data.id,
    profile: data.image ? data.image : dummyImage,
    organization: data.organization,
    username: data.name + ' ' + data.last_name,
    title: data.name + ' ' + data.last_name,
    stories: data.stories.map(elem => {
      return {
        id: elem.story_id,
        url: elem.story_image,
        type: 'image',
        duration: 10,
        isReadMore: true,
        url_readmore: 'https://github.com/iguilhermeluis',
        created: data.created_at,
      };
    }),
  };
  setStories([temp]);
};

export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};

export const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  } else return true;
};
export const chooseFile = async (type, refRBSheet, setFilePath) => {
  var options = {
    title: 'Select Image',
    customButtons: [
      {
        name: 'customOptionKey',
        title: 'Choose file from Custom Option',
      },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  launchImageLibrary(options, res => {
    if (res.didCancel) {
    } else if (res.error) {
    } else if (res.customButton) {
      alert(res.customButton);
    } else {
      let source = res;
      convert(source.assets[0].uri, setFilePath);
      refRBSheet.current.close();
    }
  });
};
export const getColor = id => {
  let color;
  Organization?.forEach(elem => {
    if (elem.id == id) {
      color = elem.color;
    }
  });
  return color;
};
// socket functionality
export const socketLike = (postId, postUserId, myId) => {
  socket.emit('like', {
    postId: postId,
    postUserId: postUserId,
    myId: myId,
  });
};
export const socketRequest = (from, to, type) => {
  socket.emit('request', {
    from: from,
    to: to,
    type: type,
  });
};
export const socketComment = (postId, postUserId, myId) => {
  socket.emit('comment', {
    postId: postId,
    postUserId: postUserId,
    myId: myId,
  });
};
export const socketMessage = (from, to, message, time, socketUniqueId) => {
  socket.emit('message', {
    from: from,
    to: to,
    message: message,
    time: time,
    socketUniqueId: socketUniqueId,
  });
};
export const storeMsg = async (msg, token) => {
  await axiosconfig
    .post('message_store', msg, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      console.log('message send', res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
export function formatTimestamp(timestamp) {
  const now = moment();
  const date = moment(timestamp);
  if (now.isSame(date, 'day')) {
    return date.format('h:mm A');
  } else {
    return date.format('DD/mm/yyyy');
  }
}
export const Poppins = '';
export const PoppinsBold = '';
export const generateRandomId = () => {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
};
