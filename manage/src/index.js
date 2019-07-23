import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';
import createLoading from 'dva-loading';
// 1. Initialize
const app = dva(createLoading());

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login').default);
app.model(require('./models/questions/addQuestion').default);
app.model(require('./models/questions/checkTheItem').default);
app.model(require('./models/questions/getQuestionsType').default);
app.model(require('./models/exam/exam').default);
app.model(require('./models/user/showUser').default);
app.model(require('./models/classRoom/grade').default);
app.model(require('./models/classRoom/studentMange').default);
app.model(require("./models/user/userInfo").default)
app.model(require("./models/classRoom/room").default)
app.model(require("./models/checkPapers/index").default)
app.model(require('./models/global/global').default);
app.model(require('./models/login/userInfo').default)
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
