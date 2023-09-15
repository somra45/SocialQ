import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, {  useRef } from "react";
import './SelectEditDateCalendar.css'
import { useSelector } from "react-redux";
import { useState} from "react";

const SelectEditDateCalendar = ({showModal, setShowModal}) => {
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

        if (Date.now() < dateClickInfo.date) {
            calendarApi.gotoDate(dateClickInfo.date)
            if (dateClickInfo.view.type === 'dayGridMonth') {
                calendarApi.changeView('timeGridDay');
                window.alert('Please Select a time on day you chose')
            } else {
                window.selectedUpdatedDate = dateClickInfo.date
                setSelectionDate(dateClickInfo.date)
            }
        } else {
            window.alert('Please select a date and time that is in the future')
        }
    }

    const handleSchedule = (e) => {
        e.preventDefault();
            let modal = document.getElementById('modal');
            modal.classList.add('calendar-update-select-hide');
            modal.classList.remove('calendar-update-select-modal');
            setShowModal(true)
    }

    return (
        <>
        <div id='modal' className="calendar-update-select-hide" >
        <div className="calendar-update-select-div">
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
                initialDate={new Date()}
                editable={false}
                selectable={false}
                dayMaxEvents={false}
                weekends={true}
                aspectRatio='3.3'
                height='320px'
                handleWindowResize={true}
                events={events}
                eventContent={renderEventContent}
                dateClick={handleDateClick}
            />
            <div className="bottom-update-div">
                <button className='schedule-update-button' onClick={handleSchedule} >Confirm Time</button>
                {window.selectedUpdatedDate === selectionDate && 
                    <p className="current-selection">{`Current Selection: ${selectionDate?.toISOString().replace('-', '/').split('T')[0].replace('-', '/')} ${selectionDate?.getHours()}:${selectionDate?.getMinutes() === 0 ? selectionDate?.getMinutes() + '0' : selectionDate?.getMinutes()}`}</p>
                }
            </div>
        </div>
        </div>
        </>
    )
}

export default SelectEditDateCalendar;