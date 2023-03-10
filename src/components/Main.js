
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
import React from "react";

import {useGlobalReducer} from "../contexts/GlobalContext";

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
                </Switch>
            </div>
            <footer>
                <small> (C) 2023 - Nico Vermaas - version 1.0.0 - 11 mar 2023</small>
            </footer>
        </Router>

    );
}
