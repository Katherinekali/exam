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
app.model(require('./models/addQuestion').default);
app.model(require('./models/checkTheItem').default);
app.model(require('./models/getQuestionsType').default);
app.model(require('./models/showUser').default);
app.model(require('./models/classRoom/grade').default);
// app.model(require('./models/questions').default)
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
