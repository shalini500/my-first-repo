import React, { useState } from 'react';

// Helper function: Simple color contrast check (WCAG AA minimum)
function getContrastRatio(foreground, background) {
  // Helper: convert hex to rgb
  const hexToRgb = (hex) => {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map((x) => x + x).join('');
    }
    const bigint = parseInt(hex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const luminance = ({ r, g, b }) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };

  const L1 = luminance(hexToRgb(foreground));
  const L2 = luminance(hexToRgb(background));
  return L1 > L2 ? (L1 + 0.05) / (L2 + 0.05) : (L2 + 0.05) / (L1 + 0.05);
}

function AccessibilityAnalyser() {
  const [text, setText] = useState('');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [results, setResults] = useState(null);

  const analyse = () => {
    if (!text.trim()) {
      setResults({ error: 'Please enter some text to analyse.' });
      return;
    }

    // Word count
    const wordCount = text.trim().split(/\s+/).length;

    // Color contrast ratio
    const contrastRatio = getContrastRatio(foregroundColor, backgroundColor);
    const contrastPass = contrastRatio >= 4.5;

    // Simple ARIA check: count presence of aria-label or aria-describedby
    const ariaLabels = (text.match(/aria-label=/gi) || []).length;
    const ariaDescribed = (text.match(/aria-describedby=/gi) || []).length;

    setResults({
      wordCount,
      contrastRatio: contrastRatio.toFixed(2),
      contrastPass,
      ariaLabels,
      ariaDescribed,
    });
  };

  return (
    <section className="analyser-section">
      <h2>Accessibility Analyser</h2>
      <textarea
        placeholder="Paste your HTML or text content here..."
        rows="8"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="color-picker-container">
        <label>
          Text Color:
          <input
            type="color"
            value={foregroundColor}
            onChange={(e) => setForegroundColor(e.target.value)}
          />
        </label>
        <label>
          Background Color:
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </label>
      </div>
      <button onClick={analyse}>Analyse</button>

      {results && results.error && <p className="error">{results.error}</p>}

      {results && !results.error && (
        <div className="results">
          <p>Word Count: {results.wordCount}</p>
          <p>
            Contrast Ratio: {results.contrastRatio} —{' '}
            {results.contrastPass ? (
              <span className="pass">Passes WCAG AA</span>
            ) : (
              <span className="fail">Fails WCAG AA</span>
            )}
          </p>
          <p>ARIA Labels Found: {results.ariaLabels}</p>
          <p>ARIA Describedby Found: {results.ariaDescribed}</p>
        </div>
      )}
    </section>
  );
}

export default AccessibilityAnalyser;