import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

export default class InputMethodEditor extends React.Component {
  state = {
    text: '',
  };

  handleChangeText = (text) => {
    this.setState({ text });
  };

  handleSubmit = () => {
    const { text } = this.state;
    if (text.trim()) {
      const { onSubmit } = this.props;
      if (onSubmit) {
        onSubmit(text.trim());
      }
      this.setState({ text: '' });
    }
  };

  render() {
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={this.handleChangeText}
          placeholder="Mesaj yazın..."
          multiline
        />
        <TouchableOpacity 
          style={[styles.button, !text.trim() && styles.buttonDisabled]} 
          onPress={this.handleSubmit}
          disabled={!text.trim()}
        >
          <Text style={styles.buttonText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
