import React from 'react';
import CountriesList from "./components/CountriesList";
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CountryDetails from './components/CountryDetails'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/" component={ CountriesList }/>
            <Route exact path="/country/:name" component={ CountryDetails }/>
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

export default App;
