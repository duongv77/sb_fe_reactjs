import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import API from "../../../../api/api"
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    Legend
} from "recharts";

function DoanhThu() {
    var today = new Date();
    const date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    const [revenueYear, setRevenueYear] = useState([])
    const [selectedDay] = useState(new Date())
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    const onChangeProductRateBadDate = async (e) => {
        const { value } = e.target
        console.log(value)
        try {
            const url = "/api/v2/supper_admin/report/doanh-thu-nam" + "?monthYear=" + value
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setRevenueYear(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const callApiRevenueYear = async () => {
        try {
            const url = "/api/v2/supper_admin/report/doanh-thu-nam"
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
        const value = revenueYear.filter(elm => { return elm.month == month })[0]
        if (value !== undefined) {
            return revenueYear.filter(elm => { return elm.month == month })[0].revenue
        } else {
            return 0
        }
    }

    const quantity = (month) => {
        const value = revenueYear.filter(elm => { return elm.month == month })[0]
        if (value !== undefined) {
            return revenueYear.filter(elm => { return elm.month == month })[0].quantity
        } else {
            return 0
        }
    }

    const data = [

    ]

    return (
        <div>
            <div class="panel-heading">
                <h2 className="panel-title">Thống kê doanh thu:</h2>
                <ol className="breadcrumb">
                    <li><NavLink to="/admin">Trang chủ</NavLink></li>
                    <li><NavLink to="/admin/report/product">Thống kê</NavLink></li>
                </ol>
            </div>
            <div className="col-sm-12" style={{ marginTop: "50px" }}>
                <div className="custom-center">
                    <BarChart
                        width={1200}
                        height={500}
                        data={revenueYear}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 50,
                            bottom: 5
                        }}
                        barSize={20}
                    >
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
                    </BarChart>
                </div>
                <div className="text-center">
                    <label>Doanh thu năm</label>
                </div>
                <div className="custom-center">
                    <span style={{ marginTop: "5px", marginRight: "4px" }}>Năm: </span>
                    <input type="date" className="custom-select" defaultValue={date} onChange={onChangeProductRateBadDate} />
                </div>

            </div>
        </div>
    )
}


export default DoanhThu;