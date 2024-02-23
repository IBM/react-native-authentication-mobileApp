import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Appbar,
  Text,
  PaperProvider,
  Portal,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function MyProfileScreen() {
  const navigation: any = useNavigation();

  return (
    <PaperProvider>
      <Portal>
        <SafeAreaView style={styles.container}>
          {/* <View> */}
          <View>
            <Appbar.Header style={styles.appHeader}>
              <Appbar.BackAction onPress={() => navigation.goBack()} />
              <Appbar.Content
                titleStyle={{color: '#ffffff', alignSelf: 'center'}}
                title="Profile"
              />
            </Appbar.Header>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.dividerContainer}>
              <Text
                variant="titleMedium"
                style={styles.forgotPwdText}
                onPress={() =>
                  navigation.navigate('ChangePasswordScreen')
                }>
                Change Password
              </Text>
              <Text
                variant="titleMedium"
                style={styles.forgotPwdText}
                onPress={() => navigation.navigate('Welcome')}>
                Logout
              </Text>
            </View>
          </View>
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
    padding: 20,
  },
  dividerContainer: {
    marginVertical: 10,
  },
  innerContainerText: {
    padding: 20,
  },
  appHeader: {
    backgroundColor: '#5E5BFF',
  },
  textContainer: {
    padding: 12,
    alignItems: 'center',
    flexDirection: 'column',
  },
  forgotPwdText: {
    color: '#5E5BFF',
    marginLeft: 20,
    marginVertical: 10,
  },
  profileIcon: {
    alignSelf: 'flex-end',
  },
  listItemSection: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  listItemContainer: {
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
  },
  avatarIcon: {
    backgroundColor: '#5E5BFF',
  },
});
