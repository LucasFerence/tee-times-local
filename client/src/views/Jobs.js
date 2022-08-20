import { useState, useEffect } from 'react';
import axios from 'axios';

import { CloseButton, Stack, Group } from '@mantine/core';

export default function Jobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('scheduledJobs')
      .then(res => {
        setJobs(res.data);
      });
  }, []);

  return (
    <Stack sx={(theme) => ({backgroundColor: theme.colors.orange[1]})}>
      {
        jobs.map(jobData => Job(jobData))
      }
    </Stack>
  );
}

function Job(jobData) {
  return (
    <div key={jobData.userId + jobData.courseId + jobData.date}>
      <Group>
        <CloseButton onClick={() => {
          let didConfirm = window.confirm('Delete job?');
          if (didConfirm) {

            axios.post('deleteChronogolfJob', {
              userId: jobData.userId,
              courseId: jobData.courseId,
              date: jobData.date,
            }).then(res => {
              window.location.reload();
            });
          }
        }}/>
        <span>User ID: {jobData.userId}</span>
        <span>Course ID: {jobData.courseId}</span>
        <span>Date: {jobData.date}</span>
      </Group>
    </div>
  );
}
