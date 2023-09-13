import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalText from "./components/GoalText";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalState, setModalState] = useState(false);

  function addGoalHandler(newGoal) {
    const uuid = String(
      Date.now().toString(32) + Math.random().toString(16),
    ).replace(/\./g, "");

    setCourseGoals((currentData) => [
      ...currentData,
      { text: newGoal, id: uuid },
    ]);
  }

  function openModalHandler() {
    setModalState(true);
  }

  function closeModalHandler() {
    setModalState(false);
  }

  function deleteGoalHandler(id) {
    console.log(id);
    console.log(courseGoals);
    setCourseGoals((currentData) =>
      currentData.filter((item) => item.id !== id),
    );
  }

  return (
    <>
      <StatusBar style={"dark"} />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={openModalHandler}
        />
        <GoalText
          visible={modalState}
          addGoalHandler={addGoalHandler}
          onCancel={closeModalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemObject) => (
              <GoalItem
                id={itemObject.item.id}
                text={itemObject.item.text}
                onDeleteItem={deleteGoalHandler}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
