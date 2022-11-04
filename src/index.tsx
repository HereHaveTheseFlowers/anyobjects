import './styles.sass';
import React from "react";
import  { render } from "react-dom";

type AppProps = { name: string };

const App = ({name}: AppProps) => <h1>Hello, {name}</h1>;

render(<App name={'User'} />, document.getElementById("root"));
