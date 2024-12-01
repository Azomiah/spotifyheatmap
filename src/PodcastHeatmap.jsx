import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const PodcastListeningHistory = () => {
  const [hoveredDate, setHoveredDate] = useState(null);
  const [podcastData, setPodcastData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpotifyHistory = async () => {
      try {
        setIsLoading(true);

       
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
          headers: {
            'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch Spotify data');

        const rawData = await response.json();

        
        const processedData = {};

        rawData.items.forEach(item => {
          const date = new Date(item.played_at).toISOString().split('T')[0];

          if (!processedData[date]) {
            processedData[date] = {
              count: 0,
              episodes: [],
              totalMinutes: 0
            };
          }

          processedData[date].count++;
          processedData[date].episodes.push({
            name: item.track.name,
            artist: item.track.show.publisher,
            show: item.track.show.name,
            duration_ms: item.track.duration_ms,
            id: item.track.id,
            played_at: item.played_at,
            progress_ms: item.track.duration_ms 
          });

          processedData[date].totalMinutes += item.track.duration_ms / 60000;
        });

        setPodcastData(processedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpotifyHistory();
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getColorIntensity = (count) => {
    const maxCount = 3;
    const intensity = Math.floor((count / maxCount) * 255);
    return `rgb(${30}, ${intensity}, ${30})`; // 
  };

  const renderMonthGrid = (month) => {
    const monthIndex = months.indexOf(month);
    const daysInMonth = new Date(2023, monthIndex + 1, 0).getDate();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `2023-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayData = podcastData[date] || { count: 0, episodes: [], totalMinutes: 0 };

      days.push(
        <div
          key={date}
          className="rounded hover:ring-2 hover:ring-green-500 transition-all duration-200"
          style={{ 
            backgroundColor: getColorIntensity(dayData.count),
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={() => setHoveredDate(date)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          <div className="text-xs text-white">{day}</div>
        </div>
      );
    }

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">{month}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {days}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStats = () => {
    if (!hoveredDate || !podcastData[hoveredDate]) return null;

    const data = podcastData[hoveredDate];
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{hoveredDate} Listening Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Episodes listened: {data.count}</p>
            <p className="text-sm text-gray-600">Total listening time: {Math.round(data.totalMinutes)} minutes</p>
            <div className="space-y-4">
              {data.episodes.map((ep, i) => (
                <div key={i} className="border-l-2 border-green-500 pl-4">
                  <p className="font-medium">{ep.name}</p>
                  <p className="text-sm text-gray-500">{ep.artist} • {ep.show}</p>
                  <p className="text-xs text-gray-400">
                    Duration: {Math.round(ep.duration_ms / 60000)} minutes
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">2023 Podcast Listening History</h1>
      <div className="space-y-6">
        {months.map(renderMonthGrid)}
        {renderStats()}
      </div>
    </div>
  );
};

export default PodcastListeningHistory;