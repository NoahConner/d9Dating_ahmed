import {createStackNavigator} from '@react-navigation/stack';
import Notifications from '../../../screens/App/Notifications';
import ViewUser from '../../../screens/App/Home/ViewUser/index';
const Stack = createStackNavigator();

const Notification = () => {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Notification" component={Notifications} />
      <Stack.Screen name="ViewUser" component={ViewUser} />
    </Stack.Navigator>
  );
};

export default Notification;
