import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import './BigCalendar.css'
import { useSelector } from "react-redux";
import { clearTweetErrors, fetchUserTweets } from "../../store/tweets";
import { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BigCalendar = () => {
    const calendarRef = useRef(null);
    const history = useHistory();
    const events = Object.values(useSelector(state => state.tweets.user));
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userTweets = useSelector(state => Object.values(state.tweets.user))

    const addEventDetails = () => {
        return userTweets.map((tweet) => {
            tweet.title = tweet.author.username
            tweet.start = tweet.date
            return tweet
        })
    }
    const userEvents = addEventDetails();

    useEffect(() => {
      dispatch(fetchUserTweets(currentUser._id));
      return () => dispatch(clearTweetErrors());
    }, [currentUser, dispatch]);
  
    const handleEventChange = (changeInfo) => {
        let changedTweet = userTweets.find(tweet => tweet._id === changeInfo.event.extendedProps._id)
        changedTweet.date = new Date(changeInfo.event.start)
        changeInfo.event.setStart = changedTweet.date
    }

    const renderEventContent = (eventInfo) => {
        return (
            <>
            <div className="event-title">
                <i style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}>
                    {`${eventInfo.event.title} ${eventInfo.timeText}m ${eventInfo.event.extendedProps.categories[0]}`}
                </i>
            </div>
                
            </>
        ) 
    } 
    return (
        <>
        <NavBar />
        <div className="big-calendar-full-div">
            <div className="big-calendar-div">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    customButtons={{
                        profile: {
                            text: 'Back to Profile',
                            click: function() {
                                history.push('/profile')
                            }
                        }
                    }}
                    headerToolbar={{
                        left: "prev,today,next",
                        center: "title",
                        right: "dayGridMonth,dayGridWeek,dayGridDay"
                    }}
                    footerToolbar={{
                        center: "profile"
                    }}
                    buttonText={{
                        today: "Today",
                        month: "Month",
                        week: "Week",
                        day: "Day",
                        list: "List"
                    }}
                    eventClassNames={'event-div'}
                    height='70vh'
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    dayMaxEvents={false}
                    weekends={true}
                    aspectRatio='1.3'
                    handleWindowResize={true}
                    events={userEvents}
                    eventContent={renderEventContent}
                    eventChange={handleEventChange}
            />
            </div>
        </div>
     
        </>
    )
}

export default BigCalendar