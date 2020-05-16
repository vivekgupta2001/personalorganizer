import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, Button } from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import { useSelector, useDispatch } from 'react-redux';
import {loginAction, logoutAction} from '../redux/action/AuthenticationAction';
import User from '../model/User';

const Login = (props) => {

    const styles = StyleSheet.create({
        screen : {
            flex: 1,
            alignContent: "space-between",
            padding: 40
        },
        button: {
            paddingTop: 20
        },
        inputStyle: {
            borderBottomWidth: 2,
            borderBottomColor: 'black',
            paddingBottom: 10
        },
        errorMessageStyle: {
            color: 'red',
            padding: 20
        }
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const auth = useSelector(state => state.AuthenticationReducer);
    const dispatch = useDispatch();

    const SignIn = () => {
        try {
            navigation.options.firebaseStore.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response.user.email);
            }).catch(error => {
                switch (error.code) {
                    case 'auth/wrong-password':
                        setErrorMessage('Wrong email or password entered.');
                        break;
                    default:
                        setErrorMessage(error.code);
                        break;
                }
               
            });
        } catch(error) {
            console.log(error);
            setErrorMessage(error.code);
        }
    }

    const SignUp = () => {
        try{
            navigation.options.firebaseStore.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                console.log(user);
                setErrorMessage('');
            }).catch(error => {   
                switch(error.code) {
                    case 'auth/email-already-in-use':
                        setErrorMessage('Email already in use !');
                        break;
                    default: 
                        setErrorMessage(error.code);
                        break;
                 }
                
            })
        } catch(error) {
            console.log(error.toString(error));
            setErrorMessage(error.toString(error));
        }
    }

    const initUser = (token) => {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
          const user = new User(json.name, json.id);
          dispatch(loginAction(user));
          props.navigation.navigate('Home');
        })
        .catch(() => {
          console.log('Error in fetching with graph')
        })
      }
    
    return (
        <View style={styles.screen}>
        
          {auth ? <Text>Welcome {auth.name}</Text> : <Text></Text>}

          <Text style={styles.errorMessageStyle}>{errorMessage}</Text>

          <TextInput placeholder="Email" onChange = {(e) => setEmail(e.nativeEvent.text)} style={styles.inputStyle}/>

          <TextInput placeholder="Password" secureTextEntry={true} onChange = {(e) => setPassword(e.nativeEvent.text)} style={styles.inputStyle}/>

          <View style={styles.button}><Button title='Sign-In' onPress={SignIn}/></View>
          <View style={styles.button}><Button title='Sign-Up' onPress={SignUp}/></View>

          <View style={styles.button}>
            <LoginButton
                publishPermissions={['publish_actions']}
                readPermissions={['public_profile']}
            onLoginFinished={
                (error, result) => {
                    if (error) {
                        alert("Login failed with error: " + error.message);
                    } else if (result.isCancelled) {
                        alert("Login was cancelled");
                    } else {
                        console.log('Login sucessful');
                        AccessToken.getCurrentAccessToken().then(
                            (data) => {
                              let accessToken = data.accessToken;
                              initUser(accessToken);
                            });                 
                    }
                }
            }
            onLogoutFinished={() => 
            {
                alert("User logged out");
                dispatch(logoutAction());
            }}/>
          </View>
        </View>
      );
}
 
export default Login;