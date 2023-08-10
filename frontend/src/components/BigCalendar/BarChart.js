import { useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2'


const BarChart = ({userTweets}) => {

    const interactions = (tweet) => {
        let interactions = 0;
        if(tweet?.likeCount) interactions = tweet.likeCount
                            + tweet.quoteTweetCount
                            + tweet.replyCount
                            + tweet.retweetCount
                            + tweet.viewCount;
        return interactions;
    }
    const parseISOString = (date) => {
        let b = date.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }

    const basicChartData = userTweets
            .filter(tweet => (new Date()) > (new Date(tweet.date.slice(0,10))))
            .map(tweet => {return {id: tweet._id, interactions: interactions(tweet), date: parseISOString(tweet.date)}})
            .sort((a,b) => a.date - b.date);
            
    const [chartData, setChartData] = useState({
        labels: basicChartData.map((data) => data.date.toISOString().slice(0,10)), 
        // labels: Data.map((data) => data.year), 
        datasets: [
            {
            label: "",
            data: basicChartData.map((data) => data.interactions),
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 1
            }
        ]
    });

    useEffect(() => {
        setChartData({
            labels: basicChartData.map((data) => data.date.toISOString().slice(0,10)), 
            // labels: Data.map((data) => data.year), 
            datasets: [
                {
                label: "",
                data: basicChartData.map((data) => data.interactions),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 1
                }
            ]
        })
    }, [basicChartData.length])

    console.log(chartData)

    const option={
        indexAxis:'y',
        elements:{
          bar:{
            borderWidth:1,
          }
        },
        responsive:true,
        plugins:{
          legend:{
            position:'right'
          },
          title:{
            display:true,
            text:' Horizontal bar chart'
          }
        }
    }



    return (
        <div className="chart-container">
            <Bar
                data={chartData}
                options={{
                maintainAspectRatio: false,
                plugins: {
                    title: {
                    display: true,
                    text: "Tweet Engagement by Interaction Count"
                    },
                    legend: {
                    display: false
                    }
                }
                }}
            />
        </div>
    )
}

export default BarChart;