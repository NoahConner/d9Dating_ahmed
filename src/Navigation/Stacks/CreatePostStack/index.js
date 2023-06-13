import {createStackNavigator} from '@react-navigation/stack';
import CreatePost from '../../../screens/App/CreatePost';
import Map from '../../../screens/Auth/Register/MapTest';

const Stack = createStackNavigator();

const CreatePostStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default CreatePostStack;
