import { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector } from "recharts";
import 'react-day-picker/lib/style.css';
import { NavLink } from "react-router-dom";
import API from "../../../../api/api";
import { toast } from "react-toastify";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`SL: ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


function ProductReport(props) {
    var today = new Date();
    const date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    const [quantityProductToCategory, setQuantityProductToCategory] = useState([])
    const [top10ProductFavorite, setTop10ProductFavorite] = useState([])
    const [top10ProductRateGood, setTop10ProductRateGood] = useState([])
    const [top10ProductSelling, setTop10ProductSelling] = useState([])
    const [top10ProductRateBad, setTop10ProductRateBad] = useState([])


    const [selectedDay] = useState(new Date())
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );



    // call api start load pagess
    const callApiTop10ProductSellingALot = async () => {
        try {
            const url = "/api/v2/supper_admin/report/report-selling/top10-product-a-lot"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setTop10ProductSelling(data)
                console.log(data);
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiQuantityProductToCate = async () => {
        try {
            const url = "/api/v2/supper_admin/report/report-quantity/product-category"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setQuantityProductToCategory(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiTop10ProductFavorite = async () => {
        try {
            const url = "/api/v2/supper_admin/report/report-favorite/top10-product"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setTop10ProductFavorite(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiTop10ProductRateGood = async () => {
        try {
            const url = "/api/v2/supper_admin/report/report-rate/top10-product"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setTop10ProductRateGood(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const callApiTop10ProductRateBad = async () => {
        try {
            const url = "/api/v2/supper_admin/report/report-rate/top10-product-bad"
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setTop10ProductRateBad(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        callApiQuantityProductToCate()
        callApiTop10ProductFavorite()
        callApiTop10ProductRateGood()
        callApiTop10ProductSellingALot()
        callApiTop10ProductRateBad()
    }, [])

    const onChangeProductFavoriteDate = async (e) => {
        const { value } = e.target
        console.log(value);
        try {
            const url = "/api/v2/supper_admin/report/report-favorite/top10-product" + "?monthYear=" + value
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setTop10ProductFavorite(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }


    }
    const onChangeProductRateGoodDate = async (e) => {
        const { value } = e.target
        console.log(value)
        try {
            const url = "/api/v2/supper_admin/report/report-rate/top10-product" + "?monthYear=" + value
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setTop10ProductRateGood(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onChangeProductSellingDate = async (e) => {
        const { value } = e.target
        // console.log(value)
        try {
            const url = "/api/v2/supper_admin/report/report-selling/top10-product-a-lot" + "?monthYear=" + value
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setTop10ProductSelling(data)
                console.log(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onChangeProductRateBadDate = async (e) => {
        const { value } = e.target
        console.log(value)
        try {
            const url = "/api/v2/supper_admin/report/report-rate/top10-product-bad" + "?monthYear=" + value
            const response = await API.getAdmin(url)
            const { data, messageCode, messageName } = response
            if (messageCode == 200) {
                setTop10ProductRateBad(data)
            } else {
                toast.error(messageName);
            }
        } catch (error) {
            console.log(error)
        }


    }
    return (
        <div className="panel">
            <div class="panel-heading">
                <h2 className="panel-title">Thống kê sản phẩm:</h2>
                <ol className="breadcrumb">
                    <li><NavLink to="/admin">Trang chủ</NavLink></li>
                    <li><NavLink to="/admin/report/product">Thống kê</NavLink></li>
                </ol>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="custom-center">
                            <PieChart width={600} height={600}>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={quantityProductToCategory}
                                    cx={300}
                                    cy={300}
                                    innerRadius={100}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                />
                            </PieChart>
                        </div>
                        <div className="text-center">
                            <label>Số lượng sách của từng thể loại</label>
                        </div>
                    </div>
                    <div className="col-sm-6" style={{ marginTop: "100px" }}>
                        <div className="custom-center">
                            <BarChart
                                width={800}
                                height={300}
                                data={top10ProductFavorite}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
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
                            <label>Sản phẩm được yêu thích</label>
                        </div>
                        <div className="custom-center">
                            <span style={{ marginTop: "5px", marginRight: "4px" }}>Tháng: </span>
                            <input type="date" className="custom-select" defaultValue={date} onChange={onChangeProductFavoriteDate} />
                        </div>

                    </div>
                    <div className="col-sm-6" style={{ marginTop: "100px" }}>
                        <div className="custom-center">
                            <BarChart
                                width={800}
                                height={300}
                                data={top10ProductRateGood}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
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
                            <label>Sản phẩm được đánh giá tốt</label>
                        </div>
                        <div className="custom-center">
                            <span style={{ marginTop: "5px", marginRight: "4px" }}>Tháng: </span>
                            <input type="date" className="custom-select" defaultValue={date} onChange={onChangeProductRateGoodDate} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6" style={{ marginTop: "50px" }}>
                        <div className="custom-center">
                            <BarChart
                                width={800}
                                height={300}
                                data={top10ProductSelling}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                                barSize={20}
                            >
                                <XAxis dataKey="name" padding={{ left: 10, right: 10 }} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
                            </BarChart>
                        </div>
                        <div className="text-center">
                            <label>Sản phẩm bán nhiều nhất</label>
                        </div>
                        <div className="custom-center">
                            <span style={{ marginTop: "5px", marginRight: "4px" }}>Tháng: </span>
                            <input type="date" className="custom-select" defaultValue={date} onChange={onChangeProductSellingDate} />
                        </div>
                    </div>
                    <div className="col-sm-6" style={{ marginTop: "50px" }}>
                        <div className="custom-center">
                            <BarChart
                                width={800}
                                height={300}
                                data={top10ProductRateBad}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
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
                            <label>Sản phẩm bị đánh giá xấu</label>
                        </div>
                        <div className="custom-center">
                            <span style={{ marginTop: "5px", marginRight: "4px" }}>Tháng: </span>
                            <input type="date" className="custom-select" defaultValue={date} onChange={onChangeProductRateBadDate} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductReport;
