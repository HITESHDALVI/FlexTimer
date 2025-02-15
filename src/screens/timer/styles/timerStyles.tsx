import {StyleSheet} from 'react-native';

export const timerStyles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: '5%', paddingVertical: '5%'},
  input: {
    borderRadius: 4,
    borderColor: 'grey',
    borderWidth: 0.5,
    marginVertical: '2%',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
    height: 45,
    marginBottom: '4%',
  },
  timerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  addContainer: {},
  label: {
    fontSize: 14,
    marginTop: '1%',
  },
  saveTimerWrapper: {
    width: '100%',
    height: 45,
    backgroundColor: '#0079FF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '8%',
  },
  saveTimer: {
    letterSpacing: 0.25,
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  navigation: {
    width: '100%',
    fontSize: 20,
    lineHeight: 24,
    marginVertical: '4%',
    color: '#36454F',
    marginBottom: '8%',
  },
});
