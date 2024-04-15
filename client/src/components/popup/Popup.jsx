import React from 'react';
import './Popup.scss'; // Подключаем файл со стилями для попапа
import DataForm from '../data/DataForm';

const Popup = ({ isOpen, onClose, getData }) => {
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Запись</h2>
        <DataForm getData={getData} onClose={onClose} />
      </div>
    </div>
  );
};

export default Popup;
