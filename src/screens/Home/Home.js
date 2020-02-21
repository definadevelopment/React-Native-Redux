import React from 'react'
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles'
//REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from './../../actions/authActions';

class Home extends React.Component {

    render() {
        const { userData } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Welcome</Text>
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
        userData: state.user.userData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);