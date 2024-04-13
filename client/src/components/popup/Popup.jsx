import React from 'react';
import './Popup.scss'; // Подключаем файл со стилями для попапа

const Popup = ({ isOpen, onClose }) => {
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Мой попап</h2>
        <p>Это модальное окно (попап).</p>
        <button>Обновить фото профиля</button>
      </div>
    </div>
  );
};

export default Popup;
