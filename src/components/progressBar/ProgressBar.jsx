import './progressBar.css';

const ProgressBar = ({ status }) => {
  const getStatusIndex = (status) => {
    switch (status) {
      case 'Order Received':
        return 0;
      case 'Order Dispatched':
        return 1;
      case 'Order Delivered':
        return 2;
      default:
        return 0;
    }
  };

  const statusIndex = getStatusIndex(status);
  const progressWidth = ((statusIndex + 1) / 3) * 100;

  const progressLabels = ['Order Received', 'Order Dispatched', 'Order Delivered'];

  return (
    <div className="progress-bar">
      <div className="progress-bar-bg">
        <div className="progress-bar-fg" style={{ width: `${progressWidth}%` }}></div>
      </div>
      <div className="progress-bar-labels">
        {progressLabels.map((label, index) => (
          <span key={index} className={statusIndex >= index ? 'completed' : ''}>{label}</span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
