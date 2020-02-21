import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
//REDUX
import { connect } from 'react-redux';

class Default extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Default</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.checkLogin(nextProps)
    }

    componentDidMount() {
        this.checkLogin(this.props)
    }

    checkLogin(props) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                props.navigation.navigate('App')
            } else {
                props.navigation.navigate('Auth')
            }
        });
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user.userData
    }
}

export default connect(mapStateToProps, null)(Default);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})