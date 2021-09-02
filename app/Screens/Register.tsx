import { Button, Input, Text } from "@ui-kitten/components";
import { Formik } from "formik";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AndroidSafeArea from "../Components/AndroidSafeArea";
import FormLabel from "../Components/FormLabel";
import * as yup from "yup";
import { AuthContext } from "../Context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthParamList } from "../Navigation";

type RegisterNavigationProp = StackNavigationProp<AuthParamList, "Register">;

interface Props {
  navigation: RegisterNavigationProp;
}

const formSchema = yup.object({
  Username: yup
    .string()
    .required()
    .min(3)
    .max(20)
    .matches(/^\S*$/, "Username cannot contain spaces"),
  Email: yup
    .string()
    .required()
    .email()
    .matches(/^\S*$/, "Password cannot contain spaces"),
  Password: yup.string().required().min(4).max(20),
  City: yup.string().required().min(3),
  Zip: yup.string(),
});


const Register: React.FC<Props> = ({navigation}) => {
  const authCtx = React.useContext(AuthContext);

  return (
    <AndroidSafeArea style={{ paddingHorizontal: 45 }}>
      <Formik
        initialValues={{
          Username: "",
          Email: "",
          Password: "",
          City: "",
          Zip: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values, { setFieldError, resetForm}) => {
          if (!authCtx?.actions.isUsernameAvailable(values)) {
            setFieldError("Username", "Username already taken");
          } else {
            authCtx.actions.register(values);
            resetForm();
            navigation.navigate('Login', {username: values.Username})
          }
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          ...props
        }) => (
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView style={stl.formContainer}>
              <Input
                style={stl.input}
                value={values.Username}
                onChangeText={handleChange("Username")}
                label={(<FormLabel>Username</FormLabel>) as any}
                status={
                  errors.Username && touched.Username ? "danger" : "basic"
                }
                caption={
                  (
                    <Text style={stl.captionText}>
                      {touched.Username && (errors.Username as any)}
                    </Text>
                  ) as any
                }
              />
              <Input
                style={stl.input}
                value={values.Email}
                onChangeText={handleChange("Email")}
                label={(<FormLabel>Email</FormLabel>) as any}
                status={errors.Email && touched.Email ? "danger" : "basic"}
                caption={
                  (
                    <Text style={stl.captionText}>
                      {touched.Email && (errors.Email as any)}
                    </Text>
                  ) as any
                }
              />
              <Input
                style={stl.input}
                value={values.Password}
                onChangeText={handleChange("Password")}
                secureTextEntry
                label={(<FormLabel>Password</FormLabel>) as any}
                status={
                  errors.Password && touched.Password ? "danger" : "basic"
                }
                caption={
                  (
                    <Text style={stl.captionText}>
                      {touched.Password && (errors.Password as any)}
                    </Text>
                  ) as any
                }
              />
              <View style={stl.cityContainer}>
                <Input
                  style={stl.cityInput}
                  value={values.City}
                  onChangeText={handleChange("City")}
                  label={(<FormLabel>City</FormLabel>) as any}
                  status={errors.City && touched.City ? "danger" : "basic"}
                  caption={
                    (
                      <Text style={stl.captionText}>
                        {touched.City && (errors.City as any)}
                      </Text>
                    ) as any
                  }
                />
                <Input
                  value={values.Zip}
                  onChangeText={handleChange("Zip")}
                  placeholder="Zip Code"
                  keyboardType="number-pad"
                  label={(<FormLabel>Zip</FormLabel>) as any}
                  status={errors.Zip && touched.Zip ? "danger" : "basic"}
                />
              </View>
            </ScrollView>
            <Button
              style={stl.button}
              appearance="outline"
              status="info"
              onPress={handleSubmit as any}
            >
              Register
            </Button>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </AndroidSafeArea>
  );
};

const stl = StyleSheet.create({
  input: {
    marginBottom: 28,
  },
  cityContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 60,
  },
  cityInput: {
    flex: 1,
    marginRight: 12,
  },
  button: {
    marginBottom: 40,
  },
  formContainer: {
    flex: 1,
  },
  captionText: {
    color: "red",
  },
});

export default Register;
