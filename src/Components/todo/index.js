import React from "react";
import { View, ScrollView } from "react-native";
import { Box, Tabs, Flex, VStack, Spinner } from "native-base";
import TodoPage from "../TodoPage";
const index = () => {
  const assignedTodos = [
    {
      id: 1,
      title: "test",
      description: "test",
      isClosed: false,
      allowComplete: true,
      assignedByUserName: "dummy1",
      creatorId: "41166dff-63cb-4c54-8b14-c087554ad65f",
    },
    {
      id: 2,
      title: "test1",
      description: "test1",
      isClosed: false,
      allowComplete: false,
      assignedToUserName: "dummy2",
      creatorId: "41166dff-63cb-4c54-8b14-c087554ad65f",
    },
  ];
  const createdTodos = [
    {
      id: 2,
      title: "dummy",
      description: "dummy",
      isClosed: false,
      createdAt: "2021-03-12T11:47:05.413Z",
      updatedAt: "2021-03-12T11:47:05.413Z",
      creatorId: "41166dff-63cb-4c54-8b14-c087554ad65f",
      allowClose: false,
      flow: "dummy1 -> dummy2",
    },
  ];
  const ccdTodos = [
    {
      id: 2,
      todoId: 2,
      title: "dummy",
      description: "dummy",
      isClosed: false,
      ccdUserId: "c565557a - 0f4f- 42d5 - 81f8 - 1d72b4987db2",
      assignedBy: "caa9e2c4 - b752 - 49fe - a608 - 0a2519b5d5b8",
      assignedByUserName: "dummy1",
      flow: "dummy1 -> dummy2",
    },
  ];
  return (
    <ScrollView>
      <Flex w="100%" h="100%">
        <VStack space={4} width="100%">
          <View>
            <Box width="100%" bg="#fff" shadow={1} p={1}>
              <Tabs size="lg" variant="enclosed" isFitted>
                <Tabs.Bar>
                  {["created", "Tagged", "assigned"].map((tabName, index) => (
                    <Tabs.Tab w="100%" key={index}>
                      {tabName}
                    </Tabs.Tab>
                  ))}
                </Tabs.Bar>
                <Tabs.Views>
                  <Tabs.View>
                    <TodoPage todos={createdTodos} type="created" />
                  </Tabs.View>
                  <Tabs.View>
                    <TodoPage todos={ccdTodos} type="ccd" />
                  </Tabs.View>
                  <Tabs.View>
                    <TodoPage todos={assignedTodos} type="assigned" />
                  </Tabs.View>
                </Tabs.Views>
              </Tabs>
            </Box>
          </View>
        </VStack>
      </Flex>
    </ScrollView>
  );
};

export default index;
