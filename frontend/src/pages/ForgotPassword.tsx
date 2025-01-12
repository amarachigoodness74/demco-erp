import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../utils/auth/AuthContext";
import { postOrPutData } from "../utils/apiRequests";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthToken, setCurrentUser } = useAuthContext();

  const [error, setError] = useState("null");

  const from = location.state?.from?.pathname || "/dashboard";

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values: { email: string }) => {
    const { email } = values;

    if (email === "") {
      setError("Please fill in all fields");
    } else {
      try {
        const userJson = await postOrPutData("auth/login", { email }, "POST");
        if (userJson.status === "error") {
          setError(
            Array.isArray(userJson.errors || userJson.error)
              ? userJson.errors[0].msg || userJson.error[0].msg
              : userJson.errors || userJson.error
          );
        } else {
          setAuthToken(userJson.token);
          setCurrentUser(userJson.payload);
          navigate(from, { replace: true });
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl mb-4 text-center font-bold text-purple-600">
          Forgot Password
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1 text-red-500 text-sm"
                />
              </div>
              {error && (
                <div className="text-center font-bold mt-1 text-red-500 text-sm">
                  <p>{error}</p>
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  disabled={isSubmitting}
                >
                  Forgot Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
