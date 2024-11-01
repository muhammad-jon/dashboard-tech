export const BASE_URL = 'https://ventum-internship-backend.bis-apps.com/api/';

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0'); // 1-31 oralig'ida kun
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 0-11 oralig'ida oy
  const year = date.getUTCFullYear(); // Yil
  const hours = String(date.getUTCHours()).padStart(2, '0'); // 0-23 oralig'ida soat
  const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // 0-59 oralig'ida daqiqa
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
