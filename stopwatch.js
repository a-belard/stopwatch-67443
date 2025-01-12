import { useState, useEffect } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;
    // Check if the stopwatch should run
    if (isRunning && !isPaused) {
      // Start the timer if running and not paused
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment the time state by 1 every 100 milliseconds
      }, 100);
    } else {
      // Clear the timer if the stopwatch is not running or is paused
      clearInterval(interval);
    }
    // Cleanup function to clear the interval when the component unmounts
    // or when the dependency array(isRunning and isPaused) changes
    return () => clearInterval(interval);
  }, [isRunning, isPaused]); // Dependency array: runs this effect whenever isRunning or isPaused changes

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 600);
    const seconds = Math.floor((time % 600) / 10);
    const milliseconds = time % 10;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stopWatchTitle}>Stopwatch 67-443</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{formatTime(time)}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableHighlight
          onPress={startTimer}
          disabled={isRunning}
          style={{
            ...styles.button,
            ...styles.startButton,
            opacity: isRunning ? 0.3 : 1,
          }}
        >
          <Text
            style={{
              ...styles.buttonText,
              ...styles.startButtontext,
            }}
          >
            Start
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={pauseTimer}
          disabled={!isRunning}
          style={{
            ...styles.button,
            ...styles.pauseButton,
            opacity: isRunning ? 1 : 0.3,
          }}
        >
          <Text
            style={{
              ...styles.buttonText,
              ...styles.pauseButtontext,
            }}
          >
            {isPaused ? "Resume" : "Pause"}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={resetTimer}
          disabled={!isRunning}
          style={{
            ...styles.button,
            ...styles.resetButton,
            opacity: !isRunning ? 0.3 : 1,
          }}
        >
          <Text
            style={{
              ...styles.buttonText,
              ...styles.resetButtontext,
            }}
          >
            Reset
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  stopWatchTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  timeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    borderRadius: "50%",
    backgroundColor: "#F3F3F3",
  },
  time: {
    fontSize: 53,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  button: {
    height: 100,
    width: 100,
    padding: 10,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  startButton: {
    backgroundColor: "#04820049",
    borderColor: "#048200",
  },
  startButtontext: {
    color: "green",
  },
  pauseButton: {
    backgroundColor: "#0060BA43",
    borderColor: "#0060BA",
  },
  pauseButtontext: {
    color: "blue",
  },
  resetButton: {
    backgroundColor: "#CB000051",
    borderColor: "#CB0000",
  },
  resetButtontext: {
    color: "darkred",
  },
});
