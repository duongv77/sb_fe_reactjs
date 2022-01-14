import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import API from "../../../../api/api"
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

function DoanhThu() {
    const [revenueYear, setRevenueYear] = useState([])

    const callApiRevenueYear = async () => {
        try {
            const url = "/api/v2/supper_admin/doanh-thu-nam"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setRevenueYear(data)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callApiRevenueYear()
    }, [])

    const revenue = (month) => {
        const value = revenueYear.filter(elm=>{return elm.month==month})[0]
        if(value !== undefined){
            return revenueYear.filter(elm=>{return elm.month==month})[0].revenue
        }else{
            return 0
        }
    }

    const quantity = (month) => {
        const value = revenueYear.filter(elm=>{return elm.month==month})[0]
        if(value !== undefined){
            return revenueYear.filter(elm=>{return elm.month==month})[0].quantity
        }else{
            return 0
        }
    }

    const data = [
        {
            "name": "Tháng 1",
            "Doanh thu":revenue(1),
            "Don hang": quantity(1),
            "amt": 11
        },
        {
            "name": "Tháng 2",
            "Doanh thu":revenue(2),
            "Don hang": quantity(2),
            "amt": 11
        },
        {
            "name": "Tháng 3",
            "Doanh thu":revenue(3),
            "Don hang": quantity(3),
            "amt": 11
        },
        {
            "name": "Tháng 4",
            "Doanh thu":revenue(4),
            "Don hang": quantity(4),
            "amt": 11
        },
        {
            "name": "Tháng 5",
            "Doanh thu":revenue(5),
            "Don hang": quantity(5),
            "amt": 11
        },
        {
            "name": "Tháng 6",
            "Doanh thu":revenue(6),
            "Don hang": quantity(6),
            "amt": 11
        },
        {
            "name": "Tháng 7",
            "Doanh thu":revenue(7),
            "Don hang": quantity(7),
            "amt": 11
        },
        {
            "name": "Tháng 8",
            "Doanh thu":revenue(8),
            "Don hang": quantity(8),
            "amt": 11
        },
        {
            "name": "Tháng 9",
            "Doanh thu":revenue(9),
            "Don hang": quantity(9),
            "amt": 11
        },
        {
            "name": "Tháng 10",
            "Doanh thu":revenue(10),
            "Don hang": quantity(10),
            "amt": 11
        },
        {
            "name": "Tháng 11",
            "Doanh thu":revenue(11),
            "Don hang": quantity(11),
            "amt": 11
        },
        {
            "name": "Tháng 12",
            "Doanh thu":revenue(12),
            "Don hang": quantity(12),
            "amt": 11
        }
    ]

    return (
        <div>
            <div className="custom-center">
                <AreaChart width={800} height={300} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="Doanh thu" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="Don hang" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </div>
            <div className="row custom-center">
                <label>Doanh thu năm 2021</label>
            </div>
        </div>
    )
}

export default DoanhThu;