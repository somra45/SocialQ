import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState, useRef } from "react";
import './Calendar.css'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Calendar = () => {
    const history = useHistory();
    const calendarRef = useRef(null);
    const events = Object.values(useSelector(state => state.tweets.user));

    const renderEventContent = (eventInfo) => {
        return (
            <>
                <div className="profile-event-div">
                    <i className="event-box">Tweet</i>
                </div>
            </>
        ) 
    } 

    return (
        <>
        <div className="calendar-div">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                customButtons={{
                    bigCalendar: {
                        text: 'Expand Calendar',
                        click: function() {
                            history.push('/calendar')
                        }
                    }
                }}
                headerToolbar={{
                    left: "prev,today,next",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek,dayGridDay"
                }}
                footerToolbar={{
                    center: "bigCalendar"
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
                
            />
        </div>
     
        </>
    )
}

export default Calendar