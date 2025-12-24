import { v4 as uuidv4 } from 'uuid';

/**
 * Yeni bir metin mesajı oluşturur
 * @param {string} text - Mesaj metni
 * @returns {Object} Mesaj objesi
 */
export const createTextMessage = (text) => {
  return {
    id: uuidv4(),
    type: 'text',
    text,
    timestamp: Date.now(),
  };
};

/**
 * Yeni bir görsel mesajı oluşturur
 * @param {string} uri - Görselin URI'si
 * @returns {Object} Mesaj objesi
 */
export const createImageMessage = (uri) => {
  return {
    id: uuidv4(),
    type: 'image',
    uri,
    timestamp: Date.now(),
  };
};

/**
 * Yeni bir lokasyon mesajı oluşturur
 * @param {Object} coordinate - Koordinat bilgisi {latitude, longitude}
 * @returns {Object} Mesaj objesi
 */
export const createLocationMessage = (coordinate) => {
  return {
    id: uuidv4(),
    type: 'location',
    coordinate,
    timestamp: Date.now(),
  };
};

/**
 * Mesaj listesini zaman damgasına göre sıralar (en yeni en üstte)
 * @param {Array} messages - Mesaj dizisi
 * @returns {Array} Sıralanmış mesaj dizisi
 */
export const sortMessagesByTimestamp = (messages) => {
  return [...messages].sort((a, b) => b.timestamp - a.timestamp);
};
