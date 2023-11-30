import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Principal from "../pages/Principal";
import Logar from "../pages/Logar";
import CadastrarLogin from "../pages/CadastrarLogin";
import Feed from "../pages/Feed";
import MyAcount from "../pages/Account";

import CadastrarFeedback from "../pages/CadastrarFeedback";
import AlterarFeedback from "../pages/AlterarFeedback";
import Excluir  from "../pages/Excluir";




const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator  initialRouteName="Principal">
            <Stack.Screen name="Principal" component={Principal} options={{ headerShown: false }} />
            <Stack.Screen name="Logar" component={Logar} options={{ headerShown: false }} />
            <Stack.Screen name="CadastrarLogin" component={CadastrarLogin} options={{ headerShown: false }} />
            <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
            <Stack.Screen name="MyAcount" component={MyAcount} options={{ headerShown: false }} />          
            <Stack.Screen name="CadastrarFeedback" component={CadastrarFeedback} options={{ headerShown: false }} />
            <Stack.Screen name="Excluir" component={Excluir} options={{ headerShown: false }} />
            <Stack.Screen name="AlterarFeedback" component={AlterarFeedback} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}