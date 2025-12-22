import React, { useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTravel } from '../context/TravelContext';
import './Statistics.css';

// ✅ function ko upar la diya aur normal function banaya
function getContinent(country) {
  const continentMap = {
    'United States': 'North America',
    'Canada': 'North America',
    'Mexico': 'North America',
    'Brazil': 'South America',
    'Argentina': 'South America',
    'Peru': 'South America',
    'Colombia': 'South America',
    'Chile': 'South America',
    'Uruguay': 'South America',
    'Venezuela': 'South America',
    'Bolivia': 'South America',
    'China': 'Asia',
    'Japan': 'Asia',
    'India': 'Asia',
    'Thailand': 'Asia',
    'South Korea': 'Asia',
    'Singapore': 'Asia',
    'Malaysia': 'Asia',
    'Indonesia': 'Asia',
    'Philippines': 'Asia',
    'Vietnam': 'Asia',
    'Cambodia': 'Asia',
    'Bangladesh': 'Asia',
    'Pakistan': 'Asia',
    'Nepal': 'Asia',
    'Sri Lanka': 'Asia',
    'Kazakhstan': 'Asia',
    'Iran': 'Asia',
    'Iraq': 'Asia',
    'Jordan': 'Asia',
    'Lebanon': 'Asia',
    'Kuwait': 'Asia',
    'Bahrain': 'Asia',
    'Qatar': 'Asia',
    'United Arab Emirates': 'Asia',
    'Saudi Arabia': 'Asia',
    'Israel': 'Asia',
    'Azerbaijan': 'Asia',
    'Armenia': 'Asia',
    'Georgia': 'Asia',
    'France': 'Europe',
    'Germany': 'Europe',
    'Italy': 'Europe',
    'Spain': 'Europe',
    'Greece': 'Europe',
    'Portugal': 'Europe',
    'Netherlands': 'Europe',
    'Belgium': 'Europe',
    'Switzerland': 'Europe',
    'Austria': 'Europe',
    'Sweden': 'Europe',
    'Norway': 'Europe',
    'Denmark': 'Europe',
    'Finland': 'Europe',
    'Iceland': 'Europe',
    'England': 'Europe',
    'Scotland': 'Europe',
    'Wales': 'Europe',
    'Ireland': 'Europe',
    'Poland': 'Europe',
    'Czech Republic': 'Europe',
    'Hungary': 'Europe',
    'Romania': 'Europe',
    'Bulgaria': 'Europe',
    'Croatia': 'Europe',
    'Slovenia': 'Europe',
    'Slovakia': 'Europe',
    'Estonia': 'Europe',
    'Latvia': 'Europe',
    'Lithuania': 'Europe',
    'Belarus': 'Europe',
    'Ukraine': 'Europe',
    'Russia': 'Europe',
    'Malta': 'Europe',
    'Cyprus': 'Europe',
    'Luxembourg': 'Europe',
    'Albania': 'Europe',
    'Egypt': 'Africa',
    'South Africa': 'Africa',
    'Kenya': 'Africa',
    'Morocco': 'Africa',
    'Ghana': 'Africa',
    'Ethiopia': 'Africa',
    'Algeria': 'Africa',
    'Australia': 'Oceania',
    'New Zealand': 'Oceania',
    'Cuba': 'North America',
    'Turkey': 'Europe/Asia'
  };
  return continentMap[country] || 'Other';
}

