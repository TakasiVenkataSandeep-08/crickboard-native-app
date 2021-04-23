import React from "react";
import { ScrollView, Text } from "react-native";

const index = ({ todos, type }) => {
  return (
    <ScrollView>
      {todos.map((todo) => (
        <Text>
          {type === "ccd"
            ? todo.flow
            : type === "assigned"
            ? todo.assignedByUserName || todo.assignedToUserName
            : todo.title}
        </Text>
      ))}
    </ScrollView>
  );
};

export default index;
