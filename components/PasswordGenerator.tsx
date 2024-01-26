import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import * as Yup from 'yup';
import CheckboxSection from './CheckboxSection';
import InputSection from './InputSection';
import Para from './Para';

const passwordValidationSchema = Yup.object({
  passwordLength: Yup.number()
    .typeError('Password length is required!')
    .min(4, 'Password length must be minimum of 4 characters!')
    .max(16, 'Password length must be maximum of 20 characters!'),
});

const generatePassword = (length: number, chars: string) => {
  let password = '';
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * chars.length);
    password += chars[random];
  }

  return password;
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState('');
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [error, setError] = useState('');

  const generateNewPassword = async () => {
    setPassword('');
    setError('');
    passwordValidationSchema
      .validate({passwordLength})
      .then(() => {
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) {
          chars += chars.toUpperCase();
        }
        if (includeNumbers) {
          chars += '0123456789';
        }
        if (includeSpecialChars) {
          chars += '~!@#$%^&*.';
        }

        let newPassword = generatePassword(Number(passwordLength), chars);
        setPassword(newPassword);
      })
      .catch(err => setError(err.message));
  };

  const resetStates = () => {
    setPassword('');
    setPasswordLength('');
    setIncludeUppercase(false);
    setIncludeNumbers(false);
    setIncludeSpecialChars(false);
  };

  return (
    <View>
      <View>
        <Para style={[styles.heading]}>Password Generator</Para>
      </View>

      <View style={styles.seperator}>{}</View>

      <View style={styles.container}>
        <InputSection
          label="Password Length"
          placeholder="Ex. 8"
          inputMode="numeric"
          onChangeText={length => setPasswordLength(length)}
          value={passwordLength}
          style={[styles.lengthInput]}
        />

        <CheckboxSection
          label="Include Uppercase"
          fillColor="green"
          isChecked={includeUppercase}
          onPress={() => setIncludeUppercase(!includeUppercase)}
        />

        <CheckboxSection
          label="Include Numbers"
          fillColor="orange"
          isChecked={includeNumbers}
          onPress={() => setIncludeNumbers(!includeNumbers)}
        />

        <CheckboxSection
          label="Include Special Characters"
          fillColor="purple"
          isChecked={includeSpecialChars}
          onPress={() => setIncludeSpecialChars(!includeSpecialChars)}
        />

        <View style={styles.buttonsContainer}>
          <Button
            title="Generate Password"
            color="teal"
            onPress={generateNewPassword}
          />
          <Button title="Reset" color="gray" onPress={resetStates} />
        </View>
      </View>

      {(password || error) && (
        <View style={styles.resultContainer}>
          {password && (
            <Para style={[styles.passwordText]}>
              Password:{' '}
              <Para style={[styles.password]} selectable={true}>
                {password}
              </Para>
            </Para>
          )}

          {error && <Para style={[styles.error]}>{error}</Para>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 16,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 32,
  },
  seperator: {
    left: '30%',
    width: '40%',
    marginTop: 16,
    marginBottom: 32,
    borderBottomWidth: 4,
    borderBottomColor: 'teal',
  },
  lengthInput: {minWidth: 100},
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  resultContainer: {
    marginVertical: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  passwordText: {
    fontSize: 16,
  },
  password: {
    fontWeight: 'bold',
  },
  error: {
    color: 'coral',
  },
});

export default PasswordGenerator;
