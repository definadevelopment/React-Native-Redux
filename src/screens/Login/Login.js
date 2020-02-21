import React from 'react'
import { Text, View, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import styles from './styles'
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from './../../actions/authActions';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            invalidInputs: [],
            inProcess: false
        }
        this.signUp = this.signUp.bind(this);
        this.login = this.login.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loginError) {
            this.setState({ inProcess: false })
            alert(nextProps.loginError.message);
        }
    }

    signUp() {
        this.props.navigation.navigate('SignupScreen')
    }

    login() {
        let { email, password } = this.state;

        let isFormValid = true, invalidInputs = [];
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
        if (!email || !email.trim() || !reg.test(email)) {
            isFormValid = false;
            invalidInputs.push('email');
        }
        if (!password || !password.trim()) {
            isFormValid = false;
            invalidInputs.push('password');
        }

        if (!isFormValid) {
            this.setState({ invalidInputs: [...invalidInputs] })
        } else {
            this.setState({ inProcess: true, invalidInputs: [...invalidInputs] })
            this.props.authAction.loginUser(email, password);
        }
    }

    render() {
        let { email, password, invalidInputs,inProcess } = this.state;
        return (
            <View style={styles.container}>

                <Text style={styles.logo}>Test App</Text>

                <TextInput
                    style={[
                        styles.inputBox,
                        { borderColor: invalidInputs.includes('email') ? 'red' : '#BDBDBD' },
                    ]}
                    placeholder={'Enter Email'}
                    placeholderTextColor={'#828894'}
                    returnKeyType={'next'}
                    blurOnSubmit={false}
                    autoCompleteType={'email'}
                    onChangeText={(email) => this.setState({ email })}
                    value={email}
                    keyboardType={'email-address'}
                    textContentType={'emailAddress'}
                    ref={(input) => this.emailAddress = input}
                    onSubmitEditing={() => this.password.focus()} />
                {invalidInputs.includes('email') && <Text style={styles.errorMsg}>Invalid email</Text>}

                <TextInput
                    style={[
                        styles.inputBox,
                        { borderColor: invalidInputs.includes('password') ? 'red' : '#BDBDBD' },
                    ]}
                    onChangeText={(password) => this.setState({ password })}
                    value={password}
                    placeholderTextColor={'#828894'}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    secureTextEntry={true}
                    ref={(input) => this.password = input}
                />
                {invalidInputs.includes('password') && <Text style={styles.errorMsg}>Password should be greater than 6 chars.</Text>}

                <TouchableOpacity style={styles.button} onPress={this.login}>
                    {
                        inProcess ?
                            <ActivityIndicator size={'small'} color={"white"} />
                            :
                            <Text style={styles.buttonText} >Login</Text>
                    }
                </TouchableOpacity>

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Dont have an account yet? </Text>
                    <TouchableOpacity onPress={this.signUp}><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
                </View>
            </View>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        authAction: bindActionCreators(authActions, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        loginError: state.user.loginError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);