import React from "react"
import "../question/question.css"
import { Route, Redirect,Switch } from 'dva/router';
import TestPaper from "./page/testPaper";
import ClassList from "./page/classList";
function Page(){
    return (
        <div>
           <Switch>
                <Route path="/main/page/classList" component={ClassList} />
                <Route path="/main/page/testPaper" component={TestPaper} />
                <Redirect exact from="/main/page" to="/main/page/classList" />
           </Switch>
        </div>
    )

}
export default Page;