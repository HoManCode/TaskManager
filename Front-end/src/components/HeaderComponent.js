import React from "react";
import NavigationBar from "./NavigationBar";

const HeaderComponents = (props) => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark p-3">
          <NavigationBar username = {props.username}/>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponents;
