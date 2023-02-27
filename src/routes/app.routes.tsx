import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { CreateTask } from '@screens/CreateTask';

import { Home } from '@screens/Home';
import { InfoTask } from '@screens/InfoTask';

type AppRoutesProps = {
	home: undefined;
	createNewTask: undefined;
	taskDetails: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesProps>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesProps>();

export function AppRoutes() {
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name="home" component={Home} />
			<Screen name="createNewTask" component={CreateTask} />
			<Screen name="taskDetails" component={InfoTask} />
		</Navigator>
	);
}
