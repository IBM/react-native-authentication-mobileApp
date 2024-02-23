import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import userService from '../services/user-service';
import {
  Appbar,
  TextInput,
  Button,
  HelperText,
  ActivityIndicator,
  MD2Colors,
  Modal,
  PaperProvider,
  Portal,
} from 'react-native-paper';
import {validate} from '../library/utils/comman';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePasswordScreen() {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setisConfirmPasswordVisible] =
    useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isHelperTextVissible, setHelperVissible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const getEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        setEmail(storedEmail);
      } catch (e) {
        // alert('There is no data for this user');
      }
    };
    getEmail();
  }, [email]);

  // Email validation for specific regex
  const validateEmail = (text: any) => {
    let reg = validate(text);
    if (reg === false) {
      setEmail(text);
      setIsEmailValid(false);
      return false;
    } else {
      setEmail(text);
      setIsEmailValid(true);
      setHelperVissible(false);
    }
  };

  const onUpdate = async () => {
    try{
      setIsLoading(true);
      let data = {
        email,
        oldPassword: password,
        newPassword,
      };
      console.log('responseeee data here is', data);
      const response = await userService.changePassword(data);
      console.log('response....', response)
      if (response.status === 200) {
        setIsLoading(false);
        alert('Password changed succesfully');
        navigation.navigate('ProfileScreen');
      }
    } catch (error) {
      setIsLoading(false);
      alert(error.errMessage);
    };
  };

  return (
    <PaperProvider>
      <Portal>
        <SafeAreaView style={styles.container}>
          <View>
            <Appbar.Header style={styles.appHeader}>
              <Appbar.BackAction onPress={() => navigation.goBack()} />
              <Appbar.Content
                titleStyle={{color: '#ffffff', alignSelf: 'center'}}
                title="Change Password"
              />
            </Appbar.Header>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.formContainer}>
              <TextInput
                label="Email *"
                value={email}
                disabled
                mode="outlined"
                style={styles.textField}
                activeOutlineColor="#5E5BFF"
                onChangeText={text => validateEmail(text)}
                error={!isEmailValid}
              />
              {isHelperTextVissible ? (
                <HelperText
                  type="error"
                  visible={isHelperTextVissible}
                  padding="normal">
                  Email address is required!
                </HelperText>
              ) : null}
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
              <TextInput
                label="New Password *"
                value={newPassword}
                mode="outlined"
                style={styles.textField}
                onChangeText={text => setNewPassword(text)}
                activeOutlineColor="#5E5BFF"
                secureTextEntry={!isNewPasswordVisible}
                right={
                  <TextInput.Icon
                    icon={!isNewPasswordVisible ? 'eye' : 'eye-off'}
                    onPress={() =>
                      setIsNewPasswordVisible(!isNewPasswordVisible)
                    }
                  />
                }
              />
              <TextInput
                label="Confirm Password *"
                value={confirmPassword}
                mode="outlined"
                style={styles.textField}
                error={confirmPassword !== newPassword}
                onChangeText={text => setConfirmPassword(text)}
                activeOutlineColor="#5E5BFF"
                secureTextEntry={!isConfirmPasswordVisible}
                right={
                  <TextInput.Icon
                    icon={!isConfirmPasswordVisible ? 'eye' : 'eye-off'}
                    onPress={() =>
                      setisConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                  />
                }
              />
              {!isEmailValid ||
              email === '' ||
              newPassword === '' ||
              password === '' ||
              confirmPassword === '' ? (
                <Button mode="contained" disabled={true}>
                  Update
                </Button>
              ) : (
                <Button
                  mode="contained"
                  style={styles.signupButton}
                  onPress={() => onUpdate()}>
                  Update
                </Button>
              )}
              <Button mode="contained" style={styles.signupButton} onPress={() => navigation.goBack()}>
                Cancel
              </Button>
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
    paddingTop: 20,
  },
  textField: {
    marginVertical: 8,
  },
  signupButton: {
    backgroundColor: '#5E5BFF',
    marginVertical: 8,
  },
  scrollText: {
    height: 100,
    marginHorizontal: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    margin: 8,
  },
  appHeader: {
    backgroundColor: '#5E5BFF',
  },
});
