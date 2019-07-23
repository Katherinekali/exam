import React from 'react';
import { connect } from 'dva';
import {injectIntl} from 'react-intl';
import { Link } from 'dva/router';
import styles from "./sidebar.scss"
import {Menu, Icon } from 'antd';
const { SubMenu } = Menu;
function Sidebar(props) {
  if(!props.myView.length)return null
  return (
    <div className={styles.slide}>
          <Menu
            style={{width:200}}
            defaultOpenKeys={[props.myView[0].name]}
            defaultSelectedKeys={[props.myView[0].children[0].name]}
            mode="inline"
            theme="dark"
          >
            {
              props.myView.map(item=>{
                return  <SubMenu
                        key={item.name}
                        title={<span>
                            <Icon type="mail" />
                            <span>{props.intl.formatMessage({id:item.name})}</span>
                          </span>
                        }
                      >
                        {
                          item.children.map(value=>{
                            if(!value.name)return;
                            return <Menu.Item key={value.name}><Link to={value.path}>{props.intl.formatMessage({id:value.name})}</Link></Menu.Item>
                          })
                        }
                      </SubMenu> 
              })
            }
          </Menu>
        </div>
  );
}
const mapStateToProps = state => {
  return {
    myView:state.login.myView,
    forbiddenView:state.login.forbiddenView
  };
};
export default injectIntl(connect(mapStateToProps)(Sidebar));
