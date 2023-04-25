import "./CircularProgressBar.css";

const SIZES = { s: 34, m: 88, l: 176 };

const CircularProgressBar = ({ value, variant = "l", children }) => {
  const size = SIZES[variant];
  const strokeWidth = size * 0.11;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (value / 10) * circumference;

  return (
    <div className={`circular-progress-bar ${variant}`}>
      <svg className="circular-progress-bar-svg" width={size} height={size}>
        <circle
          className="circular-progress-bar-foreground"
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="circular-progress-bar-value">{children}</div>
    </div>
  );
};

export default CircularProgressBar;
