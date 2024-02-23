import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  MD2Colors,
  PaperProvider,
  Portal,
  Modal,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenticationService from '../services/Authentication-service';

export default function LoginScreen() {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onLogin = async () => {
    setIsLoading(true);
    try {
      let data = {email, password};
      const response = await AuthenticationService.login(data);
      setIsLoading(false);
      storeToken(response.data);
      navigation.navigate('Home');
    } catch (error) {
      alert(error.errMessage);
      setIsLoading(false);
    }
  };
  const storeToken = async (data: any) => {
    try {
      await AsyncStorage.setItem('loggedInUser', data._id);
      await AsyncStorage.setItem('role', data.role);
      await AsyncStorage.setItem('email', data.email);
    } catch (e) {
      throw e;
    }
  };
  return (
    <PaperProvider>
      <Portal>
        <SafeAreaView style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.backbuttonView}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <ArrowLeftIcon size="20" color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
              <Text variant="headlineMedium" style={styles.normalText}>
                Signin with your existing account
              </Text>
              <View style={{marginTop: 20}}>
                <TextInput
                  label="Email"
                  value={email}
                  mode="outlined"
                  style={styles.textField}
                  onChangeText={text => setEmail(text)}
                />
                <TextInput
                  label="Password *"
                  value={password}
                  mode="outlined"
                  style={styles.textField}
                  onChangeText={text => setPassword(text)}
                  activeOutlineColor="#5E5BFF"
                  secureTextEntry={!isPasswordVisible}
                  right={
                    <TextInput.Icon
                      icon={!isPasswordVisible ? 'eye' : 'eye-off'}
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  }
                />
              </View>
              <View style={styles.forgotText}>
                <Text
                  variant="titleMedium"
                  style={styles.linkText}
                  onPress={() =>
                    navigation.navigate('ForgotPasswordScreen')
                  }>
                  Forgot Password?
                </Text>
              </View>

              <Button
                mode="contained"
                onPress={() => onLogin()}
                style={styles.signupButton}>
                Login
              </Button>
              <View style={styles.newAccountLink}>
                <Text variant="titleMedium"> New to Platform? </Text>
                <Text
                  variant="titleMedium"
                  style={styles.linkText}
                  onPress={() => navigation.navigate('SignUp')}>
                  {' '}
                  Create an account{' '}
                </Text>
              </View>
            </View>
          </View>
          <Modal visible={isLoading}>
            <ActivityIndicator
              animating={isLoading}
              color={MD2Colors.grey800}
              size="large"
            />
          </Modal>
        </SafeAreaView>
      </Portal>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
  },
  backbuttonView: {
    padding: 12,
    justifyContent: 'flex-start',
  },
  backButton: {
    marginLeft: 16,
  },
  formContainer: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 32,
  },
  linkText: {
    color: '#5E5BFF',
  },
  forgotText: {
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  newAccountLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  normalText: {
    marginBottom: 20,
  },
  textField: {
    marginVertical: 4,
  },
  signupButton: {
    backgroundColor: '#5E5BFF',
    marginVertical: 8,
  },
});
