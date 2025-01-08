import { EventType } from '@/api/repositories/event_repository';
import { useState } from 'react';

const useAllEventsState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<EventType[]>();

  return {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
  };
};

const useEventState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedEventId, setSelectedEventId] = useState();
  const [data, setData] = useState();

  return {
    loading,
    setLoading,
    error,
    setError,
    selectedEventId,
    setSelectedEventId,
    data,
    setData,
  };
};

export const useEventApiStore = () => {
  return {
    institute: useEventState(),
    allEvents: useAllEventsState(),
  };
};
