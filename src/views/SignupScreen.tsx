import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import React, {useState} from 'react';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import userService from '../services/user-service';

import {
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

export default function SignUpScreen() {
  const navigation: any = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setisConfirmPasswordVisible] =
    useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isHelperTextVissible, setHelperVissible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstQuestion, setFirstQuestion] = useState({});
  const [secondQuestion, setSecondQuestion] = useState({});
  const questions = [
    {
      question: "What is your mother's maiden name?",
      id: '1',
    },
    {
      question: 'What is the name of your first pet?',
      id: '2',
    },
    {
      question: 'What elementary school did you attend?',
      id: '3',
    },
    {
      question: 'What is the name of the town where you were born?',
      id: '4',
    },
    {
      question: 'What was your first car?',
      id: '5',
    },
  ];
  const [firstQuestionSet, setFirstSet] = useState(questions);
  const [secondQuestionSet, setSecondSet] = useState(questions);

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

  const onSignup = async () => {
    setIsLoading(true);
    if (!email.trim()) {
      return;
    }
    const data = {
      firstName,
      lastName,
      email,
      password,
      questionsArr: [firstQuestion, secondQuestion],
      role: 'user',
    };
    try {
      console.log('data here is', data);
      const response = await userService.register(data);
      if (response.status === 200) {
        setIsLoading(false);
        alert('Registration Successful.');
        navigation.navigate('Login');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstQuestion({});
        setSecondQuestion({});
      } else {
        setIsLoading(false);
        throw Error;
      }
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
      alert('User ' + email + ' already exits');
      navigation.navigate('Login');
      setFirstName('');
      setEmail('');
      setPassword('');
      setLastName('');
      setConfirmPassword('');
      setIsLoading(false);
      setFirstQuestion({});
      setSecondQuestion({});
    }
  };

  const onFirstSelect = item => {
    let selectedQuestions = questions.filter(que => que.id != item.id);
    setFirstQuestion(item);
    setSecondSet(selectedQuestions);
  };

  const onSecondSelect = item => {
    let selectedQuestions = questions.filter(que => que.id != item.id);
    setSecondQuestion(item);
    setFirstSet(selectedQuestions);
  };

  return (
    <PaperProvider>
      <Portal>
        <ScrollView style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.backbuttonView}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Welcome')}
                style={styles.backButton}>
                <ArrowLeftIcon size="20" color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
              <TextInput
                label="Email *"
                value={email}
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
                label="First Name"
                value={firstName}
                mode="outlined"
                style={styles.textField}
                activeOutlineColor="#5E5BFF"
                onChangeText={text => setFirstName(text)}
              />
              <TextInput
                label="Last Name"
                value={lastName}
                mode="outlined"
                style={styles.textField}
                activeOutlineColor="#5E5BFF"
                onChangeText={text => setLastName(text)}
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
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={firstQuestionSet}
                maxHeight={300}
                labelField="question"
                valueField="id"
                placeholder="Select Security Question1"
                value={firstQuestion}
                onChange={item => {
                  console.log('item here is', item);
                  onFirstSelect(item);
                }}
              />
              <TextInput
                label="Your answer"
                value={firstQuestion.answer}
                mode="outlined"
                style={styles.textField}
                activeOutlineColor="#5E5BFF"
                onChangeText={text =>
                  setFirstQuestion({...firstQuestion, answer: text})
                }
              />
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={secondQuestionSet}
                maxHeight={300}
                labelField="question"
                valueField="id"
                placeholder="Select Security Question2"
                value={secondQuestion}
                onChange={item => {
                  console.log('item here is', item);
                  onSecondSelect(item);
                }}
              />
              <TextInput
                label="Your answer"
                value={secondQuestion.answer}
                mode="outlined"
                style={styles.textField}
                activeOutlineColor="#5E5BFF"
                onChangeText={text =>
                  setSecondQuestion({...secondQuestion, answer: text})
                }
              />
              {email === '' || password === '' || confirmPassword === '' ? (
                <Button mode="contained" disabled={true}>
                  Create Account
                </Button>
              ) : (
                <Button
                  mode="contained"
                  style={styles.signupButton}
                  onPress={() => onSignup()}>
                  Create Account
                </Button>
              )}
              <Button
                mode="contained"
                style={styles.signupButton}
                onPress={() => navigation.goBack()}>
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
        </ScrollView>
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
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
