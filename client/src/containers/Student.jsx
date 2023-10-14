import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import StudentInfo from '../components/StudentInfo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Redirect from '../components/Redirect';

const datasheet = process.env.REACT_APP_DATASHEET_LINK;

function Student() {
    const [element, setElement] = useState()
    const [data, setData] = useState()
    useEffect(() => {
        const location = window.location.href.split("/");
        const path = location[location.length - 1];

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
        
        if (path === "itmarathon.uaeu.club" || path === "localhost:3000" || path === "") {
            setElement(
                <BrowserRouter>
                    <Routes>
                        <Route path={path} element={<Redirect Link="https://conferences.uaeu.ac.ae/itm23/en/index.shtml/"/>}/>
                    </Routes>
                </BrowserRouter>
            )
        } else {
            getData();
        }
    }, [])

    useEffect(() => {
        const location = window.location.href.split("/");
        const path = location[location.length - 1];
        
        const dataList = []
        for (let stu in data) {
            dataList.push(data[stu]["Code"])
        }

        const stu = dataList.find((code) => code === path)
        if (path === "itmarathon.uaeu.club" || path === "localhost:3000" || path === "") {
            // do nothing lol
        } else {
            if (stu) {
                const info = data[data.findIndex((row) => row["Code"] === path)]
                console.log(info["Supervisor Name"])
                setElement(<StudentInfo title={info["Title"]} name={info["Name"]} school={info["School"]} team={info["Team"]}supervisor={info["Supervisor Name"]}/>)
            } else if (data === undefined) {
                setElement(
                    <div>
                        <div className='loading'>
                            <h1>Loading...</h1>
                        </div>
                        <div className='Powered'>
                            <p><b>Powered by</b></p>
                            <img src="/cs.png" alt='CS Club'/>
                        </div>
                    </div>
                )
            } else {
                setElement(
                    <div className="not_found">
                        <h1>Student not found</h1>
                        <div className='Powered'>
                            <p><b>Powered by</b></p>
                            <img src="/cs.png" alt='CS Club'/>
                        </div>
                    </div>
                )
            }
        }
    }, [data])

    return ((element)?
        element
        :
        <div>
            <div className='loading'>
                <h1>Loading...</h1>
            </div>
            <div className='Powered'>
                <p><b>Powered by</b></p>
                <img src="/cs.png" alt='CS Club'/>
            </div>
        </div>
    );
}

export default Student;
