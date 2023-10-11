import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

function Student() {
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

    return (
        <div className="App">
            <header className="App-header">
                {data && data.length > 0 && (
                <table className="table">
                <thead>
                    <tr>
                    {Object.keys(data[0]).map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                    <tr key={index}>
                        {Object.values(row).map((value, index) => (
                        <td key={index}>{value}</td>
                        ))}
                    </tr>
                    ))}
                </tbody>
                </table>
            )}

            </header>
        </div>
    );
}

export default Student;
