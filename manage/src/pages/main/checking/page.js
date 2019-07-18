import React from "react"
import "../question/question.css"
import { Route, Redirect,Switch } from 'dva/router';
import TestPaper from "./page/testPaper";
import ClassList from "./page/classList";
import Detail from "./page/detail"
function Page(){
    return (
        <div>
            <Switch>
            <Route path="/main/page/classList" component={ClassList} />
            <Route path="/main/page/testPaper" component={TestPaper} />
            <Route path="/main/page/detail/:paper_id" component={Detail} />
            <Redirect from="/main/page" exact to="/main/page/classList" />
            </Switch>
        </div>
    )

}
export default Page;