import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, {  useRef } from "react";
import './SelectDateCalendar.css'
import { useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { fetchUserTweets } from "../../store/tweets";
import { clearTweetErrors } from "../../store/tweets";

const SelectDateCalendar = ({showSelect}) => {
    const dispatch = useDispatch();
    const calendarRef = useRef(null);
    const events = Object.values(useSelector(state => state.tweets.user));
    const currentUser = useSelector(state => state.session.user);
    const [selectionDate, setSelectionDate] = useState(null);

    useEffect(() => {
        dispatch(fetchUserTweets(currentUser._id));
        return () => dispatch(clearTweetErrors());
      }, [currentUser, dispatch]);
    
      
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
        }
    }

    const handleSelect = ( selectionInfo ) => {
        if (selectionInfo.view.type === 'timeGridDay') {
            window.selectedDate = selectionInfo.start
            setSelectionDate(selectionInfo.start)
        }
    }

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
                selectable={true}
                dayMaxEvents={false}
                weekends={true}
                aspectRatio='2.3'
                height='320px'
                handleWindowResize={true}
                events={events}
                eventContent={renderEventContent}
                dateClick={handleDateClick}
                select={handleSelect}
            />
            <div className="bottom-div">
                <button className='schedule-button' onClick={handleSchedule} >Confirm Time</button>
                {window.selectedDate && 
                    <p className="current-selection">{`Current Selection: ${selectionDate.getMonth()}/${selectionDate.getDay()} ${selectionDate.getHours()}:${selectionDate.getMinutes() === 0 ? selectionDate.getMinutes() + '0' : selectionDate.getMinutes()}`}</p>
                }
            </div>
        </div>
        </div>
        </>
    )
}

export default SelectDateCalendar;