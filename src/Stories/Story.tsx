import React, {useState, useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import PropTypes from 'prop-types';
import {StoryType} from '.';
import { moderateScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import { setStoryID } from '../Redux/actions';
import { width } from '../Constants/Index';

type Props = {
  story: StoryType;
  onVideoLoaded?: (Object) => void;
  onImageLoaded?: () => void;
  pause: boolean;
  isLoaded?: boolean;
  isNewStory?: boolean;
};
const Story = (props: any) => {
  const {story} = props;
  const dispatch = useDispatch();
  const {url, type, id} = story || {};
  const [isPortation, setIsPortation] = useState(false);
  const [heightScaled, setHeightScaled] = useState(moderateScale(231,0.1));
  const storyID:any = useSelector((state:any)=> state.reducer.storyID)

  useEffect(()=> {
    dispatch(setStoryID(id))
  },[])

  return (
    <View style={styles.container}>
      {type === 'image' ? (
        <Image
          source={{uri: url}}
          onLoadEnd={props.onImageLoaded}
          style={styles.content}
          resizeMode="contain"
        />
      ) : (
        <Video
          source={{uri: url}}
          paused={props.pause || props.isNewStory}
          onLoad={item => {
            const {Width, height}:any = item.naturalSize;
            const heightScaled = height * (width / Width);
            let isPortrait = height > Width;
            setIsPortation(height > Width);
            setHeightScaled(heightScaled);
            props.onVideoLoaded(item);

            console.warn(Width, height, heightScaled);
            console.warn('É PAISAGEM?', isPortrait);
          }}
          style={
            isPortation
              ? [styles.contentVideoPortation, {height: heightScaled}]
              : [styles.contentVideo, {height: heightScaled}]
          }
          resizeMode={'stretch'}
        />
      )}
    </View>
  );
};

Story.propTypes = {
  story: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {width: '100%', height: '100%', flex: 1},
  contentVideo: {
    width: width + 20,
    backgroundColor: '#000',
    height: 231,
  },
  contentVideoPortation: {
    width: width + 20,
    backgroundColor: '#000',
    height: 231,
  },
  imageContent: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Story;
