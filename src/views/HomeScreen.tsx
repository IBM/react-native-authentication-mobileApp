import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Divider, Text, DataTable} from 'react-native-paper';
import userService from '../services/user-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const navigation: any = useNavigation();
  const [userDetail, setUserDetail] = useState({
    _id: '',
    firstName: '',
    lastName: '',
  });
  const [users, setUsers] = useState([]);

  const onAccount = () => {
    navigation.navigate('ProfileScreen');
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const id = await AsyncStorage.getItem('loggedInUser');
        const response = await userService.getUser(id);
        setUserDetail(response.data);
      } catch (e) {
        // alert('There is no data for this user');
      }
    };
    const getUsers = async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        const email = await AsyncStorage.getItem('email');
        const response = await userService.getAllUser(role, email);
        setUsers(response.data);
      } catch (e) {
        // alert('There is no data for this user');
      }
    };
    getUserDetails();
    getUsers();
  }, [userDetail._id]);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Appbar.Header style={styles.appHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content
            titleStyle={{color: '#ffffff', alignSelf: 'center'}}
            title="Service"
          />
          <Appbar.Action
            icon="account"
            onPress={() => onAccount()}
            color="#ffffff"
          />
        </Appbar.Header>
      </View>
      <View style={styles.innerContainer}>
        <View>
          <Text variant="headlineMedium">
            Welcome {userDetail.firstName} {userDetail.lastName}!
          </Text>
        </View>

      </View>
      <View style={styles.innerContainer}>
        <Divider />
        <View>
          <Text variant="titleMedium">
            This is your dashboard page. You can see the progress you've made with your work and manage your projects or assigned tasks.
          </Text>
        </View>
      </View>
      <View style={styles.innerContainer}>
        <Text variant="headlineMedium">
          Users Details
        </Text>
        <Divider />
        <DataTable>
        <DataTable.Header>
          <DataTable.Title>Id</DataTable.Title>
          <DataTable.Title numeric>FirstName</DataTable.Title>
          <DataTable.Title numeric>LastName</DataTable.Title>
          <DataTable.Title numeric>Email</DataTable.Title>
        </DataTable.Header>

        {users && users.map((item) => (
          <DataTable.Row key={item._id}>
            <DataTable.Cell>{item._id}</DataTable.Cell>
            <DataTable.Cell>{item.firstName}</DataTable.Cell>
            <DataTable.Cell >{item.lastName}</DataTable.Cell>
            <DataTable.Cell >{item.email}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flexDirection: 'column',
    padding: 20,
  },
  appHeader: {
    backgroundColor: '#5E5BFF',
  },
  quoteIcon: {
    marginVertical: 8,
  },
});
