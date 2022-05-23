import "@material-tailwind/react/tailwind.css";
import React, {useEffect} from 'react';
import {Switch, useLocation} from 'react-router-dom';
import AppRoute from "./Utils/AppRoute";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import NotFound from "./pages/NotFound";
import Aos from "aos";
import Login from "./pages/Login";
import ClientPanel from "./pages/Clientpanel/ClientPanel";
import AdminPanelLayout from "./layouts/AdminPanelLayout";
import UserPanelLayout from "./layouts/UserPanelLayout";
import EmptyLayout from "./layouts/EmptyLayout"
import Helper from "./Utils/Helper";
import ReactGA from "react-ga4";


const App = () => {
    //get query params from url
    let { search } = useLocation();
    const query = new URLSearchParams(search);

    useEffect(() => {
        Aos.init({duration: 2000}); //https://michalsnik.github.io/aos/
        Helper.loadGoogleRecaptchaScript("recaptcha-key");

        //init Google Analytics v4
        ReactGA.initialize("G-FPZ4110VQ5");
        ReactGA.send("pageview");
    },[]);

  return (
      <Switch>
          <AppRoute exact path="/" component={Home}  layout={DefaultLayout} />
          <AppRoute exact path="/login" component={Login}  layout={EmptyLayout} />
          <AppRoute exact path="/project" component={props => <ClientPanel projectid={query.get("projectid")} />}  layout={UserPanelLayout} />
          <AppRoute exact path="/dashboard" layout={AdminPanelLayout} />
          <AppRoute component={NotFound} />
      </Switch>
  );
}

export default App;
