import React,{useState} from 'react'
import styles from "./question.scss"
import {connect} from "dva"
import { Tag } from 'antd';
const { CheckableTag } = Tag;
function  WatchQuestion () {
    const tagsFromServer =JSON.parse(sessionStorage.getItem("subjectType"))
    let [selectedTags,setSelectedTags]=useState([])
    let handleChange=(tag, checked)=> {
        const nextSelectedTags = checked ?tag: selectedTags.filter(t => t !== tag);
        // let nextSelectedTags= tagsFromServer.map(item=>{
        //     if(item.subject_text===tag){
        //         console.log(checked)
        //         item.checked=!item.checked
        //         return item
        //     }
        // })
        setSelectedTags(nextSelectedTags)
        console.log('hhhhh',selectedTags)
      }
    return (
        <div>
            <h2 style={{padding:20}}>查看试题</h2>
            <div>
                <div className={styles.watch_content}>
                    <div>
                        <h6 style={{ marginRight: 8, display: 'inline' }}>课程选择:</h6>
                        <span></span>
                        <CheckableTag
                            style={{margin:10}}
                            checked={true}
                           
                        >
                        All
                        </CheckableTag>
                        {tagsFromServer.map(tag => (
                        <CheckableTag
                            key={tag.subject_id}
                            checked={selectedTags.indexOf(tag.subject_text) > -1}
                            onChange={checked =>handleChange(tag.subject_text, checked)}
                            style={{margin:10}}
                        >
                            {tag.subject_text}
                        </CheckableTag>
                        ))}
                    </div>
                </div>
                <div className={styles.watch_content}>

                </div>
            </div>
        </div>
    )
}
const mapStateToProps=(state)=>{
    return {

    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
       getSubjectType(){
           dispatch({
               type:"watch/allType",
           })
       }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WatchQuestion)