import {
  Animated,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';

type value = string | number;

interface FloatingTextInputProps {
  placeholder: string;
  value: value;
  setValue: (
    value: value,
  ) => void | React.Dispatch<React.SetStateAction<value>>;
}

const FloatingTextInput = ({
  placeholder,
  value,
  setValue,
}: FloatingTextInputProps) => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const onFocus = e => {
    Animated.timing(scale, {
      duration: 200,
      toValue: 0.7,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateX, {
      duration: 200,
      toValue: -15,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      duration: 200,
      toValue: -22,
      useNativeDriver: true,
    }).start();
  };

  const onBlur = e => {
    if (!value) {
      Animated.timing(scale, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateX, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateY, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Pressable style={styles.inputField} onPress={() => Keyboard.dismiss()}>
      <Animated.Text
        style={[
          styles.labelAnimate,
          {
            transform: [
              {scale: scale},
              {translateX: translateX},
              {translateY: translateY},
            ],
          },
        ]}>
        {placeholder}
      </Animated.Text>
      <TextInput
        value={value}
        onChangeText={text => setValue(text)}
        style={styles.textInput}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Pressable>
  );
};

export default FloatingTextInput;

const styles = StyleSheet.create({
  inputField: {
    height: 50,
    borderColor: '#807e7e',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  labelAnimate: {
    position: 'absolute',
    left: 15,
    color: '#807e7e',
  },
  textInput: {
    fontSize: 14,
    fontWeight: '500',
    padding: 0,
  },
});
