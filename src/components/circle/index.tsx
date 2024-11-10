import data from "../module/data"

import { useEffect, useState } from "react"



interface Circle {
    setPageCount?: (id: number) => void
    pageCount?: number
}


export default function Circle({ pageCount, setPageCount }: Circle) {
    const [current, setCurrent] = useState<any>(data[0])
    const [date, setDate] = useState({ startDate: current.startDate, endDate: current.endDate })


    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate((prevDate) => {
                const newStartDate = prevDate.startDate < current.startDate ? prevDate.startDate + 1 :
                    prevDate.startDate > current.startDate ? prevDate.startDate - 1 : prevDate.startDate;

                const newEndDate = prevDate.endDate < current.endDate ? prevDate.endDate + 1 :
                    prevDate.endDate > current.endDate ? prevDate.endDate - 1 : prevDate.endDate;

                if (newStartDate === current.startDate && newEndDate === current.endDate) {
                    clearInterval(intervalId);
                }

                return { startDate: newStartDate, endDate: newEndDate };
            });
        }, 20)

        return () => clearInterval(intervalId)
    }, [current])


    useEffect(() => {
        const title = document.getElementById("currentId");

        if (!title) return
        title.style.transform = "scale(0)";

        const clear = setTimeout(() => {
            title.style.transform = "scale(1)";
        }, 400);

        return () => {
            clearTimeout(clear);
            if (title) {
                title.style.transform = "scale(0)";
            }
        };
    }, [current]);



    useEffect(() => {
        setCurrent(() => data.find(item => item.id === pageCount))
    }, [pageCount])

    const handleCurrent = (item: any) => {
        setCurrent(item)
        if (setPageCount) {
            setPageCount(item.id);
        }
    }



    return (


        <>
            <div className="textOuter_media">
                <h4 className="startDate">{date.startDate}    <span className="endDate">{date.endDate}</span></h4>
            </div>

            <div className="catBox">




                <div className="circleOuter">
                    <div style={{ transform: `rotate(${current.deg}deg)` }} className="circle">
                        {data.map(item =>
                            <div key={item.id} onClick={() => handleCurrent(item)} className={`circleInner ${current.id === item.id && `current${current.deg}`} ${"deg" + current.deg}`}>{item.id}</div>
                        )}


                    </div>
                    <p id="currentId" className="text">{current.title}</p>
                </div>



                <div className="textOuter">
                    <h4 className="startDate">{date.startDate}    <span className="endDate">{date.endDate}</span></h4>
                </div>




            </div>
        </>

    )
}
