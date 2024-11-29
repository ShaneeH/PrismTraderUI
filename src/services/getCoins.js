import axios from 'axios';

// Utility function to format numbers
const formatNumber = (num) => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`; // Billions
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`; // Millions
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}k`; // Thousands
  return num; // Smaller numbers stay as-is
};

export const getCoins = async (ca) => {
  const url = 'http://localhost:3000/blockChain/portfolio';
  const body = { wallet: ca };

  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Format numbers before returning
    const formattedData = response.data.map((item) => ({
      ...item,
      price: `${formatNumber(item.price)}`, // Format price
      mc: formatNumber(item.mc), // Market Cap
      qty: formatNumber(item.qty), // Quantity
      holdings: formatNumber(item.holdings), // Holdings, if applicable
    }));

    return formattedData;
  } catch (err) {
    if (err.response) {
      throw new Error(`Error: ${err.response.status} - ${err.response.data.message || 'Server Error'}`);
    } else if (err.request) {
      throw new Error('No response from server. Please try again later.');
    } else {
      throw new Error(`Request error: ${err.message}`);
    }
  }
};
