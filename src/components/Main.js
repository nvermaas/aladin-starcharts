
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

    //FetchData()
    FetchUCAC4(false)
    //FetchADEX()

    return (
        <Router basename="aladin-testbed">
            <div>
                <NavigationBar/>

                <Switch>
                    <Route exact path="/">
                        <WelcomePage />
                    </Route>
                    <Route exact path="/exoplanets">
                        <ExoplanetsPage />
                    </Route>
                    <Route exact path="/asteroids">
                        <AsteroidsPage />
                    </Route>
                    <Route exact path="/hips">
                        <HipsPage />
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
                <small> (C) 2023 - Nico Vermaas - version 1.0.0 - 15 jan 2023 - 12:00</small>
            </footer>
        </Router>

    );
}
