import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CloudLightning, ThermometerSun, AlertOctagon, Activity, CheckCircle, Wallet, BadgeCheck, User, Settings as SettingsIcon } from 'lucide-react';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  // Get user from location state or fallback to local storage
  const savedActive = localStorage.getItem('gigshield_active_user');
  const userParams = location.state?.user || (savedActive ? JSON.parse(savedActive) : { name: 'Partner', city: 'Mumbai', platform: 'Zomato' });
  
  const [activeTab, setActiveTab] = useState('overview');
  const [balance, setBalance] = useState(0);
  const [events, setEvents] = useState([]);
  const [simulating, setSimulating] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    if (!userParams.name) return;
    const savedBalance = localStorage.getItem(`gigshield_balance_${userParams.name}`);
    const savedEvents = localStorage.getItem(`gigshield_events_${userParams.name}`);
    if (savedBalance) setBalance(parseInt(savedBalance, 10));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, [userParams.name]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('gigshield_active_user');
    navigate('/');
  };

  // Trigger Mock Parametric Event
  const handleTriggerEvent = (type) => {
    setSimulating(true);
    setTimeout(() => {
      const newEvent = {
        id: Date.now(),
        type,
        time: new Date().toLocaleTimeString(),
        payout: 1000,
        status: 'Processed via AI'
      };
      
      const updatedEvents = [newEvent, ...events];
      const updatedBalance = balance + 1000;
      
      setEvents(updatedEvents);
      setBalance(updatedBalance);
      
      // Save state to local storage
      localStorage.setItem(`gigshield_events_${userParams.name}`, JSON.stringify(updatedEvents));
      localStorage.setItem(`gigshield_balance_${userParams.name}`, updatedBalance.toString());
      
      setSimulating(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{
      display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem',
      height: '100vh', margin: '-32px', // counteract main padding
    }}>
      {/* Sidebar Layout */}
      <aside className="glass-panel" style={{ borderLeft: 'none', borderTop: 'none', borderBottom: 'none', borderRadius: '0', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BadgeCheck color="var(--accent-success)" />
          GigShield
        </h2>
        
        <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Protected Earnings</p>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-success)' }}>₹{balance}</h3>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['overview', 'claims', 'settings'].map(tab => (
            <button key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? 'var(--bg-surface-hover)' : 'transparent',
                border: 'none', padding: '12px', color: 'white',
                textAlign: 'left', borderRadius: '8px', cursor: 'pointer',
                textTransform: 'capitalize'
              }}>
              {tab}
            </button>
          ))}
        </nav>
        
        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
          <p style={{ fontSize: '0.9rem' }}>{userParams.name}</p>
          <p style={{ color: 'var(--accent-success)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--accent-success)', borderRadius: '50%', display: 'inline-block' }}></span>
            Active Policy
          </p>
        </div>
      </aside>

      {/* Main Dashboard Panel */}
      <main style={{ padding: '2rem 2rem 2rem 0', overflowY: 'auto' }}>
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <header className="flex-between" style={{ marginBottom: '3rem' }}>
              <div>
                <h1>Live Parametric Monitor</h1>
                <p className="subtitle">Tracking external disruptions in {userParams.city}</p>
              </div>
              <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Activity color="var(--accent-success)" size={20} />
                <span style={{ fontWeight: 500 }}>System Normal</span>
              </div>
            </header>

            <h3 style={{ marginBottom: '1rem' }}>Simulate Disruption (Testing)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              
              <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <CloudLightning size={40} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
                <h4>Severe Waterlogging</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '8px 0 16px' }}>Triggers when rainfall exceeds 50mm/hr</p>
                <button className="btn-outline" onClick={() => handleTriggerEvent('Waterlogging')} disabled={simulating}>
                  {simulating ? 'Processing...' : 'Simulate Rain Event'}
                </button>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <ThermometerSun size={40} color="var(--accent-warning)" style={{ margin: '0 auto 1rem' }} />
                <h4>Extreme Heatwave</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '8px 0 16px' }}>Triggers when temp hits 45°C+</p>
                <button className="btn-outline" onClick={() => handleTriggerEvent('Heatwave')} disabled={simulating}>
                   {simulating ? 'Processing...' : 'Simulate Heat Event'}
                </button>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <AlertOctagon size={40} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
                <h4>Social Curfew / Strike</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '8px 0 16px' }}>App zoned out due to local restrictions</p>
                <button className="btn-outline" onClick={() => handleTriggerEvent('Zone Curfew')} disabled={simulating}>
                   {simulating ? 'Processing...' : 'Simulate Zone Closure'}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* CLAIMS TAB */}
        {activeTab === 'claims' && (
          <div className="animate-fade-in">
            <header style={{ marginBottom: '3rem' }}>
              <h1>AI Claim Log</h1>
              <p className="subtitle">Instant parametric payouts deposited directly to your linked account.</p>
            </header>

            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
              {events.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <Wallet size={48} color="rgba(255,255,255,0.2)" style={{ margin: '0 auto 1rem' }} />
                  <p>No claims detected yet. Your weekly earnings are stable.</p>
                  <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>Claims are filed automatically when AI detects an external disruption.</p>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>Time</th>
                      <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>Trigger Event</th>
                      <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>Payout</th>
                      <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>Validation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev, i) => (
                      <tr key={ev.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>{ev.time}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                          <span style={{ color: 'var(--accent-warning)', background: 'var(--bg-surface-hover)', padding: '4px 8px', borderRadius: '4px' }}>{ev.type}</span>
                        </td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', color: 'var(--accent-success)', fontWeight: 'bold' }}>
                          +₹{ev.payout}
                        </td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                          <div className="flex-center" style={{ gap: '6px', justifyContent: 'flex-start' }}>
                            <CheckCircle size={16} color="var(--accent-success)" />
                            <span style={{ fontSize: '0.9rem' }}>{ev.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="animate-fade-in">
            <header style={{ marginBottom: '3rem' }}>
              <h1>Account Settings</h1>
              <p className="subtitle">Manage your GigShield preferences</p>
            </header>

            <div style={{ display: 'grid', gap: '2rem', maxWidth: '600px' }}>
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={20} color="var(--accent-primary)" /> Personal Details
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full Name</label>
                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>{userParams.name}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Platform</label>
                      <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-light)', textTransform: 'capitalize' }}>{userParams.platform || 'Zomato'}</div>
                    </div>
                    <div>
                      <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>City</label>
                      <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-light)', textTransform: 'capitalize' }}>{userParams.city}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SettingsIcon size={20} color="var(--accent-primary)" /> Plan Preferences
                </h3>
                <div className="flex-between" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <div>
                    <strong style={{ display: 'block' }}>GigShield Plan</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Parametric Income Protection</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ display: 'block', color: 'var(--accent-success)' }}>₹49 / week</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Auto-deducted</span>
                  </div>
                </div>
                
                <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>Account Actions</h3>
                <button className="btn-outline" onClick={handleLogout} style={{ width: '100%', borderColor: 'rgba(239, 68, 68, 0.4)', color: 'var(--accent-primary)' }}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
