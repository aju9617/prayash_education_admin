import React, { useState } from "react";
import { Button, TextInput } from "@ui";
import { GiBookCover } from "react-icons/gi";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route, useHistory, Redirect } from "react-router-dom";
import { authService } from "@services";
import { useAuth } from "@context/authContext";
import { setToken } from "@services/helper";
import toast from "react-hot-toast";
import { constant } from "@config";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

function ResetPassword() {
  const history = useHistory();

  const validationSchema = Yup.object({
    password: Yup.string().required(),
    confirmPassword: Yup.string().required(),
  });

  const initialValue = {
    password: "",
    confirmPassword: "",
  };

  const handleResetPassword = async (e) => {
    const res = await authService.resetPassword({
      password: e.confirmPassword,
      token: localStorage.getItem(constant.RESET_PASSWORD_TOKEN),
    });

    if (res.status) {
      toast.success(res.message);
      localStorage.removeItem(constant.RESET_PASSWORD_EMAIL);
      localStorage.removeItem(constant.RESET_PASSWORD_TOKEN);
      localStorage.removeItem(constant.VERIFY_OTP_TOKEN);
      history.push("/auth");
    }
  };
  return (
    <div className="p-4 md:p-8 lg:p-16">
      <div className="">
        <h2 className="text-2xl font-medium">Reset Password</h2>
      </div>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValue}
        onSubmit={handleResetPassword}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col space-y-4 my-8">
            <TextInput name="password" placeholder="Password" type="password" />
            <TextInput
              name="confirmPassword"
              placeholder="Confirm Password"
              type="text"
            />

            <Button className="w-full" requesting={isSubmitting}>
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
      <Link to="/auth" className="block text-center text-sm text-gray-500">
        Back to login
      </Link>
    </div>
  );
}

function VerifyOTP() {
  const history = useHistory();
  const [requesting, setRequesting] = useState(false);
  const [otp, setOtp] = useState("");

  async function handleResendOTP() {
    setRequesting(true);
    const res = await authService.forgetPassword({
      email: localStorage.getItem(constant.RESET_PASSWORD_EMAIL),
    });
    setRequesting(false);
    if (res.status) {
      toast.success(res.message);
      localStorage.setItem(constant.VERIFY_OTP_TOKEN, res.data.token);
    }
  }
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setRequesting((e) => !e);
    const res = await authService.verifyOTP({
      otp,
      token: localStorage.getItem(constant.VERIFY_OTP_TOKEN),
    });
    setRequesting((e) => !e);
    if (res.status) {
      toast.success(res.message);
      localStorage.setItem(constant.RESET_PASSWORD_TOKEN, res.data.token);
      history.push("/auth/reset-password");
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-16">
      <div className="">
        <h2 className="text-2xl font-medium text-center ">Verify OTP</h2>
        <p className="text-gray-500 text-sm text-center ">
          Check your mail for the one time password
        </p>
      </div>
      <form
        onSubmit={handleVerifyOTP}
        action="#"
        className="flex flex-col space-y-4 my-8"
      >
        <OtpInput
          value={otp}
          onChange={(e) => {
            setOtp(e);
          }}
          isInputNum
          containerStyle="flex-center space-x-4 my-10"
          inputStyle="h-10 !w-10 bg-white rounded block p-0 !ring-secondary focus:!border-secondary outline-none"
          separator={<span>{"  "}</span>}
          numInputs={6}
        />
        <Button requesting={requesting} type="submit" className="w-full">
          Send
        </Button>
      </form>
      <span
        onClick={handleResendOTP}
        className="block text-theme-blue font-medium cursor-pointer py-4 text-center text-sm "
      >
        Resend OTP
      </span>
      <Link to="/auth" className="block text-center text-sm text-gray-500">
        Back to login
      </Link>
    </div>
  );
}

function ForgetPassword() {
  const history = useHistory();

  async function handleResetPassword(e) {
    const res = await authService.forgetPassword({
      email: e.email,
    });

    if (res.status) {
      toast.success(res.message);
      localStorage.setItem(constant.VERIFY_OTP_TOKEN, res.data.token);
      localStorage.setItem(constant.RESET_PASSWORD_EMAIL, e.email);
      history.push("/auth/verify-otp");
    }
  }

  return (
    <div className="p-4 md:p-8 lg:p-16">
      <div className="">
        <h2 className="text-2xl font-medium text-center ">Forget Password</h2>
        <p className="text-gray-500 text-sm text-center ">
          Reset your password
        </p>
      </div>
      <Formik onSubmit={handleResetPassword} initialValues={{ email: "" }}>
        {({ isSubmitting }) => (
          <Form action="#" className="flex flex-col space-y-4 my-8">
            <TextInput name="email" type="email" required placeholder="Email" />
            <Button requesting={isSubmitting} type="submit" className="w-full">
              Send
            </Button>
          </Form>
        )}
      </Formik>
      <Link to="/auth" className="block text-center text-sm text-gray-500">
        Back to login
      </Link>
    </div>
  );
}

function LoginForm() {
  const authData = useAuth();
  const history = useHistory();

  const initialValue = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const formValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(20).required(),
    rememberMe: Yup.boolean().default(false),
  });

  async function handleLogin(e) {
    const res = await authService.login({
      email: e.email,
      password: e.password,
    });

    if (res.status) {
      setToken(res.data.tokens.access.token);
      authData.updateUser(res.data.user);
      localStorage.setItem("remember_me", e.rememberMe);
      history.push({ pathname: "/dashboard" });
    }
  }
  return (
    <div className="p-4 md:p-8 lg:p-16">
      <div className="">
        <h2 className="text-2xl font-medium">Login</h2>
        <p className="text-gray-500 text-sm">Login to your account</p>
      </div>
      <Formik
        autoComplete="new-country-area"
        onSubmit={handleLogin}
        initialValues={initialValue}
        validationSchema={formValidationSchema}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="flex flex-col space-y-4 my-8 w-full">
              <TextInput name="email" placeholder="Email" label="Email" />
              <TextInput
                name="password"
                placeholder="Password"
                type="password"
                label="Password"
              />
              <div className="text-sm mt-6 flex items-center justify-between">
                <span className="flex items-center space-x-2 cursor-pointer ">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    label="Remember Me"
                    className="h-4 w-4 text-secondary rounded-sm !ring-secondary outline-none"
                    id="rememberMe-login"
                  />
                  <label
                    htmlFor="rememberMe-login"
                    className="cursor-pointer  "
                  >
                    Remeber me
                  </label>
                </span>
                <span>
                  <Link to="/auth/forget-password">Forget Password</Link>
                </span>
              </div>
              <Button
                type="submit"
                className="w-full"
                requesting={isSubmitting}
              >
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

function LoginScreen() {
  return (
    <div className="p-4 md:p-10">
      <div className="flex items-center justify-center space-x-4 text-primary">
        <GiBookCover size={39} className="" />
        <p className="font-medium ">Prayash Education</p>
      </div>
      <h4 className="text-primary text-2xl font-medium text-center text-theme-blue my-4">
        Admin Portal
      </h4>
      <div className="w-full md:w-8/12 xl:w-6/12 mx-auto">
        <Switch>
          <Route exact path="/auth" component={LoginForm} />
          <Route
            exact
            path="/auth/forget-password"
            component={ForgetPassword}
          />
          <Route exact path="/auth/verify-otp" component={VerifyOTP} />
          <Route exact path="/auth/reset-password" component={ResetPassword} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </div>
    </div>
  );
}

export default LoginScreen;
