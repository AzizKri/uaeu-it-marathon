import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentInfo from './StudentInfo';

function Student() {
    const [element, setElement] = useState()
    const [data, setData] = useState()
    useEffect(() => {
        const header = {
            "Content-Type": "blob"
        }
        const getData = async () => {
            const url = 'https://files.uaeu.club/itmarathon/data/students.xlsx';
            const response = await fetch(url, header);
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

    console.log(data)
    const location = window.location.href.split("/");
    let path = location[location.length - 1].toLowerCase();

    const dataList = []
    for (let stu in data) {
        dataList.push(data[stu]["Data"])
    }

    console.log(dataList)

    useEffect(() => {
        if (dataList[path]) {
            setElement(<StudentInfo name={}/>)
        }
    })

    return ((element)?
        <BrowserRouter>
            <Routes>
                <Route path={path} element={element}/>
            </Routes>
        </BrowserRouter>
        :
        <div className='loading'>
        <h1>Loading...</h1>
        </div>
    );
}

export default Student;
