import React from 'react'
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles'
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from './../../actions/authActions';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            email: "",
            password: "",
            invalidInputs: [],
            inProcess: false,
        }
        this.goToLogin = this.goToLogin.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signupError) {
            this.setState({ inProcess: false })
            alert(nextProps.signupError.message);
        }
    }

    goToLogin() {
        this.props.navigation.navigate('LoginScreen')
    }

    signUp() {
        let { userName, email, password } = this.state;

        let isFormValid = true, invalidInputs = [];
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email || !email.trim() || !reg.test(email)) {
            isFormValid = false;
            invalidInputs.push('email');
        }
        if (!userName || !userName.trim()) {
            isFormValid = false;
            invalidInputs.push('userName');
        }
        if (!password || !password.trim() || password.trim().length <= 6) {
            isFormValid = false;
            invalidInputs.push('password');
        }

        if (!isFormValid) {
            this.setState({ invalidInputs: [...invalidInputs] })
        } else {
            this.setState({ inProcess: true, invalidInputs: [...invalidInputs] })
            this.props.authAction.createUser(userName, email, password);
        }
    }

    render() {
        let { userName, email, password, invalidInputs, inProcess } = this.state;

        return (
            <View style={styles.container}>

                <Text style={styles.logo}>Test App</Text>

                <TextInput
                    style={[
                        styles.inputBox,
                        { borderColor: invalidInputs.includes('userName') ? 'red' : '#BDBDBD' },
                    ]}
                    returnKeyType={'next'}
                    placeholder={'Enter Name'}
                    placeholderTextColor={'#828894'}
                    blurOnSubmit={false}
                    onChangeText={(userName) => this.setState({ userName })}
                    value={userName}
                    onSubmitEditing={() => this.emailAddress.focus()} />
                {invalidInputs.includes('userName') && <Text style={styles.errorMsg}>User name can't be empty</Text>}

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

                <TouchableOpacity style={styles.button} onPress={() => this.signUp()}>
                    {
                        inProcess ?
                            <ActivityIndicator size={'small'} color={"white"} />
                            :
                            <Text style={styles.buttonText} >Sign Up</Text>
                    }
                </TouchableOpacity>

                <View style={styles.loginTextCont}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity onPress={this.goToLogin}><Text style={styles.loginButton}>Login</Text></TouchableOpacity>
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
        signupError: state.user.signupError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);