import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Input} from 'native-base';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Inicon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
const ChatFooter = ({message, setMessage, handleNewMessage}) => {
  const handleTextChange = (text) => {
    setMessage(text);
  };

  const handleSendPress = () => {
    handleNewMessage();
  };

  return (
    <View style={s.messageInput}>
      <View style={s.input}>
        <View style={s.circle}>
          <Icon2 name="email" color="#8F8A8A" solid size={moderateScale(20, 0.1)} />
        </View>
        <View style={s.inputText}>
          <Input
            w="100%"
            variant="unstyled"
            placeholderTextColor="#fff"
            color="#fff"
            placeholder="Type Message"
            value={message}
            multiline
            flexWrap="wrap"
            maxHeight={60}
            onChangeText={handleTextChange}
          />
        </View>
      </View>
      <TouchableOpacity disabled={message == ''} onPress={handleSendPress} style={s.sendBtn}>
        <Inicon name="md-send" color="#8F8A8A" size={moderateScale(20, 0.1)} />
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  messageInput: {
    paddingLeft: moderateScale(10, 0.1),
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    flex: 0.9,
    borderRadius: moderateScale(15, 0.1),
    backgroundColor: '#595757',
    padding: moderateScale(5, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(15, 0.1),
  },
  circle: {
    width: moderateScale(37, 0.1),
    height: moderateScale(37, 0.1),
    borderRadius: moderateScale(37 / 2, 0.1),
    borderColor: '#8F8A8A',
    borderWidth: moderateScale(1, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    flex: 0.9,
  },
});
export default ChatFooter