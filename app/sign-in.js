import { Stack, router } from 'expo-router';
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useSession } from './ctx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from './constants';
import { useState } from 'react';


export default function SignIn() {
  const { signIn, signUp } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSignIn = async () => {
    if (!isLogin) {
      handleSignUp(email, password);
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.push('/(app)')
    } catch (error) {
      console.log(error);
      alert(`Connexion échouée: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await signUp(email, password);
      alert('Inscription réussie!');
      router.push('/(app)')
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
        {/* <KeyboardAvoidingView> */}
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
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
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
        {/* </KeyboardAvoidingView> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.large,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginTop: 10,
    paddingHorizontal: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 5,
    color: COLORS.tertiary,
  },
});