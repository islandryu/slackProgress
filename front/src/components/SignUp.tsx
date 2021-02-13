import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import authActions from "../action/authAction";

const SignUp: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const submit = () => {
    dispatch(authActions.signupAsync({ name, email, password }));
  };
  return (
    <div className="c-login c-homebg__signup">
      <h2 className="c-login__title">サインアップ</h2>
      <input
        type="text"
        placeholder="名前"
        className="c-login__input"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
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
      <button className="c-login-button c-login__button" onClick={submit}>
        サインアップ
      </button>
    </div>
  );
};

export default SignUp;
