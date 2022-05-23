import classNames from 'classnames';
import React from 'react';
import { Route } from 'react-router-dom';

const AppRoute = ({
                      component: Component,
                      layout: Layout,
                      background,
                      ...rest
                  }) => {

    Layout = (Layout === undefined) ? props => (<>{props.children}</>) : Layout;

    const classes= classNames(background && background);

    return (
        <Route
            {...rest}
            render={props => (
                <Layout>
                    <Component {...props} className={classes} />
                </Layout>
            )} />
    );
}

export default AppRoute;