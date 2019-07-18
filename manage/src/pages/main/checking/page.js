import React from "react"
import "../question/question.css"
import { Route, Redirect } from 'dva/router';
import TestPaper from "./page/testPaper";
import ClassList from "./page/classList";
function Page(){
    return (
        <div>
            <Route path="/main/page/classList" component={ClassList} />
            <Route path="/main/page/testPaper" component={TestPaper} />
            <Redirect to="/main/page/classList" />
        </div>
    )

}
export default Page;