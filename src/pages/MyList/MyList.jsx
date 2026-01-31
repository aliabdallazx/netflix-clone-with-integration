import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar/Navbar';
import './MyList.css';

const MyList = () => {
  const { t } = useTranslation();

  return (
    <div className="my-list-page">
      <Navbar />
      <div className="my-list-container">
        <h1>{t('navigation.myList')}</h1>
        <p>Your personal watchlist and favorites</p>
        {/* My List content will be added here */}
      </div>
    </div>
  );
};

export default MyList;
