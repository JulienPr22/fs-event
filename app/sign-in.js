import { Stack, router } from 'expo-router';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useSession } from './ctx';
import { COLORS, FONT, SIZES } from './constants';
import { useState } from 'react';

export default function SignIn() {
  const { signIn, signUp } = useSession();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('visitor');

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
      await signUp(email, password, name, role);
      Alert.alert("Succès",'Inscription réussie!');
      router.push('/(app)')
    } catch (error) {
      console.log(error);
      alert(`Inscription échouée: ${error.message}`);
    } finally {
      setLoading(false);
    }

  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Stack.Screen options={{ headerShown: false }} />

          <Text style={styles.title}>
            {isLogin ? 'Connexion' : 'Inscription'}
          </Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder='Email'
            autoCapitalize='none'
            inputMode='email'
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry={true}
            placeholder='Mot de passe'
            autoCapitalize='none'
            onChangeText={setPassword}
          />

          {!isLogin && (
            <>
              <TextInput
                style={styles.input}
                value={name}
                placeholder='Nom'
                autoCapitalize='words'
                onChangeText={(text) => setName(text)}
              />

              <View style={styles.tabsContainer}>
                <Text style={styles.switchText}>Rôle:</Text>

                <TouchableOpacity
                  style={styles.tab(role)}
                  onPress={() => {
                    setRole("visitor");
                  }}
                >
                  <Text style={styles.tabText(role, 'visitor')}>Visiteur</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.tab(role)}
                  onPress={() => {
                    setRole("contributor");
                  }}
                >
                  <Text style={styles.tabText(role, 'contributor')}>Contributeur</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

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
                <Text style={{color: COLORS.secondary, marginTop: 10}}>
                  {isLogin
                    ? "Pas encore de compte ? S'inscrire"
                    : 'Déjà inscrit ? Se connecter'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.large,
    backgroundColor: COLORS.lightWhite
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
    // width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginTop: 10,
    paddingHorizontal: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputTag: {
    color: COLORS.secondary,
  },
  tabsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  tab: (activeRole, switchRole) => ({
    paddingVertical: SIZES.small / 2,
    paddingLeft: SIZES.small,
    borderColor: activeRole === switchRole ? COLORS.tertiary : COLORS.gray2,
  }),
  tabText: (activeJobType, switchRole) => ({
    fontFamily: FONT.medium,
    color: activeJobType === switchRole ? COLORS.tertiary : COLORS.gray2,
  }),
});