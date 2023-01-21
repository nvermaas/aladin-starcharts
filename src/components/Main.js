
import '../App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import NavigationBar from './NavigationBar';
import WelcomePage from '../pages/WelcomePage';
import AsteroidsPage from '../pages/asteroids/AsteroidsPage';
import ExoplanetsPage from '../pages/exoplanets/ExoplanetsPage';
import HipsPage from '../pages/hips/HipsPage';
import UCAC4Page from '../pages/ucac4/UCAC4Page';
import FetchData from '../services/FetchData';
import FetchUCAC4 from '../services/FetchUCAC4';
import StarChartPage from "../pages/starchart/StarChartPage";

export default function Main() {

    FetchUCAC4(false)

    return (
        <Router basename="aladin-starcharts">
            <div>
                <NavigationBar/>

                <Switch>
                    <Route exact path="/">
                        <WelcomePage />
                    </Route>
                    <Route exact path="/exoplanets">
                        <ExoplanetsPage />
                    </Route>
                    <Route exact path="/ucac4">
                        <UCAC4Page />
                    </Route>
                    <Route exact path="/starchart">
                        <StarChartPage />
                    </Route>
                </Switch>
            </div>
            <footer>
                <small> (C) 2023 - Nico Vermaas - version 1.0.0 - 21 jan 2023 - 16:00</small>
            </footer>
        </Router>

    );
}
