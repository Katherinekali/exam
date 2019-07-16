import React, { useEffect, useState } from "react";
import { connect } from "dva";
import styles from "./checkTitem.scss";
import { Row, Col, Tag, Select, Button, Form } from 'antd';
const { Option } = Select;
const { CheckableTag } = Tag;
function CheckTheitem(props) {
  let [selectedTags, UpselextedTags] = useState([])
  let [checked, Upchecked] = useState(false)
  let [checkeds, Upcheckeds] = useState(false)
  let [id, upId] = useState("")
  let [ind, updateInd] = useState(-1)
  useEffect(() => {
    props.getData();
    props.getAllLessons();//类型
    props.getAllexamType();//考试类型
    props.getQuestionsType();//题目类型
    props.refer();//条件查询
  }, []);
  // 查询    获取select选中的值
  let handleSubmit = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        values.subject_id = id ? id : ""
        props.refer(values)
        console.log("111111111", values);
      }
    });
  };
  //All
  let checkedAll = () => {
    // console.log(123)
    props.getData();
    Upcheckeds(!checkeds)

  }
  //详情传参
  let detail = (detail) => {
    props.detailInfo(detail)
    props.history.push({
      pathname: `/main/questions/${detail.questions_id}`,
      state: {
        data: detail
      }
    })
  }
  //选中状态  subject_id
  let handleChange = (tag, ind) => {
    updateInd(ind)
    Upchecked(!checked)
    const nextSelectedTags = checked ? [tag] : selectedTags.filter(t => t !== tag);
    //console.log('You are interested in: ', nextSelectedTags);
    UpselextedTags(nextSelectedTags)
    upId(tag)
    console.log(selectedTags)
  };
  // // 从Form高阶组件中拿到校验组件
  const { getFieldDecorator } = props.form;
  return (
    <div className={styles.checkTheitemBox}>
      <h2 className={styles.title}>查看试题</h2>
      <div className={styles.anyLayoutContent}>
        <div className={styles.ant_row}>
          <label style={{ display: "inline-block" }}>
            课程类型:
          </label>
          <CheckableTag
            onChange={checkedAll}
            className={checkeds ? "ant_active" : ""}

          >All</CheckableTag>
          {props.allthelessons && props.allthelessons.map((tag, index) => {
            // console.log(tag.subject_text)
            return (
              <CheckableTag
                className={styles.ant_tag}
                key={tag.subject_id}

                checked={index === ind}
                onChange={() => handleChange(tag.subject_id, index)}
              >
                {tag.subject_text}
              </CheckableTag>
            )
          })}
        </div>
        <Form action="" onSubmit={handleSubmit}>
          <div className={styles.ant_row} style={{ marginTop: "40px" }}>
            <Row style={{ width: "100%", display: "flex" }}>
              <Form.Item style={{ display: "flex" }}>
                <Col><label style={{ display: 'inline', marginRight: "10px" }}>考试类型:</label>
                  {getFieldDecorator("exam_id", {
                    initialValue: undefined
                  })(<Select style={{ width: 180 }}>
                    {props.allexamtype && props.allexamtype.map((item, index) => {
                      return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                    })}
                  </Select>
                  )}
                </Col>
              </Form.Item>
              <Form.Item style={{ display: "flex" }}>
                <Col><label style={{ display: 'inline', margin: "0px 10px" }}>题目类型:</label>
                  {getFieldDecorator("questions_type_id", {
                    initialValue: undefined
                  })(<Select style={{ width: 180, margin: "0px 10px" }}>
                    {props.questionsType && props.questionsType.map((v, k) => {
                      // console.log(v);
                      return <Option value={v.questions_type_id} key={v.questions_type_id}>{v.questions_type_text}</Option>
                    })}
                  </Select>)
                  }
                </Col>
              </Form.Item>
              <Form.Item>
                <Col span={8}>
                  <Button type="primary" htmlType="submit" icon="search" style={{ boxSizing: "border-box" }}>
                    查询
                    </Button>
                </Col>
              </Form.Item>
            </Row>
          </div>
        </Form>
      </div>
      <div className={styles.anyLayoutContent}>
        <div className={styles.ant_list}>
          {props.list.map((item, index) => {
            // console.log(item)
            return (
              <div className={styles.ant_list_item} key={index} onClick={() => detail(item)}>
                <div className={styles.ant_list_item_content}>
                  <h4>{item.title}</h4>
                  <div style={{ marginTop: "10px" }}>
                    <div
                      style={{ marginBottom: "10px", display: "flex" }}
                      className={styles.ant_tag_meta}
                    >
                      <Tag color="blue">{item.questions_type_text}</Tag>
                      <Tag color="geekblue">{item.subject_text}</Tag>
                      <Tag color="orange">{item.exam_name}</Tag>
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
                <div className={styles.ant_list_item_action}>
                  <div>
                    <a href={`/#/main/addQuestion?id=${item.questions_id}`}>编辑</a>
                  </div>
                </div>
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
    ...state.checkTheItem,
  };
};
const mapDispatch = dispatch => {
  return {
    //所有题
    getData: payload => {
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
    },
    detailInfo: payload => {
      dispatch({
        type: "checkTheItem/detail",
        payload
      })
    }
  };
};
export default connect(
  mapState,
  mapDispatch
)(Form.create()(CheckTheitem));
