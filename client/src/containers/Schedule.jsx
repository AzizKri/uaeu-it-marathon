import ITEvent from '../components/ITEvent';
import './schedule.css';

function Schedule() {
	return (
		<div>
			<div className="schedule">
				<div className='schedule_main'>
					<div className='schedule_main_title'>
						IT Marathon Program
					</div>
					<div className='schedule_main_events'>
						<ITEvent title='Reception & Registration' info='Reception @ CIT, Male Side' startTime='1699474295' endTime='1699474395' />
						<ITEvent title='Opening Ceremony' info='Auditorium @ CIT, Male Side' startTime='1700114400' endTime='1700116200' />
						<div className='schedule_main_events_shared'>
							<div className='schedule_main_events_shared_long'>
								<ITEvent title='IT showcase & IT4Special Needs @ (Corridor, 1st Floor, Male Side)' info='Programming Contest @ (Programming Labs, 2nd Floor)' startTime='1700116200' endTime='1700134200' />
							</div>
							<div className='schedule_main_events_shared_shorts'>
								<ITEvent title='Workshop / Tutorial' info='Auditorium @ CIT, Male Side' startTime='1700118000' endTime='1700123400' />
								<ITEvent title='Lunch' info='Female side Corridor, 1st Floor' startTime='1700124300' endTime='1700128800' />
								<ITEvent title='Lab Tour' info='Managed by CITA' startTime='1700128800' endTime='1700134200' />
								<ITEvent title='Gaming' info='@ CITA' startTime='1700128800' endTime='1700134200' />
							</div>
						</div>
						<ITEvent title='Closing and Award Ceremony' info='Auditorium @ CIT, Male Side' startTime='1700134200' endTime='1700136000' />
					</div>
				</div>
			</div>
			<div className='Powered'>
				<p><b>Powered by</b></p>
				<img src="/cs.png" alt='CS Club'/>
			</div>
		</div>
	);
}

export default Schedule;