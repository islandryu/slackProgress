import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import authActions from "../action/authAction";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const submit = () => {
    dispatch(authActions.loginAsync({ email, password }));
  };
  return (
    <div className="c-login c-homebg__login">
      <h2 className="c-login__title">ログイン</h2>
      <input
        type="text"
        placeholder="メールアドレス"
        className="c-login__input"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="text"
        placeholder="パスワード"
        className="c-login__input"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className="c-login-button c-login__button"
        onClick={submit} 
      >ログイン</button>
    </div>
  );
};

export default Login;
