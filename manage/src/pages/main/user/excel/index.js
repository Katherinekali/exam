import React,{useState} from "react"
import {Table} from "antd"
import XLSX from "xlsx"//引入文件
function Excel(){
    let [columns,setColumns]=useState([])
    let [data,setData]=useState([])
    const onChange=(e)=>{
        // var files = e.target.files, f = files[0];
        var reader = new FileReader();   //     var reader = new FileReader();
        reader.onload = function(e) {     //     reader.onload = function(e) {
            var data = new Uint8Array(e.target.result);    //       var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, {type: 'array'});  //       var workbook = XLSX.read(data, {type: 'array'});
            let title=workbook.SheetNames[0]     //       var sheetName = workbook.SheetNames[0];
            var obj = XLSX.utils.sheet_to_json(workbook.Sheets[title]);    //       var obj = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            console.log(obj,"========")
          
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
    return (
        <div>
            <input type="file"  onChange={onChange}/>
            <button onClick={()=>exportExcel()}>导出excel</button>
            <Table columns={columns} dataSource={data} key={"网站工程学院1701A数据积分表"} />
        </div>
    )
}
export default Excel;