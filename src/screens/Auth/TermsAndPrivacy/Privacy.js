import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useEffect } from 'react';
import { AppContext, useAppContext } from '../../../Context/AppContext';
import { height, width } from '../../../Constants/Index';
import { useSelector } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import Inicon from 'react-native-vector-icons/Ionicons';

const Privacy = ({ navigation }) => {
  const theme = useSelector(state => state.reducer.theme);
  const Textcolor = theme === 'dark' ? '#fff' : '#222222';

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: theme === 'dark' ? '#222222' : '#fff',
        flex:1
      }}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Inicon
            name="arrow-back-circle-outline"
            size={moderateScale(30)}
            color={Textcolor}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Privacy Policy</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam esse unde nobis eaque minima culpa illo laudantium magni a vero molestiae assumenda, dignissimos earum perferendis nulla ab, vitae tempore. Commodi fugit harum consequuntur quos est. Fugiat, eius aut minima corporis quos nostrum labore repellat suscipit odit? Mollitia consequatur dicta adipisci quas, voluptates voluptatum impedit harum vel aperiam vitae libero, neque cupiditate ipsa odio quidem sapiente! Minus possimus temporibus accusantium tempora hic commodi, fugiat et id amet ipsa, iusto eveniet aliquid magni nulla! Tempore modi sed eos nobis numquam deserunt perspiciatis reiciendis mollitia eaque iste. Accusamus modi harum perspiciatis optio quia. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam esse unde nobis eaque minima culpa illo laudantium magni a vero molestiae assumenda, dignissimos earum perferendis nulla ab, vitae tempore. Commodi fugit harum consequuntur quos est. Fugiat, eius aut minima corporis quos nostrum labore repellat suscipit odit? Mollitia consequatur dicta adipisci quas, voluptates voluptatum impedit harum vel aperiam vitae libero, neque cupiditate ipsa odio quidem sapiente! Minus possimus temporibus accusantium tempora hic commodi, fugiat et id amet ipsa, iusto eveniet aliquid magni nulla! Tempore modi sed eos nobis numquam deserunt perspiciatis reiciendis mollitia eaque iste. Accusamus modi harum perspiciatis optio quia. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam esse unde nobis eaque minima culpa illo laudantium magni a vero molestiae assumenda, dignissimos earum perferendis nulla ab, vitae tempore. Commodi fugit harum consequuntur quos est. Fugiat, eius aut minima corporis quos nostrum labore repellat suscipit odit? Mollitia consequatur dicta adipisci quas, voluptates voluptatum impedit harum vel aperiam vitae libero, neque cupiditate ipsa odio quidem sapiente! Minus possimus temporibus accusantium tempora hic commodi, fugiat et id amet ipsa, iusto eveniet aliquid magni nulla! Tempore modi sed eos nobis numquam deserunt perspiciatis reiciendis mollitia eaque iste. Accusamus modi harum perspiciatis optio quia.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(25),
    paddingHorizontal: moderateScale(10),
  },
  goBackButton: {
    borderRadius: moderateScale(50),
    position: 'absolute',
    left: moderateScale(10),
  },
  headerText: {
    fontSize: 25,
    textAlign: 'center'
  },
  contentContainer: {
    flex: 1,
    width: width,
    padding: moderateScale(20),
  },
  contentText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Privacy;
