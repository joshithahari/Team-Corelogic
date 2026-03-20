import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CloudRain, ShieldAlert, Bike, ArrowRight, UserCheck } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [partnerDetails, setPartnerDetails] = useState({
    name: '',
    platform: 'zomato',
    city: 'mumbai'
  });

  useEffect(() => {
    // Check if user is already logged in (active session)
    const activeSession = localStorage.getItem('gigshield_active_user');
    if (activeSession) {
      navigate('/dashboard', { state: { user: JSON.parse(activeSession) } });
    }
  }, [navigate]);

  const handleNext = (e) => {
    e.preventDefault();
    if (partnerDetails.name.length > 2) {
      if (isLoginMode) {
        // Mock Login
        const savedUser = localStorage.getItem(`gigshield_user_${partnerDetails.name}`);
        if (savedUser) {
          localStorage.setItem('gigshield_active_user', savedUser);
          navigate('/dashboard', { state: { user: JSON.parse(savedUser) } });
        } else {
          alert('Account not found! Please create a new account.');
        }
      } else {
        // New Account - save it but go to quote first!
        localStorage.setItem(`gigshield_user_${partnerDetails.name}`, JSON.stringify(partnerDetails));
        navigate('/quote', { state: { partnerDetails } });
      }
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
      
      <div className="flex-center" style={{ gap: '12px', marginBottom: '2rem' }}>
        <Shield size={40} color="var(--accent-primary)" />
        <h1 style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'white', fontSize: '2rem' }}>GigShield</h1>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-10%', right: '-10%', 
          width: '300px', height: '300px', 
          background: 'var(--accent-primary-glow)', 
          filter: 'blur(100px)', borderRadius: '50%', zIndex: 0
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ marginBottom: '1rem' }}>{isLoginMode ? 'Welcome Back' : 'Protect Your Weekly Earnings'}</h2>
          <p className="subtitle" style={{ marginBottom: '2rem', maxWidth: '600px' }}>
            {isLoginMode 
              ? 'Log into your account to check your active parametric policy, view claims, or test simulated events.'
              : 'The first AI-powered income safety net for Food Delivery Partners. We cover your lost income instantly from external disruptions.'}
          </p>

          <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Your Name {isLoginMode ? '(Username)' : ''}</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Ramesh Kumar"
                required
                value={partnerDetails.name}
                onChange={(e) => setPartnerDetails({...partnerDetails, name: e.target.value})}
              />
            </div>
            
            {!isLoginMode && (
              <>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Platform</label>
                  <select 
                    className="input-field" 
                    style={{ appearance: 'none' }}
                    value={partnerDetails.platform}
                    onChange={(e) => setPartnerDetails({...partnerDetails, platform: e.target.value})}
                  >
                    <option value="zomato">Zomato</option>
                    <option value="swiggy">Swiggy</option>
                    <option value="other">Other Food Delivery</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Operating City</label>
                  <select 
                    className="input-field" 
                    style={{ appearance: 'none' }}
                    value={partnerDetails.city}
                    onChange={(e) => setPartnerDetails({...partnerDetails, city: e.target.value})}
                  >
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi NCR</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="chennai">Chennai</option>
                  </select>
                </div>
              </>
            )}

            <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
              {isLoginMode ? <><UserCheck size={18} /> Access Account</> : <>Get AI Risk Profile & Quote <ArrowRight size={18} /></>}
            </button>
          </form>

          <p style={{ marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {isLoginMode ? "Don't have an account?" : "Already covered?"}{' '}
            <button 
              onClick={() => setIsLoginMode(!isLoginMode)}
              style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', textDecoration: 'underline' }}>
              {isLoginMode ? 'Create new policy' : 'Log in here'}
            </button>
          </p>
        </div>
      </div>
      
      {/* Features summary disabled if logging in */}
      {!isLoginMode && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <CloudRain size={32} color="var(--accent-warning)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Weather Proof</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Extreme heat, rain or floods covered instantly.</p>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <ShieldAlert size={32} color="var(--accent-success)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Social Disruptions</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Curfews or strikes halting deliveries? We got you.</p>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <Bike size={32} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Weekly Pricing</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Prices match your payout cycle. Easy auto-deduct.</p>
          </div>
        </div>
      )}
    </div>
  );
}
