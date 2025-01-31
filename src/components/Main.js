
import '../App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";

import NavigationBar from './NavigationBar';
import WelcomePage from '../pages/WelcomePage';
import FetchUCAC4 from '../services/FetchUCAC4';
import FetchHygData from "../services/FetchHygData";
import StarChartPage from "../pages/starchart/StarChartPage";
import ConfigurationPage from "../pages/configuration/ConfigurationPage";
import React from "react";

export default function Main() {
    const queryParameters = new URLSearchParams(window.location.search)

    FetchUCAC4(false)
    FetchHygData(false)

    return (
        <Router basename="aladin-starcharts">
            <div>
                <NavigationBar/>
                <Switch>
                    <Route exact path="/">
                        <WelcomePage />
                    </Route>
                    <Route exact path="/starchart">
                        <StarChartPage params = {queryParameters}/>
                    </Route>

                    <Route exact path="/configuration">
                        <ConfigurationPage />
                    </Route>

                </Switch>
            </div>
            <footer>
                <small> (C) 2024 - Nico Vermaas - version 28 Dec 2024</small>
            </footer>
        </Router>

    );
}
