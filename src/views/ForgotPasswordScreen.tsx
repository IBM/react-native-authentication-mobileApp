import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
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
  Text,
} from 'react-native-paper';

import {validate} from '../library/utils/comman';

export default function ForgotPasswordScreen() {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setisConfirmPasswordVisible] =
    useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isHelperTextVissible, setHelperVissible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answer1, setAnswer1] = useState([]);
  const [answer2, setAnswer2] = useState([]);

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

  const getSecQuestions = async () => {
    try {
      const response = await userService.getQuestions(email);
      setQuestions(response.data.data);
      setIsEmailVerified(true);
    } catch (error) {
      alert(error.errMessage);
    }
  };

  const onUpdate = async () => {
    try {
      setIsLoading(true);
    let questionsArr = [
      {
        ...questions[0],
        answer: answer1,
      },
      {
        ...questions[1],
        answer: answer2,
      },
    ];

    let data = {
      email,
      password,
      questionsArr,
    };
    const response = await userService.updatePassword(data);
    if (response.status === 200) {
      setIsLoading(false);
      navigation.navigate('Login');
      alert('Password updated succesfully')
    } else {
      setIsLoading(true);
      alert('Error in updating password')
    }
    } catch (error) {
      setIsLoading(false);
      alert(error.errMessage)
    }
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
                title="Forgot Password"
              />
            </Appbar.Header>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.formContainer}>
              <TextInput
                label="Email *"
                value={email}
                mode="outlined"
                style={styles.textField}
                activeOutlineColor="#5E5BFF"
                onChangeText={text => validateEmail(text)}
                error={!isEmailValid}
                right={
                  <TextInput.Icon
                    icon={
                      isEmailVerified
                        ? 'account-check-outline'
                        : 'account-cancel-outline'
                    }
                    onPress={() => setIsEmailVerified(!isEmailVerified)}
                  />
                }
              />
              {isHelperTextVissible ? (
                <HelperText
                  type="error"
                  visible={isHelperTextVissible}
                  padding="normal">
                  Email address is required!
                </HelperText>
              ) : null}
              {!isEmailVerified ? (
                <Button
                  mode="contained"
                  style={styles.signupButton}
                  onPress={() => getSecQuestions()}>
                  Verify Email
                </Button>
              ) : null}
              <TextInput
                label="New Password *"
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
                label="Confirm Password *"
                value={confirmPassword}
                mode="outlined"
                style={styles.textField}
                error={confirmPassword !== password}
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
              {questions.length > 0 && (
                <>
                  <Text variant="titleMedium" style={styles.label}>
                    {questions[0].question}
                  </Text>
                  <TextInput
                    label="Answer"
                    mode="outlined"
                    style={styles.textField}
                    error={answer1.length === 0}
                    onChangeText={text => setAnswer1(text)}
                    activeOutlineColor="#5E5BFF"
                    secureTextEntry={!answer1}
                  />
                  <Text variant="titleMedium" style={styles.label}>
                    {questions[1].question}
                  </Text>
                  <TextInput
                    label="Answer"
                    mode="outlined"
                    style={styles.textField}
                    error={answer2.length === 0}
                    onChangeText={text => setAnswer2(text)}
                    activeOutlineColor="#5E5BFF"
                    secureTextEntry={!answer2}
                  />
                </>
              )}
              {!isEmailValid ||
              email === '' ||
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
