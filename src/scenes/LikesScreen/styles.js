import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#020E2C',
        height: Dimensions.get('window').height,
    },
    buyPremium: {
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 15,
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
        color: 'white',
    },
    william: {
        textAlign: 'left',
        fontSize: 14,
        fontWeight: '700',
        marginHorizontal: 15,
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 20,
        color: '#0077B7',
    },
    card: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    mainDesign: {
        marginTop: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: '#000000',
        borderColor: '#0077B7',
        borderWidth: 2,
    },
    coverImage: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    txtName: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
        color: 'white',
    },
    market: {
        textAlign: 'left',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 10,
        color: '#0077B7',
    },
    about: {
        fontSize: 12,
        fontWeight: '500',
        color: 'white',
        width: 200,
        marginLeft: 10,
        flexWrap: 'wrap',
    },
    view2: {
        margin: 10
    },
    view3: {
        flexDirection: "row"
    },
    view4: { alignSelf: 'center' }
});

export default styles;
