import { StyleSheet } from 'react-native'
export default styles = StyleSheet.create({
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#4f83cc",
        marginVertical: 40
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#002f6c'
    },
    errorMsg: {
        color: 'red',
        fontSize: 14,
        width: 300,
        marginLeft: 15,
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 20,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center'
    },
    loginTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    loginText: {
        color: '#12799f',
        fontSize: 16,
    },
    loginButton: {
        color: '#12799f',
        fontSize: 16,
        fontWeight: '500',
    },
})