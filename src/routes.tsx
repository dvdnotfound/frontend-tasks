import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Landing from './pages/Landing';
import TasksMap from './pages/TasksMap';
import CreateTask from './pages/CreateTask';
import Task from './pages/Task';


function Routes() {
    return (

        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={TasksMap} />
                <Route path="/tasks/create" component={CreateTask} />
                <Route path="/tasks/:id" component={Task} />

            </Switch>

        </BrowserRouter>
    );
}

export default Routes;