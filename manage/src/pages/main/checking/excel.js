import React, {useState } from 'react'
import styles from "./excel.css"
import XLSX from "xlsx"
import { Table} from 'antd';
 function Excel(props) {
     let [data,setData]=useState([])
     let [columns, setColumns] = useState([]);
//上传数据：
    let change = e=>{
        //创建一个读取文件的实例：
        var reader = new FileReader();
        //读取完文件之后执行下面的操作：
        reader.onload = function(e) {
            //
          var data = new Uint8Array(e.target.result);
          //
          var workbook = XLSX.read(data, {type: 'array'});
          // 读取第1张表
          var sheetName = workbook.SheetNames[0];
          var obj = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          // 处理表格数据
          setData(obj);
          console.log(obj)
          // 处理表头
          let columns = Object.keys(obj[0]).map(item=>{
            return {
              title: item,
              dataIndex: item
            }
          })
          setColumns(columns);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
      }
// 处理excel导出
    let exportExcel = ()=>{
        // 1. 生成workSheet
        var ws = XLSX.utils.json_to_sheet(data);
        console.log(ws)
        // 2. 生成workBook
        var wb = XLSX.utils.book_new();
        console.log(wb)
        XLSX.utils.book_append_sheet(wb, ws);
        // 3. 导出workBook
        // XLSX.writeFile(wb, 'out.xlsb');
    }
    return (
        <div>
            <div className={styles.top}>
                <input type="file" onChange={change}/>
                <button onClick={()=>exportExcel()}>---导出文件---</button>
            </div>
            <div>
                <Table columns={columns} dataSource={data} rowKey="姓名"/>
            </div>
        </div>
    )
}

export default Excel
