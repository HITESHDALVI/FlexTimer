import {StyleSheet} from 'react-native';

export const timerCardstyles = StyleSheet.create({
  categoryContainer: {
    marginVertical: '2.5%',
    backgroundColor: '#F3F8FF',
    borderRadius: 4,
    paddingHorizontal: '4%',
    paddingVertical: '2.5%',
  },
  categoryHeader: {
    paddingHorizontal: '4%',
    paddingVertical: '2.5%',
    backgroundColor: '#F6F1E9',
    borderRadius: 4,
    flexDirection: 'row',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '500',
  },
  timerCard: {
    backgroundColor: '#fff',
    paddingHorizontal: '4%',
    paddingVertical: '2.5%',
    marginVertical: '2%',
    borderRadius: 4,
  },
  timerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timerInfo: {
    fontSize: 14,
  },
  timerStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: '5%',
    paddingVertical: '2.5%',
    borderRadius: 4,
    marginRight: '2%',
  },
  startButton: {
    backgroundColor: 'green',
  },
  pauseButton: {
    backgroundColor: 'orange',
  },
  resetButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: '2.5%',
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
});
