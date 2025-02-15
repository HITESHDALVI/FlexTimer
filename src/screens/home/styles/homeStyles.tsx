import {StyleSheet} from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {flex: 1, position: 'relative', backgroundColor: '#FFFFFF'},
  emptyCon: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  empty: {fontSize: 18, fontWeight: '500', lineHeight: 24},
  desc: {
    color: 'gray',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '400',
  },
  title: {
    color: '#0079FF',
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 28,
    textAlign: 'center',
    width: '100%',
    marginVertical: '4%',
    marginBottom: '2%',
    marginTop: '6%',
  },
  addTimer: {
    borderRadius: 50,
    height: 60,
    width: 60,
    backgroundColor: '#FFD65A',
    position: 'absolute',
    bottom: '5%',
    right: '8%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {fontSize: 40, fontWeight: '300', color: 'white'},
  history: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: '4%',
    marginVertical: '2.5%',
  },
  historyText: {fontSize: 14, lineHeight: 20, width: '15%', color: 'green'},
});
