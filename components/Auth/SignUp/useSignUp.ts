import { useContext, useState } from "react";
import { signUpUser } from "./services";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/app.context";
import { UserDetailsType } from "./types";
import { USER_LOGIN } from "@/constants/actions";

export default function useSignUpHook() {
  const router = useRouter();
  const { dispatch } = useContext(AppContext);
  const [signupError, setSignupError] = useState<string>("");
  const [userDetails, setUserDetails] = useState<UserDetailsType>({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [formErrors, setFormErrors] = useState<UserDetailsType>({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateUserDetails = () => {
    const { name, email, password, cpassword } = userDetails;
    setFormErrors({
      name: name !== "" ? "" : "Name is required!",
      email:
        email === ""
          ? "Email is required!"
          : !validateEmail(email)
          ? "Please enter a valid email"
          : "",
      password: password === "" ? "Please enter a valid password" : "",
      cpassword: cpassword !== password ? "Password does not match" : "",
    });
    if (
      name === "" ||
      email === "" ||
      !validateEmail(email) ||
      password === "" ||
      password !== cpassword
    ) {
      return false;
    }
    return true;
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = userDetails;
    const isValidForm = validateUserDetails();
    if (!isValidForm) return;
    try {
      const payload = {
        name,
        email,
        password,
        role: "collaborator",
        permissions: ["edit"],
      };
      const response = await signUpUser(payload);
      if (response?.accessToken?.length > 0) {
        dispatch({
          type: USER_LOGIN,
          payload: { token: response?.accessToken, user: response?.user },
        });
        router.push("/add-section");
      } else {
        setSignupError(response);
      }
    } catch (err) {
      setSignupError("Something went wrong!");
    }
  };

  const onChangeUserDetails = (field: string, value: string) => {
    setUserDetails((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };
  return {
    formErrors,
    userDetails,
    signupError,
    onSubmitHandler,
    onChangeUserDetails,
  };
}
