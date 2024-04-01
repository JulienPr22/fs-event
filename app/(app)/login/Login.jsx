import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import styles from './login.style';
import { COLORS } from '../../constants';
import { FIREBASE_AUTH } from '../../../firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    if (!isLogin) {
      signUp();
      return;
    }
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

      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Text style={styles.title}>
            {isLogin ? 'Connexion' : 'Inscription'}
          </Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder='Email'
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
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
              <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.buttonText}>
                  {isLogin ? 'Se connecter' : "S'inscrire"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.switchText}
                onPress={() => setIsLogin(!isLogin)}
              >
                <Text style={styles.switchText}>
                  {isLogin
                    ? "Pas encore de compte ? S'inscrire"
                    : 'Déjà inscrit ? Se connecter'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Login;
