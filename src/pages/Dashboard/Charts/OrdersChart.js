import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts'
import {GetSupersetAccessToken, GetTotalOrders} from "./api";
import Loading from "../../../components/Loading";

const OrdersChart = () => {


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [orders, setOrders] = useState([{
        name: 'orders',
        data: []
    }])

    const [times, setTimes] = useState([])

    useEffect(() => {

        GetSupersetAccessToken().then((res) => {
            GetTotalOrders(res.data.access_token).then((res) => {
                const series = [{
                    name: 'orders'
                }];
                series[0].data = res.data.result[0].data.map((t) => t["COUNT(id)"])
                const xAxis = res.data.result[0].data.map((t) => t["__timestamp"])
                setOrders(series)
                setTimes(xAxis)
                setLoading(false)
                setError(false)
            }).catch(() => {
                setLoading(false)
                setError(true)
            })
        }).catch(() => {
            setLoading(false)
            setError(true)
        })


    }, [])

    const options = {
        chart: {
            height: 350,
            width: "100%",
            type: 'area',

            toolbar: {
                show: false,
            },

            zoom: {
                enabled: false,
                type: 'x',
                autoScaleYaxis: false,
                zoomedArea: {
                    fill: {
                        color: '#90CAF9',
                        opacity: 0.4
                    },
                    stroke: {
                        color: '#0D47A1',
                        opacity: 0.4,
                        width: 1
                    }
                }
            },


            theme: {
                mode: 'dark',
                palette: 'palette1',
                monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'dark',
                    shadeIntensity: 0.65
                },
            }

        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: [...times],
            labels: {
                style: {
                    colors: "#ecececc7"
                },
            },
        },

        yaxis: {

            labels: {
                style: {
                    colors: "#ecececc7"
                },
            },
        },

        tooltip: {
            enabled: true,
            theme: "dark",
            x: {
                format: 'dd/MM/yy'
            },
        },

    };

    const content = () => {
        if (loading) {
            return <div className="primary-bg d-flex justify-content-center align-items-center" style={{width: "100%", height: "27vh", borderRadius: "7px"}}><Loading/></div>
        }
        if (error) {
            return <div className="text-danger primary-bg d-flex justify-content-center align-items-center" style={{width: "100%", height: "27vh", borderRadius: "7px"}}>Server Error</div>
        } else return <Chart options={options} series={orders} type="area" />
    }


    return (
        content()
    );
};

export default OrdersChart;