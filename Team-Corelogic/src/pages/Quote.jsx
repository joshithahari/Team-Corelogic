import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cpu, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Quote() {
  const location = useLocation();
  const navigate = useNavigate();
  const partnerDetails = location.state?.partnerDetails || { name: 'Partner', city: 'mumbai' };
  
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress(p => p + 20), 400);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setAnalyzing(false), 500);
    }
  }, [progress]);

  const handlePurchase = () => {
    // Save active user session
    localStorage.setItem('gigshield_active_user', JSON.stringify(partnerDetails));
    // Navigate to dashboard setting active state
    navigate('/dashboard', { state: { policyActive: true, user: partnerDetails } });
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>AI Risk Assessment</h1>

      {analyzing ? (
        <div className="glass-panel flex-center" style={{ flexDirection: 'column', padding: '4rem', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '2rem' }}>
            <Cpu size={80} color="var(--accent-primary)" />
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              border: '4px solid transparent',
              borderTopColor: 'var(--accent-warning)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
          <h2>Analyzing your risk profile...</h2>
          <p className="subtitle" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            Processing historical weather patterns, live traffic data, and zoning risks for {partnerDetails.city}.
          </p>
          
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.4s ease' }}></div>
          </div>
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div className="animate-fade-in" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          
          {/* AI Insights Card */}
          <div className="glass-panel" style={{ flex: '1 1 300px', padding: '2rem' }}>
            <div className="flex-center" style={{ gap: '12px', marginBottom: '1.5rem', justifyContent: 'flex-start' }}>
              <CheckCircle2 color="var(--accent-success)" />
              <h3 style={{ fontSize: '1.25rem' }}>Profile Complete</h3>
            </div>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '12px' }}>
                <AlertTriangle size={20} color="var(--accent-warning)" />
                <div>
                  <strong style={{ display: 'block' }}>High Heat Risk</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Above 42°C expected 3 days this week.</span>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <ShieldCheck size={20} color="var(--accent-success)" />
                <div>
                  <strong style={{ display: 'block' }}>Low Strike Risk</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No curfews or social disruptions mapped.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Pricing Card */}
          <div className="glass-panel" style={{ flex: '1 1 300px', padding: '2rem', position: 'relative', overflow: 'hidden', border: '1px solid var(--accent-primary)' }}>
            <div style={{
              position: 'absolute', top: '-20%', right: '-20%', 
              width: '200px', height: '200px', 
              background: 'var(--accent-primary-glow)', 
              filter: 'blur(80px)', zIndex: 0
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--bg-surface-hover)', borderRadius: '20px', fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                WEEKLY PLAN
              </div>
              <h2 style={{ fontSize: '3rem', margin: '0' }}>₹49</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>per week</p>
              
              <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <p style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--accent-success)" /> ₹1000/day payout
                </p>
                <p style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--accent-success)" /> Zero Wait Auto-claims
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--accent-success)" /> AI Fraud Protection
                </p>
              </div>

              <button className="btn-primary" style={{ width: '100%' }} onClick={handlePurchase}>
                Activate Protection <ShieldCheck size={18} />
              </button>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
