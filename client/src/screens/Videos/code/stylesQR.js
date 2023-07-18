import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 30,
    backgroundColor: 'white'
  },
  iconButtonHomeContainer: {marginRight: 10},
  iconButtonHome: {
    type: 'material',
    size: 50,
    color: 'white',
  },
  titleButtonHome: {
    fontWeight: '700',
    fontSize: 25,
  },
  buttonHome: {
    backgroundColor: 'rgb(82, 216, 107)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
    height: 100,
  },
  buttonHomeContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  RNQRCode: {
    // flex: 1,
    marginTop: 100,

  },
  QRgeneratorHeader: {
    flex: 0.2,
    backgroundColor: '#f5f6f7',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 19,
    color: 'black',
    fontWeight: '500',
  },
  QRgeneratorContent: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonQRGeneratorContainer: {
  },
  iconQr: {
    height: 100,
    width: 150,
        resizeMode: 'contain',

  }
});

export default styles;
