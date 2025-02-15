This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

# Timer App

A React Native timer application that allows users to manage multiple timers grouped by categories. The app supports starting, pausing, and resetting timers, along with a progress visualization feature.

## Features

- Start, pause, and reset individual timers.
- Start, pause, and reset all timers within a category.
- Progress visualization using an animated progress bar.
- Optimized performance to prevent unnecessary re-renders.

---

## Setup Instructions

## Install Dependencies

- npm install
- npm run android

## Assumptions Made During Development

## Timer Data Handling

- Each timer has a unique id, a name, a duration, and a status.
-
- The status can be one of the following:

- Running – The timer is active.

- Paused – The timer is stopped but not reset.

- Completed – The timer has reached 0 seconds.

## UI Behavior & State Management

- Timers are grouped by category .

- Expanding/collapsing a category does not reset any timers.

## Timer Functionality

- Timers update every second while running.

- Users can switch screens while timers continue running in the background.

- The app allows starting, pausing, and resetting all timers in a category at once.

- If a timer is Completed, the start button is disabled to prevent restarting it.

## Progress Visualization

- The progress bar represents remainingTime / duration.

- The progress bar updates smoothly using animations.

- If remainingTime === 0, the progress bar is fully depleted.

## Performance Considerations

- useMemo and useCallback are used to prevent unnecessary re-renders.

- useState is used for local component state, while useRef helps persist data without triggering renders.

## Error Handling & Edge Cases

- If no field is entered error is throw.

## UI screen

- home screen - app title is at top, below that history button to redirect to history screen for checking the compeleted timers ,
- note : history button only visible if there is data in compeleted status.
- timer list at center of te home screen
- At bottom right - Add timer screen for adding new timer with name , duration in seconds and category field
- progress bar in card for visual representaion .
- on compeletion of half of the counter time a toast messgae is shown at the bottom of the screen with name.
- after comepletion of the timer a modal is shown with name of the timer.
- inside card there is title section for the category .
- below the title of acrd 3 actions are given to play pause and reset the timer in bulk for that particular category timers.
- and when you expand the card there are detail of the timer name, duration, timeleft , status start, pause and reset option and a progress bar.
