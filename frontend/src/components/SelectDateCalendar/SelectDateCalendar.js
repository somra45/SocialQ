import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, {  useRef } from "react";
import './SelectDateCalendar.css'
import { useSelector } from "react-redux";
import { useEffect, useState} from "react";

const SelectDateCalendar = ({showSelect}) => {
    const calendarRef = useRef(null);
    const events = Object.values(useSelector(state => state.tweets.user));
    const [selectionDate, setSelectionDate] = useState(null);
      
    const renderEventContent = (eventInfo) => {
        return (
            <>
            <div className="select-event-div">
                <p>{eventInfo.timeText}</p>
            </div>
            </>
        ) 
    }

    const handleDateClick = (dateClickInfo) => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(dateClickInfo.date)
        if (dateClickInfo.view.type === 'dayGridMonth') {
            calendarApi.changeView('timeGridDay');
            window.alert('Please Select a time on day you chose')
        } else {
            window.selectedDate = dateClickInfo.date
            setSelectionDate(dateClickInfo.date)
        }
    }

    // const handleSelect = ( selectionInfo ) => {
    //     if (selectionInfo.view.type === 'timeGridDay' || selectionInfo.view.type === 'timeGridWeek') {
    //         window.selectedDate = selectionInfo.start
    //         setSelectionDate(window.selectedDate)

    //     }
    // }

    const handleSchedule = (e) => {
        e.preventDefault();
        if (!window.selectedDate) {
            window.alert('Please Select a time before proceeding')
        } else {
            let modal = document.getElementById('modal');
            let parentModal = document.getElementById('new-tweet-modal');
            modal.classList.toggle('calendar-select-hide');
            modal.classList.toggle('calendar-select-modal');
            parentModal.classList.add('modal-hide');
            parentModal.classList.remove('modal-show');
        }
    }

    return (
        <>
        <div id='modal' className={ showSelect ? "calendar-select-modal" : "calendar-select-hide"} >
        <div className="calendar-select-div">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: "prev,today,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                buttonText={{
                    today: "Today",
                    month: "Month",
                    week: "Week",
                    day: "Day",
                    list: "List"
                }}
                eventClassNames={"event-select-div"}
                initialView="dayGridMonth"
                editable={false}
                selectable={false}
                dayMaxEvents={false}
                weekends={true}
                aspectRatio='2.3'
                height='320px'
                handleWindowResize={true}
                events={events}
                eventContent={renderEventContent}
                dateClick={handleDateClick}
                // select={handleSelect}
            />
            <div className="bottom-div">
                <button className='schedule-button' onClick={handleSchedule} >Confirm Time</button>
                {selectionDate && 
                    <p className="current-selection">{`Current Selection: ${selectionDate?.toISOString().replace('-', '/').split('T')[0].replace('-', '/')} ${selectionDate?.getHours()}:${selectionDate?.getMinutes() === 0 ? selectionDate?.getMinutes() + '0' : selectionDate?.getMinutes()}`}</p>
                }
            </div>
        </div>
        </div>
        </>
    )
}

export default SelectDateCalendar;