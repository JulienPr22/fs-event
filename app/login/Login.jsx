import { View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { COLORS } from '../../constants';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(`Connexion échouée: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert('Regardez vos emails!');
    } catch (error) {
      console.log(error);
      alert(`Inscription échouée: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View>
        <KeyboardAvoidingView>
        <Text>Login</Text>
        <TextInput
          value={email}
          placeholder='Email'
          autoCapitalize='none'
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={password}
          secureTextEntry={true}
          placeholder='Mot de passe'
          autoCapitalize='none'
          onChangeText={(text) => setPassword(text)}
        />

        {loading ? (
          <ActivityIndicator size='large' />
        ) : (
          <>
            <Button title='Se connecter' onPress={signIn} />
            <Button title="S'inscrire" onPress={signUp} />
          </>
        )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Login;
