import * as React from "react";
import { Modal, Button, Input, Divider, Text } from "native-base";

const Index = ({
  modalHeading,
  buttonText,
  handleClose,
  Controller,
  control,
  onFormSubmit,
  open,
  inputDetails,
}) => {
  return (
    <Modal
      isCentered
      isOpen={open}
      onClose={handleClose}
      overlayVisible={false}
    >
      <Modal.Content width="100%">
        <Modal.CloseButton />
        <Modal.Header
          justifyContent="center"
          alignItems="center"
          color="teal.700"
          fontSize="3xl"
          fontWeight="bold"
          p={4}
        >
          {modalHeading}
          <Divider borderWidth={0.5} />
        </Modal.Header>
        <Modal.Body>
          <Text bold fontSize="xl">
            {inputDetails.inputLabel}
          </Text>
          <Controller
            control={control}
            defaultValue=""
            name={inputDetails.name}
            rules={inputDetails.rules}
            render={({ onChange, onBlur, value }) => (
              <Input
                borderColor="teal.600"
                placeholder={inputDetails.placeholder}
                my="5px"
                w="100%"
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                onChangeText={(value) => onChange(value)}
                isInvalid={inputDetails.error}
                errorMessage={inputDetails.helperText}
              />
            )}
          />
        </Modal.Body>
        <Modal.Footer m={4} w="100%" justifyContent="space-between">
          <Button shadow={2} onPress={onFormSubmit} colorScheme="blue" mr={1}>
            {buttonText}
          </Button>
          <Button shadow={2} colorScheme="red" onPress={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default Index;
