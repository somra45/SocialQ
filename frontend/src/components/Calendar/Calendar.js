import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState, useRef } from "react";
import './Calendar.css'
import { useSelector } from "react-redux";
// import { events } from './events.js'

const Calendar = () => {
    const calendarRef = useRef(null);
    const [currentEvents, setCurrentEvents] = useState([]);
    const events = useSelector(state => state.tweets.user);
    function handleEvents(events) {
        setCurrentEvents(events);
        currentEvents.forEach(event => {
            calendarRef.addEvent(event)
        })
      }
    const renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
            </>
        ) 
    } 



    return (
        <>
        <div className="calendar-div">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: "prev,today,next",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek,dayGridDay"
                }}
                buttonText={{
                    today: "Today",
                    month: "Month",
                    week: "Week",
                    day: "Day",
                    list: "List"
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                dayMaxEvents={false}
                weekends={true}
                aspectRatio='1.3'
                height='520px'
                handleWindowResize={true}
                events={events}
                eventContent={renderEventContent}
                // eventsSet={() => handleEvents(events)}
            />
        </div>
     
        </>
    )
}

export default Calendar