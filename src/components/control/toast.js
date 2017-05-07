import {
    ToastAndroid,
    Platform
} from 'react-native';


function show(msg) {
    if (Platform.OS === 'ios') {

    } else {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
}

export default {
    show: show
}