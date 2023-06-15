import {createStackNavigator} from '@react-navigation/stack';
import ForgetPassword from '../../../screens/Auth/ForgetPass';
import Login from '../../../screens/Auth/Login';
import Register from '../../../screens/Auth/Register';
import StartScreen from '../../../screens/Auth/Start';
import ChangePass from '../..//../screens/Auth/ChangePass';
import Map from '../../../screens/Auth/Register/Map';
import {AppContext, useAppContext} from '../../../Context/AppContext';
import Terms from '../../../screens/Auth/TermsAndPrivacy/Terms';
import Privacy from '../../../screens/Auth/TermsAndPrivacy/Privacy';

const Stack = createStackNavigator();

const AuthStack = () => {
  const {token} = useAppContext(AppContext);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {token === null ? (
        <Stack.Screen name="StartScreen" component={StartScreen} />
      ) : null}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="PrivacyPolicy" component={Privacy} />
    </Stack.Navigator>
  );
};

export default AuthStack;
