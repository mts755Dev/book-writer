import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "./services";
import { UserLoginDetailsType } from "./types";
import { AppContext } from "@/context/app.context";
import { USER_LOGIN } from "@/constants/actions";

export default function useLoginHook() {
  const router = useRouter();
  const { dispatch } = useContext(AppContext);
  const [loginError, setLoginError] = useState<string>("");
  const [loginDetails, setLoginDetails] = useState<UserLoginDetailsType>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<UserLoginDetailsType>({
    email: "",
    password: "",
  });

  const onChangeHandler = (field: string, value: string) => {
    setLoginDetails((prev: UserLoginDetailsType) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginDetails;
    setFormErrors({
      email:
        email === ""
          ? "Please enter your email"
          : !validateEmail(email)
          ? "Please enter a valid email"
          : "",
      password: password === "" ? "Please enter a password" : "",
    });
    if (email.length === 0 || !validateEmail(email) || password.length === 0)
      return;
    try {
      const response = await loginUser(loginDetails);
      if (response?.accessToken?.length > 0) {
        dispatch({
          type: USER_LOGIN,
          payload: { token: response?.accessToken, user: response?.user },
        });
        router.push("/add-section");
      } else {
        setLoginError(response);
      }
    } catch (err) {
      setLoginError("Something went wrong!");
    }
  };

  return {
    loginDetails,
    formErrors,
    loginError,
    onChangeHandler,
    onSubmitHandler,
  };
}
