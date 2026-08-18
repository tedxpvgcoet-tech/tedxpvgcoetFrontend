import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import bgVideo from '../../assets/backgrounds/background.mp4';

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: 'transparent',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    boxSizing: 'border-box',
    padding: '100px 20px 60px',
  },
  card: {
    backgroundColor: 'rgba(10, 10, 12, 0.88)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    padding: '40px 36px',
    maxWidth: '540px',
    width: '100%',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
    fontFamily: '"Inter", sans-serif',
    animation: 'dropIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    boxSizing: 'border-box',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '28px',
  },
  title: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#e81b2a',
    margin: '0 0 4px 0',
    letterSpacing: '-0.5px',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.88rem',
    color: '#888',
    margin: 0,
    fontWeight: '400',
  },
  resetBtn: {
    fontFamily: '"Inter", sans-serif',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#aaa',
    padding: '7px 14px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.82rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  },
  formGroup: {
    marginBottom: '18px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  label: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#cccccc',
    marginBottom: '7px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '11px 14px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.95rem',
    fontFamily: '"Inter", sans-serif',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  inputFocus: {
    borderColor: '#e81b2a',
  },
  textarea: {
    padding: '11px 14px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.95rem',
    fontFamily: '"Inter", sans-serif',
    boxSizing: 'border-box',
    outline: 'none',
    minHeight: '90px',
    resize: 'vertical',
    transition: 'border-color 0.2s',
  },
  fileLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '11px 14px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '6px',
    color: '#aaa',
    fontSize: '0.95rem',
    fontFamily: '"Inter", sans-serif',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  fileLabelHover: {
    borderColor: '#e81b2a',
  },
  fileBadge: {
    display: 'inline-block',
    background: '#e81b2a',
    color: '#fff',
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.78rem',
    fontWeight: '700',
    padding: '3px 10px',
    borderRadius: '3px',
    whiteSpace: 'nowrap',
  },
  submitBtn: {
    display: 'block',
    width: '100%',
    fontFamily: '"Inter", sans-serif',
    backgroundColor: '#e81b2a',
    color: '#ffffff',
    padding: '13px',
    borderRadius: '4px',
    border: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background-color 0.25s ease',
  },
  submitBtnHover: {
    backgroundColor: '#c40000',
  },
  submitBtnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  statusSuccess: {
    marginTop: '16px',
    padding: '12px 14px',
    borderRadius: '6px',
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.9rem',
    fontWeight: '600',
    background: 'rgba(34, 197, 94, 0.1)',
    color: '#4ade80',
    border: '1px solid rgba(34, 197, 94, 0.25)',
    textAlign: 'center',
  },
  statusError: {
    marginTop: '16px',
    padding: '12px 14px',
    borderRadius: '6px',
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.9rem',
    fontWeight: '600',
    background: 'rgba(232, 27, 42, 0.1)',
    color: '#e81b2a',
    border: '1px solid rgba(232, 27, 42, 0.25)',
    textAlign: 'center',
  },
};

export default function BillsUploadForm({ secretKey }) {
  const [formData, setFormData] = useState({ name: '', amount: '', reason: '' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [btnHovered, setBtnHovered] = useState(false);
  const [focused, setFocused] = useState('');
  const [fileLabelHovered, setFileLabelHovered] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ fileName: file.name, mimeType: file.type, base64: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomValidation = (e) => {
    const inputs = e.target.form.querySelectorAll('input[required], textarea[required]');
    for (const input of inputs) {
      if (!input.validity.valid) {
        input.focus();
        setStatus({ type: 'error', message: `Please fill in the "${input.placeholder || input.name || 'required'}" field before submitting.` });
        return;
      }
    }
    if (!image) {
      setStatus({ type: 'error', message: 'Please attach a bill receipt photo before submitting.' });
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      let API_URL = 'https://www.backend.tedxpvgcoet.in';
      try { if (import.meta.env.VITE_BACKEND_URL) API_URL = import.meta.env.VITE_BACKEND_URL; } catch (e) { }
      try { if (process.env.REACT_APP_BACKEND_URL) API_URL = process.env.REACT_APP_BACKEND_URL; } catch (e) { }

      const payload = {
        keyword: secretKey,
        name: formData.name,
        amount: formData.amount,
        reason: formData.reason,
        imageFile: image?.base64,
        fileName: image?.fileName,
        mimeType: image?.mimeType
      };

      const res = await fetch(`${API_URL}/bills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });


      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ type: 'success', message: 'Bill submitted successfully!' });
        setFormData({ name: '', amount: '', reason: '' });
        setImage(null);
        e.target.reset();
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to submit bill.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error. Could not reach the backend.' });
    }
    setLoading(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      setStatus({ type: 'error', message: 'Please attach a bill receipt photo before submitting.' });
      return;
    }
    handleSubmit(e);
  };

  const handleLogout = () => {
    localStorage.removeItem('BRIDGE_KEY');
    window.location.reload();
  };

  const inputStyle = (field) => ({
    ...styles.input,
    ...(focused === field ? styles.inputFocus : {}),
  });

  const textareaStyle = (field) => ({
    ...styles.textarea,
    ...(focused === field ? styles.inputFocus : {}),
  });

  return (
    <div style={styles.wrapper}>
      <Helmet defer={false}>
        <title>Internal Bills | TEDxPVGCOET</title>
      </Helmet>
      <style>{`
        @keyframes dropIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hero-video1 {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        /* Remove number spinner arrows */
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <video src={bgVideo} autoPlay loop muted playsInline className="hero-video1" />

      <div style={styles.pageContainer}>
        <div style={styles.card}>
          <div style={styles.headerRow}>
            <div>
              <h1 style={styles.title}>Internal Bills</h1>
              <p style={styles.subtitle}>Submit your purchase receipts</p>
            </div>
            <button
              style={styles.resetBtn}
              onClick={handleLogout}
              title="Sign out and re-enter keyword"
            >
              Sign Out
            </button>
          </div>

          <form onSubmit={handleFormSubmit} noValidate>
            <div style={styles.formGroup}>
              <label style={styles.label}>Purchaser Name</label>
              <input
                type="text"
                required
                value={formData.name}
                style={inputStyle('name')}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused('')}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Omkar"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Amount (₹)</label>
              <input
                type="number"
                required
                value={formData.amount}
                style={inputStyle('amount')}
                onFocus={() => setFocused('amount')}
                onBlur={() => setFocused('')}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                placeholder="e.g. 500"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Reason / Item Description</label>
              <textarea
                value={formData.reason}
                style={textareaStyle('reason')}
                onFocus={() => setFocused('reason')}
                onBlur={() => setFocused('')}
                onChange={e => setFormData({ ...formData, reason: e.target.value })}
                placeholder="What was purchased and for what purpose?"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Bill Receipt (Photo)</label>
              {/* Hidden real input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {/* Custom styled trigger */}
              <div
                style={{
                  ...styles.fileLabel,
                  ...(fileLabelHovered ? styles.fileLabelHover : {}),
                }}
                onClick={() => fileInputRef.current.click()}
                onMouseEnter={() => setFileLabelHovered(true)}
                onMouseLeave={() => setFileLabelHovered(false)}
              >
                <span style={styles.fileBadge}>Choose File</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {image ? image.fileName : 'No file selected'}
                </span>
              </div>
            </div>

            <button
              type="submit"
              style={{
                ...styles.submitBtn,
                ...(btnHovered && !loading ? styles.submitBtnHover : {}),
                ...(loading ? styles.submitBtnDisabled : {}),
              }}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Submit Bill'}
            </button>
          </form>

          {status.message && (
            <div style={status.type === 'success' ? styles.statusSuccess : styles.statusError}>
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
