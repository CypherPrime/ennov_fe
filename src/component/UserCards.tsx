
import './mainContentStyles.css'


interface UserCountCardProps {
  userCount: number;
  percentage:number;
  days:string,
  type:string
}

const UserCountCard: React.FC<UserCountCardProps> = ({ userCount,percentage,days,type }) => {
  return (
  <div>
    <div className="card-container">
        <div className='users'>{type}</div>
        <div className='midle-container'>
            <span className='midle-container-user'>{userCount}</span>
            <span className='midle-container-perc'>+{percentage}% </span>
        </div>
        <span className='last-day-text'>last {days} days</span>
    </div>
  </div>
  );
};

export default UserCountCard;
