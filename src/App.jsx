import React, { useState } from 'react';

const PodcastHeatmap = () => {
  const [hoveredDate, setHoveredDate] = useState(null);

  const podcastDatabase = [
    // Health & Science
    {
      name: "Huberman Lab",
      episodes: [
        { title: "The Science of Sleep", duration: 135, description: "Sleep optimization strategies" },
        { title: "Neuroplasticity Fundamentals", duration: 145, description: "How to rewire your brain" },
        { title: "Dopamine & Motivation", duration: 125, description: "Understanding motivation" }
      ]
    },
    {
      name: "The Peter Attia Drive",
      episodes: [
        { title: "Longevity Deep Dive", duration: 180, description: "Comprehensive look at longevity" },
        { title: "Zone 2 Training", duration: 165, description: "Optimal cardio methods" },
        { title: "Cancer Prevention", duration: 155, description: "Latest in prevention research" }
      ]
    },
    {
      name: "Found My Fitness",
      episodes: [
        { title: "Heat & Cold Exposure", duration: 120, description: "Benefits of temperature extremes" },
        { title: "Time-Restricted Eating", duration: 110, description: "Optimal eating windows" },
        { title: "Sulforaphane Research", duration: 125, description: "Benefits of broccoli sprouts" }
      ]
    },
    // Technology
    {
      name: "Lex Fridman Podcast",
      episodes: [
        { title: "AI and Consciousness", duration: 180, description: "Deep dive into AI consciousness" },
        { title: "Future of Space Travel", duration: 190, description: "Space exploration technology" },
        { title: "Programming Languages", duration: 170, description: "Evolution of coding" }
      ]
    },
    {
      name: "Darknet Diaries",
      episodes: [
        { title: "The Xbox Underground", duration: 90, description: "Gaming console hacking" },
        { title: "The Whistleblower", duration: 85, description: "Corporate security breach" },
        { title: "The Ransomware Gang", duration: 95, description: "Cybercrime investigation" }
      ]
    },
    // Business & Finance
    {
      name: "All-In Podcast",
      episodes: [
        { title: "Startup Ecosystem", duration: 120, description: "State of venture capital" },
        { title: "AI Revolution", duration: 125, description: "Impact on industries" },
        { title: "Market Analysis", duration: 115, description: "Economic trends" }
      ]
    },
    {
      name: "Masters of Scale",
      episodes: [
        { title: "Building Network Effects", duration: 75, description: "Growth strategies" },
        { title: "Culture at Scale", duration: 80, description: "Managing company culture" },
        { title: "Blitzscaling", duration: 85, description: "Rapid scaling tactics" }
      ]
    },
    // True Crime
    {
      name: "Serial",
      episodes: [
        { title: "The Alibi", duration: 55, description: "Case investigation part 1" },
        { title: "The Break", duration: 60, description: "Case investigation part 2" },
        { title: "The Resolution", duration: 65, description: "Case conclusion" }
      ]
    },
    {
      name: "Crime Junkie",
      episodes: [
        { title: "Missing Person Case", duration: 65, description: "Recent disappearance" },
        { title: "Cold Case Files", duration: 70, description: "Unsolved mysteries" },
        { title: "True Crime Analysis", duration: 60, description: "Expert investigation" }
      ]
    },
    // Science
    {
      name: "Radiolab",
      episodes: [
        { title: "Quantum Reality", duration: 85, description: "Physics exploration" },
        { title: "Evolution Story", duration: 90, description: "Natural selection" },
        { title: "Memory Science", duration: 80, description: "How memories form" }
      ]
    },
    // History
    {
      name: "Hardcore History",
      episodes: [
        { title: "Celtic Holocaust", duration: 240, description: "Ancient warfare" },
        { title: "Blueprint for Armageddon", duration: 260, description: "World War I" },
        { title: "Supernova in the East", duration: 250, description: "Pacific War" }
      ]
    },
    // Health & Fitness
    {
      name: "Mind Pump",
      episodes: [
        { title: "Muscle Building 101", duration: 95, description: "Hypertrophy basics" },
        { title: "Fat Loss Myths", duration: 90, description: "Truth about weight loss" },
        { title: "Recovery Methods", duration: 85, description: "Optimal recovery" }
      ]
    },
    // Meditation
    {
      name: "Ten Percent Happier",
      episodes: [
        { title: "Meditation Basics", duration: 45, description: "Starting meditation" },
        { title: "Anxiety Management", duration: 50, description: "Stress reduction" },
        { title: "Sleep Meditation", duration: 40, description: "Better rest" }
      ]
    },
    // Comedy
    {
      name: "Monday Morning Podcast",
      episodes: [
        { title: "Comedy Hour", duration: 70, description: "Stand-up highlights" },
        { title: "Sports Talk", duration: 75, description: "Game commentary" },
        { title: "Life Stories", duration: 65, description: "Personal anecdotes" }
      ]
    },
    {
      name: "2 Bears 1 Cave",
      episodes: [
        { title: "Comedy Special", duration: 85, description: "Stand-up discussion" },
        { title: "Guest Comedian", duration: 90, description: "Interview session" },
        { title: "Story Time", duration: 80, description: "Funny experiences" }
      ]
    },
    // Finance
    {
      name: "We Study Billionaires",
      episodes: [
        { title: "Investment Strategy", duration: 110, description: "Stock market analysis" },
        { title: "Bitcoin Deep Dive", duration: 115, description: "Crypto insights" },
        { title: "Real Estate Investing", duration: 105, description: "Property markets" }
      ]
    },
    // Productivity
    {
      name: "Deep Questions",
      episodes: [
        { title: "Time Management", duration: 75, description: "Productivity systems" },
        { title: "Deep Work", duration: 80, description: "Focus strategies" },
        { title: "Digital Minimalism", duration: 70, description: "Tech balance" }
      ]
    },
    // Psychology
    {
      name: "Hidden Brain",
      episodes: [
        { title: "Decision Making", duration: 65, description: "Cognitive biases" },
        { title: "Social Psychology", duration: 70, description: "Group behavior" },
        { title: "Happiness Research", duration: 60, description: "Well-being science" }
      ]
    },
    // Technology News
    {
      name: "Accidental Tech Podcast",
      episodes: [
        { title: "Apple Event", duration: 95, description: "Product analysis" },
        { title: "Tech News", duration: 100, description: "Weekly roundup" },
        { title: "Developer Talk", duration: 90, description: "Coding discussion" }
      ]
    },
    // Science
    {
      name: "Science Friday",
      episodes: [
        { title: "Space News", duration: 55, description: "Astronomy updates" },
        { title: "Climate Science", duration: 60, description: "Environmental research" },
        { title: "Biology Today", duration: 50, description: "Latest discoveries" }
      ]
    },
    // Medicine
    {
      name: "JAMA Clinical Reviews",
      episodes: [
        { title: "COVID Research", duration: 45, description: "Latest findings" },
        { title: "Clinical Trials", duration: 50, description: "New treatments" },
        { title: "Medical Updates", duration: 40, description: "Practice guidelines" }
      ]
    },
    // Business
    {
      name: "How I Built This",
      episodes: [
        { title: "Startup Story", duration: 85, description: "Entrepreneur journey" },
        { title: "Company Growth", duration: 90, description: "Scaling challenges" },
        { title: "Business Lessons", duration: 80, description: "Key insights" }
      ]
    },
    // Philosophy
    {
      name: "Philosophize This",
      episodes: [
        { title: "Ancient Philosophy", duration: 65, description: "Greek thinkers" },
        { title: "Modern Philosophy", duration: 70, description: "Contemporary ideas" },
        { title: "Ethics Discussion", duration: 60, description: "Moral philosophy" }
      ]
    },
    // Sports
    {
      name: "The Athletic",
      episodes: [
        { title: "Game Analysis", duration: 75, description: "Match breakdown" },
        { title: "Player Profiles", duration: 80, description: "Athlete stories" },
        { title: "League Updates", duration: 70, description: "Sports news" }
      ]
    },
    // History
    {
      name: "Revolutions",
      episodes: [
        { title: "French Revolution", duration: 95, description: "Historical events" },
        { title: "American Revolution", duration: 100, description: "Independence story" },
        { title: "Russian Revolution", duration: 90, description: "Soviet beginning" }
      ]
    },
    // Nutrition
    {
      name: "High Intensity Health",
      episodes: [
        { title: "Nutrition Science", duration: 85, description: "Diet research" },
        { title: "Supplement Guide", duration: 90, description: "Optimal supplementation" },
        { title: "Metabolic Health", duration: 80, description: "Energy systems" }
      ]
    },
    // Language Learning
    {
      name: "Language Transfer",
      episodes: [
        { title: "Spanish Basics", duration: 45, description: "Language fundamentals" },
        { title: "Grammar Guide", duration: 50, description: "Structure lessons" },
        { title: "Conversation Tips", duration: 40, description: "Speaking practice" }
      ]
    },
    // Writing
    {
      name: "Writing Excuses",
      episodes: [
        { title: "Character Building", duration: 55, description: "Creating personalities" },
        { title: "Plot Structure", duration: 60, description: "Story crafting" },
        { title: "World Building", duration: 50, description: "Setting creation" }
      ]
    },
    // Gaming
    {
      name: "Giant Bombcast",
      episodes: [
        { title: "Game Reviews", duration: 115, description: "New releases" },
        { title: "Industry News", duration: 120, description: "Gaming updates" },
        { title: "Developer Interview", duration: 110, description: "Behind the scenes" }
      ]
    },
    // Personal Development
    {
      name: "The Knowledge Project",
      episodes: [
        { title: "Mental Models", duration: 95, description: "Decision making" },
        { title: "Leadership Skills", duration: 100, description: "Management insights" },
        { title: "Learning Methods", duration: 90, description: "Skill acquisition" }
      ]
    }
  ];

  // Generate mock data with the expanded podcast database
  const generateMockData = () => {
    const data = {};

    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(2023, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = `2023-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // Select 1-3 random podcasts for each day
        const numPodcasts = Math.floor(Math.random() * 3) + 1;
        const todaysPodcasts = [];

        // Prevent duplicate podcasts on the same day
        const selectedPodcasts = new Set();

        while (todaysPodcasts.length < numPodcasts) {
          const podcast = podcastDatabase[Math.floor(Math.random() * podcastDatabase.length)];
          if (!selectedPodcasts.has(podcast.name)) {
            const episode = podcast.episodes[Math.floor(Math.random() * podcast.episodes.length)];
            todaysPodcasts.push({
              podcastName: podcast.name,
              ...episode
            });
            selectedPodcasts.add(podcast.name);
          }
        }

        data[date] = {
          podcasts: todaysPodcasts,
          totalTime: todaysPodcasts.reduce((acc, pod) => acc + pod.duration, 0)
        };
      }
    }
    return data;
  };

  const podcastData = generateMockData();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const renderMonthGrid = (month) => {
    const monthIndex = months.indexOf(month);
    const daysInMonth = new Date(2023, monthIndex + 1, 0).getDate();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `2023-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayData = podcastData[date];

      days.push(
        <div
          key={date}
          style={{ 
            backgroundColor: '#4a90e2',
            width: '30px',
            height: '30px',
            border: '1px solid #fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            position: 'relative'
          }}
          onMouseEnter={() => setHoveredDate(date)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          {day}
          {hoveredDate === date && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              padding: '8px',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 1000,
              width: '200px',
              color: 'black'
            }}>
              {dayData.podcasts.map((pod, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ fontWeight: 'bold' }}>{pod.podcastName}</div>
                  <div>{pod.title}</div>
                  <div style={{ color: '#666', fontSize: '12px' }}>{pod.duration} minutes</div>
                </div>
              ))}
              <div style={{ marginTop: '4px', borderTop: '1px solid #eee', paddingTop:'4px' }}>
                              Total listening time: {dayData.totalTime} minutes
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={month} style={{ marginBottom: '20px' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{month}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                        {days}
                      </div>
                    </div>
                  );
                };

                return (
                  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                    <h1 style={{ marginBottom: '20px' }}>2023 Podcast Listening History</h1>
                    <div>
                      {months.map(renderMonthGrid)}
                    </div>
                  </div>
                );
              };

              export default PodcastHeatmap;