import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useState, useRef } from "react";
import './Calendar.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteTweet } from "../../store/tweets";

const Calendar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const calendarRef = useRef(null);
    const events = Object.values(useSelector(state => state.tweets.user));

    const deleteEvent = (clickInfo) => {
        dispatch(deleteTweet(clickInfo.event.extendedProps._id));
    };

    const handleEventClick = (clickInfo) => {
        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          clickInfo.event.remove();
          deleteEvent(clickInfo);
        }
      }

    const renderEventContent = (eventInfo) => {
        return (
            <>
            {eventInfo.event._context.options.type === 'timeGrid' ? 
            <>
            <div className="event-title">
                <i style={{
                    whiteSpace: "wrap",
                    overflow: "wrap",
                    textOverflow: "ellipsis"
                }}>{`${eventInfo.event.extendedProps.author.username} ${eventInfo.timeText} ${eventInfo.event.extendedProps.categories[0] ? eventInfo.event.extendedProps.categories[0] : null } tweet: ${eventInfo.event.extendedProps.body}`}
                </i>
            </div>
            </>
            :
            <>
                <div className="profile-event-div">
                    <i className="event-box">Tweet</i>
                </div>
            </>
            } 
            </>
        ) 
    }
    return (
        <>
        <div className="calendar-div">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                customButtons={{
                    bigCalendar: {
                        text: 'Edit Calendar',
                        click: function() {
                            history.push('/calendar')
                        }
                    }
                }}
                headerToolbar={{
                    left: "prev,today,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
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
                eventClassNames={"event-div"}
                initialView="dayGridMonth"
                editable={false}
                selectable={true}
                dayMaxEvents={false}
                weekends={true}
                aspectRatio='1.3'
                height='520px'
                handleWindowResize={true}
                events={events}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                
            />
        </div>
        </>
    )
}

export default Calendar