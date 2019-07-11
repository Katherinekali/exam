import React, { useState, useEffect } from "react";
import { connect } from "dva";

import styles from "./checkTitem.scss";
import { Row, Col, Tag, Select, Button, TreeSelect, Form } from 'antd';

const { Option } = Select;
const { CheckableTag } = Tag;
function CheckTheitem(props) {
  console.log(props)
  // let [value, upvalue] = useState(undefined);
  // // let [treeData, upvalue] = useState([]);
  // let onChange = value => {
  //   console.log(value);
  //   upvalue(value);
  // };
  let editQuestion=(e)=>{
    e.preventDefault()
    props.history.push("/main/addQuestion")
  }
  useEffect(() => {
    props.getData();
    props.getAllLessons();//类型
    props.getAllexamType();//考试类型
    props.getQuestionsType();//题目类型
    props.refer();//条件查询

  }, []);
  let handleSubmit = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        props.refer(values)
        console.log("111111111", values);
      }
    });
  };
  //详情传参
  let detail = (detail) => {
    //console.log(detail)
    // props.history.push({
    //   pathname: `/main/questions/${detail.questions_id}`,
    //   state: {
    //     data: detail
    //   }
    // })
  }
  // // 从Form高阶组件中拿到校验组件
  const { getFieldDecorator } = props.form;
  return (
    <div className={styles.checkTheitemBox}>
      <h2 className={styles.title}>查看试题</h2>
      <div className={styles.anyLayoutContent}>
        <div className={styles.form}>
          <div className={styles.ant_row}>
            <h6 style={{ marginRight: 8, display: "inline-block" }}>
              课程类型:
            </h6>
            <div className={styles.ant_label}>
              <span>All</span>
              {props.allthelessons.map(tag => {
                // console.log(tag.subject_text)
                return (
                  <CheckableTag
                    className={styles.ant_select}
                    key={tag.subject_id}
                    //  checked={selectedTags.indexOf(tag.subject_id) > -1}
                    onChange={checked => this.handleChange(tag.subject_text, checked)}
                  >
                    {tag.subject_text}
                  </CheckableTag>
                )
              })}
            </div>
          </div>
          <Form action="" onSubmit={handleSubmit}>
            <div className={styles.ant_row}>
              <Row style={{ width: "100%", display: "flex" }}>
                <Form.Item style={{ display: "flex" }}>
                  <Col span={9}><label style={{ display: 'inline' }}>考试类型:</label>
                    {getFieldDecorator("exam_id", {
                      initialValue: ""
                    })(<Select style={{ width: 180 }}>
                      {props.allexamtype.map((item, index) => {
                        return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                      })}
                    </Select>
                    )}
                  </Col>
                </Form.Item>
                <Form.Item style={{ display: "flex" }}>
                  <Col span={9}><label style={{ display: 'inline' }}>题目类型:</label>
                    {getFieldDecorator("questions_type_id", {
                      initialValue: ""
                    })(<Select style={{ width: 180 }}>
                      {props.questionsType.map((v, k) => {
                        // console.log(v);
                        return <Option value={v.questions_type_id} key={v.questions_type_id}>{v.questions_type_text}</Option>
                      })}
                    </Select>)
                    }
                  </Col>
                </Form.Item>
                <Form.Item>
                  <Col span={6}>
                    <Button type="primary" htmlType="submit" icon="search" type="primary">
                      查询
                    </Button>
                  </Col>
                </Form.Item>
              </Row>
            </div>
          </Form>
        </div>
      </div>
      <div className={styles.anyLayoutContent}>
        <div className={styles.ant_list}>
          {props.list.map((item, index) => {
            //console.log(item)
            return (
              <div className={styles.ant_list_item} key={index} onClick={() => detail(item)}>
                <div className={styles.ant_list_item_content}>
                  <h4>{item.title}</h4>
                  <div style={{ marginTop: "10px" }}>
                    <div
                      style={{ marginBottom: "10px", display: "flex" }}
                      className={styles.ant_tag_meta}
                    >
                      <div className={styles.ant_tag_blue}>{item.questions_type_text}</div>
                      <div className={styles.ant_tag_geekblue}>{item.subject_text}</div>
                      <div className={styles.ant_tag_orange}>{item.exam_name}</div>
                    </div>
                    <span
                      style={{
                        fontSize: "14px",
                        width: "117px",
                        color: "#0139fD",
                        height: "19px"
                      }}
                    >
                      {item.user_name} 发布
                </span>
                  </div>
                </div>
                <p className={styles.ant_list_item_action}>
                  <div onClick={(e) =>{editQuestion(e)}}>
                    <a href="javascript:;">编辑</a>
                  </div>
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
const mapState = state => {
  return {
    ...state.checkTheItem
  };
};
const mapDispatch = dispatch => {
  return {
    //所有题
    getData: payload => {
      console.log(1)
      dispatch({
        type: "checkTheItem/All",
        payload
      });
    },
    //所有课程
    getAllLessons: payload => {
      dispatch({
        type: "checkTheItem/Lessons",
        payload
      })
    },
    //考试类型
    getAllexamType: payload => {
      dispatch({
        type: "checkTheItem/examtype",
        payload
      })
    },
    //题目类型
    getQuestionsType: payload => {
      dispatch({
        type: "checkTheItem/questionsType",
        payload
      })
    },
    //条件查询 
    refer: payload => {
      //console.log(payload)
      dispatch({
        type: "checkTheItem/conditionquery",
        payload
      })
    }
  };
};
export default connect(
  mapState,
  mapDispatch
)(Form.create()(CheckTheitem));
