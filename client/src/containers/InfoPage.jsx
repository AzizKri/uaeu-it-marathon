import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Loading, NotFound, Redirect, StudentInfo, TeamInfo } from '../components';

const studentDatasheet = process.env.REACT_APP_STUDENT_DATASHEET_LINK;
const teamDatasheet = process.env.REACT_APP_TEAM_DATASHEET_LINK;

function InfoPage() {
    const [element, setElement] = useState()
    const [data, setData] = useState()
    useEffect(() => {
        const location = window.location.href.split("/");
        const path = location[location.length - 1];

        const getData = async (sheet) => {
            const response = await fetch(sheet);
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
        } else if (location[3] === "team") {
			getData(teamDatasheet);
		} else {
            getData(studentDatasheet);
        }
    }, [])

    useEffect(() => {
        const location = window.location.href.split("/");
		const path = location[location.length - 1];

		const dataList = []
		for (let stu in data) {
			dataList.push(data[stu]["Code"])
		}

		
		if (path === "itmarathon.uaeu.club" || path === "localhost:3000" || path === "") {
			// do nothing
		} else if (location[3] === "team") {
			const team = dataList.find((code) => code === path)
			if (team) {
				const info = data[data.findIndex((row) => row["Code"] === path)]
				setElement(<TeamInfo team_id={info["ID"]} team={info["Team"]} school={info["School"]} supervisor={info["Supervisor"]} students={[info["Student1"], info["Student2"], info["Student3"], info["Student4"]]}/>)
			} else if (data === undefined) {
				setElement(<Loading />)
			} else {
				setElement(<NotFound type={"Team"} />)
			}
		} else {
			const stu = dataList.find((code) => code === path)
			if (stu) {
				const info = data[data.findIndex((row) => row["Code"] === path)]
				setElement(<StudentInfo title={info["Title"]} name={info["Name"]} school={info["School"]} team={info["Team Name"]} supervisor={info["Supervisor Name"]}/>)
			} else if (data === undefined) {
				setElement(<Loading />)
			} else {
				setElement(<NotFound type={"Student"} />)
			}
		}
    }, [data])

    return ((element)?
        element
        :
		<Loading />
    );
}

export default InfoPage;
