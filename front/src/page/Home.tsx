import React, { FC } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import SlackImage from "../images/slack.png";

const Home: FC = () => {
  return (
    <div className="l-home-main">
      <img src={SlackImage} alt="" className="c-slack-image l-home-main__img" />
      <div className="c-homebg l-home-main__homebg">
        <div className="c-title c-homebg__title">
          <h1 className="c-title__title">SLACK PROGRESS</h1>
          <div className="c-title-sub">
            進捗報告と一緒にslackにコメントを送ることができます。
          </div>
        </div>
        <Login />
        <SignUp />
      </div>
    </div>
  );
};

export default Home;
