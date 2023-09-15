import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useRef } from "react";
import './Calendar.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";


const Calendar = ({categoryTweets}) => {
    const history = useHistory();
    const calendarRef = useRef(null);
    let events = Object.values(useSelector(state => state.tweets.user));

    if (categoryTweets) {
        events = categoryTweets
    }

    const renderEventContent = (eventInfo) => {
        if (categoryTweets) {
            return (
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
            )
        }
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
                   <a href={`#${eventInfo.event.extendedProps._id}`}><i className="event-box">Tweet</i></a>
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
                        },
                        className: 'big-calendar-button'
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
            />
        </div>
        </>
    )
}

export default Calendar