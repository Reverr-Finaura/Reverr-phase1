import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IndividuaProfile } from '../../scenes';
const Tab = createBottomTabNavigator();

const indivisualTabs=()=>{
  return (
     <Tab.Navigator>
       <Tab.Screen name="ProfileIndivisual" component={IndividuaProfile} />
       {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
     </Tab.Navigator>
  );
}

export {indivisualTabs};

