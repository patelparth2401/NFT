import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function NFTDetails({ identifier, contract }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNFTDetails = async () => {
      setLoading(true);
      setError(null);
      const options = { method: 'GET', headers: { accept: 'application/json' } };
      const url = `https://testnets-api.opensea.io/api/v2/chain/sepolia/contract/${contract}/nfts/${identifier}`;

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log('Fetched NFT Details:', data); // Log the data for debugging
        setDetails(data);
      } catch (err) {
        console.error('Error fetching NFT details:', err);
        setError('Failed to load NFT details');
      } finally {
        setLoading(false);
      }
    };

    fetchNFTDetails();
  }, [identifier, contract]); // Re-run when identifier or contract changes

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">NFT Details</h2>
      <p className="text-gray-700">
        <span className="font-semibold">Identifier:</span> {identifier}
      </p>
      <p className="text-gray-700 mt-2">
        <span className="font-semibold">Contract:</span> {contract}
      </p>
      {loading ? (
        <p className="text-gray-500 mt-4">Loading additional details...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : details ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Additional Details</h3>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Name:</span> {details.nft?.name || 'N/A'}
          </p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Description:</span> {details.nft?.description || 'N/A'}
          </p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No additional details available</p>
      )}
    </div>
  );
}

NFTDetails.propTypes = {
  identifier: PropTypes.string.isRequired,
  contract: PropTypes.string.isRequired,
};

export default NFTDetails;