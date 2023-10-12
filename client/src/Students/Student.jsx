import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import StudentInfo from './StudentInfo';

const datasheet = process.env.REACT_APP_DATASHEET_LINK;

function Student() {
    const [element, setElement] = useState()
    const [data, setData] = useState()
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(datasheet);
            const data = await response.blob()
            const reader = new FileReader();
            reader.readAsBinaryString(data)
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, {type: 'binary'})
                const sheetname = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetname]
                const parsedData = XLSX.utils.sheet_to_json(sheet);
                setData(parsedData)
            }
        }
        getData();
    }, [])

    useEffect(() => {
        const location = window.location.href.split("/");
        const path = location[location.length - 1];
        
        const dataList = []
        for (let stu in data) {
            dataList.push(data[stu]["Code"])
        }

        const stu = dataList.find((code) => code === path)
        if (stu) {
            const info = data[data.findIndex((row) => row["Code"] === path)]
            setElement(<StudentInfo title={info["Title"]} name={info["Name"]} school={info["School"]} team={info["Team"]}supervisor={info["Supervisor"]}/>)
        }
    }, [data])

    return ((element)?
        element
        :
        <div className='loading'>
        <h1>Loading...</h1>
        </div>
    );
}

export default Student;
