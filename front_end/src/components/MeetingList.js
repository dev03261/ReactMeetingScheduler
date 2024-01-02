import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = () => {
    api.get('meetings/')
      .then(response => setMeetings(response.data))
      .catch(error => console.error('Error fetching meetings', error));
  };

  const addPredefinedMeetings = () => {
    const predefinedMeetings = [
      {
        lead_id: 1,
        emp_id: 2,
        start_date_time: '2023-01-01T10:00:00',
        end_date_time: '2023-01-01T12:00:00',
        agenda: 'Predefined Meeting 1',
        status: '1',
        remarks: 'Some remarks for Meeting 1',
      },
      {
        lead_id: 2,
        emp_id: 3,
        start_date_time: '2023-01-02T14:00:00',
        end_date_time: '2023-01-02T16:00:00',
        agenda: 'Predefined Meeting 2',
        status: '2',
        remarks: 'Some remarks for Meeting 2',
      },
    ];

    api.post('meetings/bulk_create/', predefinedMeetings)
      .then(() => {
        fetchMeetings();
      })
      .catch(error => console.error('Error adding predefined meetings', error));
  };

  return (
    <div>
      <h2>Meeting List</h2>
      <ul>
        {meetings.map(meeting => (
          <li key={meeting.id}>{meeting.agenda} - {meeting.status}</li>
        ))}
      </ul>

      <button type="button" onClick={addPredefinedMeetings}>
        Add Predefined Meetings
      </button>
    </div>
  );
};

export default MeetingList;