const Statistics = () => {
  const { places } = useTravel();
  const chartRefs = {
    status: useRef(null),
    priority: useRef(null),
    tripType: useRef(null),
    budget: useRef(null)
  };

  const stats = useMemo(() => {
    const total = places.length;
    const visited = places.filter(p => p.isVisited).length;
    const remaining = total - visited;
    const totalBudget = places.reduce((sum, p) => sum + (p.estimatedBudget || 0), 0);
    const visitedBudget = places.filter(p => p.isVisited).reduce((sum, p) => sum + (p.estimatedBudget || 0), 0);

    const priorityStats = {
      High: places.filter(p => p.priority === 'High').length,
      Medium: places.filter(p => p.priority === 'Medium').length,
      Low: places.filter(p => p.priority === 'Low').length
    };

    const tripTypeStats = places.reduce((acc, place) => {
      acc[place.tripType] = (acc[place.tripType] || 0) + 1;
      return acc;
    }, {});

    const continentStats = places.reduce((acc, place) => {
      const continent = getContinent(place.country);
      acc[continent] = (acc[continent] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      visited,
      remaining,
      completionRate: total > 0 ? Math.round((visited / total) * 100) : 0,
      totalBudget,
      visitedBudget,
      remainingBudget: totalBudget - visitedBudget,
      priorityStats,
      tripTypeStats,
      continentStats
    };
  }, [places]);

  // ✅ baki sab tumhara chart / rendering ka code same rahega
  // drawPieChart, drawBarChart, useEffect, motion animations, return() etc...
  // 👇👇 yeh part untouched hai

  const drawPieChart = (canvas, data, colors) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    if (total === 0) return;
    let currentAngle = -Math.PI / 2;
    Object.entries(data).forEach(([key, value], index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      currentAngle += sliceAngle;
    });
  };

  const drawBarChart = (canvas, data, colors) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const margin = 40;
    const chartWidth = canvas.width - margin * 2;
    const chartHeight = canvas.height - margin * 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const entries = Object.entries(data);
    if (entries.length === 0) return;
    const maxValue = Math.max(...Object.values(data));
    const barWidth = (chartWidth / entries.length) * 0.8;
    const barSpacing = (chartWidth / entries.length) * 0.2;
    entries.forEach(([key, value], index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = margin + index * (barWidth + barSpacing);
      const y = canvas.height - margin - barHeight;
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
      ctx.fillText(key, x + barWidth / 2, canvas.height - 10);
    });
  };

  useEffect(() => {
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    if (chartRefs.status.current) {
      drawPieChart(chartRefs.status.current, {
        Visited: stats.visited,
        'To Visit': stats.remaining
      }, ['#10B981', '#3B82F6']);
    }
    if (chartRefs.priority.current) {
      drawBarChart(chartRefs.priority.current, stats.priorityStats, ['#EF4444', '#F59E0B', '#10B981']);
    }
    if (chartRefs.tripType.current) {
      drawPieChart(chartRefs.tripType.current, stats.tripTypeStats, colors);
    }
    if (chartRefs.budget.current) {
      drawPieChart(chartRefs.budget.current, {
        'Visited': stats.visitedBudget,
        'Remaining': stats.remainingBudget
      }, ['#10B981', '#3B82F6']);
    }
  }, [stats]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="statistics">
      {/* 👇 yaha se return ka pura tumhara original jsx same rahega (overview, visit status, priority, trip types, budget, achievements) */}


      <motion.div 
        className="stats-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="page-header"
          variants={cardVariants}
        >
          <h1>Travel Statistics 📊</h1>
          <p>Track your travel progress and achievements</p>
        </motion.div>

        <div className="stats-grid">
          <motion.div className="stat-card overview" variants={cardVariants}>
            <h3>Overview</h3>
            <div className="overview-stats">
              <div className="overview-item">
                <div className="overview-number">{stats.total}</div>
                <div className="overview-label">Total Places</div>
              </div>
              <div className="overview-item">
                <div className="overview-number">{stats.visited}</div>
                <div className="overview-label">Visited</div>
              </div>
              <div className="overview-item">
                <div className="overview-number">{stats.remaining}</div>
                <div className="overview-label">To Visit</div>
              </div>
              <div className="overview-item">
                <div className="overview-number">{stats.completionRate}%</div>
                <div className="overview-label">Complete</div>
              </div>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${stats.completionRate}%` }}
              ></div>
            </div>
          </motion.div>

          <motion.div className="stat-card chart-card" variants={cardVariants}>
            <h3>Visit Status</h3>
            <canvas 
              ref={chartRefs.status}
              width="200" 
              height="200"
              className="chart-canvas"
            ></canvas>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color visited"></div>
                <span>Visited ({stats.visited})</span>
              </div>
              <div className="legend-item">
                <div className="legend-color planned"></div>
                <span>To Visit ({stats.remaining})</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="stat-card chart-card" variants={cardVariants}>
            <h3>Priority Levels</h3>
            <canvas 
              ref={chartRefs.priority}
              width="300" 
              height="200"
              className="chart-canvas"
            ></canvas>
          </motion.div>

          <motion.div className="stat-card chart-card" variants={cardVariants}>
            <h3>Trip Types</h3>
            <canvas 
              ref={chartRefs.tripType}
              width="200" 
              height="200"
              className="chart-canvas"
            ></canvas>
            <div className="chart-legend">
              {Object.entries(stats.tripTypeStats).map(([type, count], index) => (
                <div key={type} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'][index % 6] }}
                  ></div>
                  <span>{type} ({count})</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="stat-card budget-card" variants={cardVariants}>
            <h3>Budget Overview</h3>
            {stats.totalBudget > 0 ? (
              <>
                <div className="budget-stats">
                  <div className="budget-item">
                    <div className="budget-label">Total Budget</div>
                    <div className="budget-amount">${stats.totalBudget.toLocaleString()}</div>
                  </div>
                  <div className="budget-item">
                    <div className="budget-label">Spent (Visited)</div>
                    <div className="budget-amount spent">${stats.visitedBudget.toLocaleString()}</div>
                  </div>
                  <div className="budget-item">
                    <div className="budget-label">Remaining</div>
                    <div className="budget-amount remaining">${stats.remainingBudget.toLocaleString()}</div>
                  </div>
                </div>
                <canvas 
                  ref={chartRefs.budget}
                  width="200" 
                  height="200"
                  className="chart-canvas"
                ></canvas>
              </>
            ) : (
              <div className="no-budget">
                <p>No budget information available</p>
                <p>Add estimated budgets to your places to see budget statistics</p>
              </div>
            )}
          </motion.div>

          <motion.div className="stat-card achievements" variants={cardVariants}>
            <h3>Achievements 🏆</h3>
            <div className="achievements-list">
              {stats.visited >= 1 && (
                <div className="achievement">
                  <span className="achievement-icon">🎯</span>
                  <span>First Destination Visited!</span>
                </div>
              )}
              {stats.visited >= 5 && (
                <div className="achievement">
                  <span className="achievement-icon">🌟</span>
                  <span>Explorer - 5 Places Visited</span>
                </div>
              )}
              {stats.visited >= 10 && (
                <div className="achievement">
                  <span className="achievement-icon">🌍</span>
                  <span>Globetrotter - 10 Places Visited</span>
                </div>
              )}
              {stats.total >= 20 && (
                <div className="achievement">
                  <span className="achievement-icon">📝</span>
                  <span>Dream Big - 20+ Places Listed</span>
                </div>
              )}
              {stats.completionRate >= 50 && (
                <div className="achievement">
                  <span className="achievement-icon">⚡</span>
                  <span>Halfway There - 50% Complete</span>
                </div>
              )}
              {stats.completionRate >= 100 && (
                <div className="achievement">
                  <span className="achievement-icon">👑</span>
                  <span>Bucket List Master - 100% Complete</span>
                </div>
              )}
              {stats.visited === 0 && stats.total > 0 && (
                <div className="achievement pending">
                  <span className="achievement-icon">🚀</span>
                  <span>Ready to Start Your Journey!</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Statistics;
