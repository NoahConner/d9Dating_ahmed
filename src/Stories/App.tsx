import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StoryType } from "./index";
const { CubeNavigationHorizontal } = require("react-native-3dcube-navigation");
import styles from "./styles";
import StoryContainer from "./StoryContainer";
import {AppContext, useAppContext} from '../Context/AppContext';
import Loader from '../Components/Loader';
const Stories = (props) => {
  const theme =props.theme;
  const color = theme === 'dark' ? '#fff' : '#222222';

  const [isModelOpen, setModel] = useState(false);
  
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const [storyColor, setStoryColor] = useState('green');
  const {storyLoader, setStoryLoader} = useAppContext(AppContext);
  const [seenStories, setSeenStories] =useState([]);
  const modalScroll = useRef(null);

  useEffect(() => {
    // if (storyLoader) {
    //   setTimeout(() => {
    //     setStoryLoader(false);
    //   }, 1500);
    // }
  }, [storyLoader, setStoryLoader]);

  const onStorySelect = (index) => {
    setCurrentUserIndex(index);
    setModel(true);
  };

  const onStoryClose = () => {
    setModel(false);
  };

  const onStoryNext = (isScroll: boolean) => {
    const newIndex = currentUserIndex + 1;
    if (props.data.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      setSeenStories((prev)=> [...prev,newIndex])
      if (!isScroll) {
        //erro aqui
        try {
          modalScroll?.current?.scrollTo(newIndex, true);
        } catch (e) {
          console.warn("error=>", e);
        }
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = (isScroll: boolean) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll?.current?.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      console.log("next");
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious(false);
      console.log("previous");
      setCurrentScrollValue(scrollValue);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        horizontal
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => (
          <View style={styles.boxStory}>
            <TouchableOpacity onPress={() => {
              
                 setCurrentUserIndex(index);
                 setSeenStories((prev)=> [...prev,index])
                 onStorySelect(index);
              if(props.setColorFun){
                 props.setColorFun('grey')
              }
              setStoryColor('grey')
             console.log('index',item, index, currentUserIndex)}
           }
              >
              <View style={[styles.superCircle, props.containerAvatarStyle,  {borderColor: props.color ? props.color : seenStories.includes(index)? storyColor:'green'},]}>
                <Image
                  style={[styles.circle, props.avatarStyle]}
                  source={{ uri: item.profile }}
                />
              </View>

              <Text style={[styles.title, props.titleStyle, {color:color}]}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll?.current?.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
        <CubeNavigationHorizontal
          callBackAfterSwipe={(g) => onScrollChange(g)}
          ref={modalScroll}
          style={styles.container}
        >
          {props.data.map((item, index) => (
            <StoryContainer
              key={item.title}
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              dataStories={item}
              isNewStory={index !== currentUserIndex}
              textReadMore={props.textReadMore}
              deleteFunc={props.deleteFunc}
              navigation={props.navigation}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
    </View>
  );
};


export default Stories;