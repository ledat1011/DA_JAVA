import { Header } from "antd/lib/layout/layout";
import React from "react";
import ContentUserPage from "./UserPage/ContentUserPage";
import Header from "./layout/Header";

export default class UserPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ContentUserPage />
      </div>
    );
  }
}
