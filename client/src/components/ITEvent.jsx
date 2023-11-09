import React, { useEffect, useState } from 'react';
import './itevent.css';
const { DateTime, Duration } = require("luxon");

function ITEvent({ title, info, startTime, endTime, customHeight }) {
	const ST = parseInt(startTime * 1000);
	const ET = parseInt(endTime * 1000);
	const stime = DateTime.fromMillis(ST);
	const etime = DateTime.fromMillis(ET);
	const ctime = DateTime.now()
	const [timeLeft, setTimeLeft] = useState(Duration.fromObject({seconds: Math.round((ST - ctime) / 1000)}).rescale());
	const [eventTimeLeft, setEventTimeLeft] = useState(Duration.fromObject({seconds: Math.round((ET - ST) / 1000)}).rescale())

	useEffect(() => {
		const interval = setInterval(() => {
			if (eventTimeLeft > 0) {
				if (timeLeft > 0) {
					setTimeLeft(Duration.fromObject({seconds: Math.round((ST - DateTime.now()) / 1000)}).rescale())
				} else {
					setEventTimeLeft(Duration.fromObject({seconds: Math.round((ET - DateTime.now()) / 1000)}).rescale())
				}
			}
		}, 900)
		return () => clearInterval(interval);
	}, [ET, ST, eventTimeLeft, timeLeft])

	const color = {
		background: (ctime < etime)? (ctime < stime)? 'rgba(18, 57, 74, 0.3)' : 'rgba(58, 167, 76, 0.3)' : 'rgba(179, 50, 50, 0.3)',
		height: customHeight? parseInt(customHeight) : '',
	};
	//													not started			:		started			  :		ended
    return (
		<div className="event" style={color}>
			<div className='event_container'>
				<div className='event_time'>
					<p><b>{stime.toFormat("t")} - {etime.toFormat("t")}</b></p><br />
					{(ctime < etime)? (ctime < stime)?
						<p><b>Starts in:</b> {timeLeft.normalize().toHuman({ listStyle: "long"})}</p>
					:
						<p><b>Ends in:</b> {eventTimeLeft.normalize().toHuman({ listStyle: "long"})}</p>
					:
						<p><b>Ended</b></p>
					}
				</div>
				<div className='h_separator'></div>
				<div className='event_info'>
					<p><b>{title}</b> - {info}</p>
				</div>
			</div>
		</div>
    );
}

export default ITEvent;
