import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import '../component/mainContentStyles.css';
import RegisterForm from "../component/Register";
import LoginForm from "../component/Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { loginUser, signupUser } from "../redux/data/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

interface SignUpState {
  name: string;
  email: string;
  password: string;
}

interface SignInState {
  email: string;
  password: string;
}

const Authentication: React.FC = () => {
  const [type, setType] = useState<string>("signIn");

  const [state, setState] = useState<SignInState>({
    email: "",
    password: ""
  });

  const [registerState, setregisterState] = useState<SignUpState>({
    name: "",
    email: "",
    password: ""
  });

  const dispatch: AppDispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.authSlice);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === true) {
      toast.success("Successfully logged in!");
      navigate('/dashboard');
    }
    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, error, navigate]);

  const handleLoginChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLoginOnSubmit = async(evt: FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    const { email, password } = state;
    const response = await dispatch(loginUser({ email, password }));
    console.log(response, "user data");
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = evt.target;
    setregisterState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnSubmit = async(evt: FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    const { name, email, password } = registerState;
    dispatch(signupUser({ name, email, password }));
  };

  const handleOnClick = (text: string): void => {
    setType(text);
  };

  const containerClass: string =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="login-container">
      <div className={containerClass} id="container">
        <RegisterForm
          state={registerState}
          handleChange={handleChange}
          handleOnSubmit={handleOnSubmit}
          loading={loading}
        />
        <LoginForm
          state={state}
          handleChange={handleLoginChange}
          handleOnSubmit={handleLoginOnSubmit}
          loading={loading}
        />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Hello ENNOV!</h1>
              <p>
                Test submission by <b>TAMANJI COURAGE</b>
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                {loading ? "Loading" : "Sign In"}
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello ENNOV!</h1>
              <p>
                Test submission by <b>TAMANJI COURAGE</b>
              </p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                {loading ? "Loading" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
