import React,{useState} from 'react';
import XLSX from 'xlsx';
import {Table} from 'antd';

function Execl(props){
  // 申明表格数据
  let [data, setData] = useState([]);
  let [columns, setColumns] = useState([]);

  // 处理表格上传
  let uploadExcel = e=>{
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, {type: 'array'});

      /* DO SOMETHING WITH workbook HERE */
      // 读取第2张表
      var sheetName = workbook.SheetNames[1];
      var obj = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // 处理表格数据
      setData(obj);

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
    // 2. 生成workBook
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);
    // 3. 导出workBook
    XLSX.writeFile(wb, 'out.xlsb');
  }

  return <div>
    <input type="file" accept="*" placeholder="上传Excel" onChange={uploadExcel}/>
    <button onClick={()=>exportExcel()}>导出excel</button>
    <Table dataSource={data} columns={columns} rowKey="班级"/>;
  </div>
}

export default Execl;
