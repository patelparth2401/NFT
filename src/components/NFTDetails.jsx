// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// function NFTDetails({ identifier, contract }) {
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNFTDetails = async () => {
//       setLoading(true);
//       setError(null);
//       const options = { method: 'GET', headers: { accept: 'application/json' } };
//       const url = `https://testnets-api.opensea.io/api/v2/chain/sepolia/contract/${contract}/nfts/${identifier}`;

//       try {
//         const response = await fetch(url, options);
//         const data = await response.json();
//         console.log('Fetched NFT Details:', data); // Log the data for debugging
//         setDetails(data);
//       } catch (err) {
//         console.error('Error fetching NFT details:', err);
//         setError('Failed to load NFT details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNFTDetails();
//   }, [identifier, contract]); // Re-run when identifier or contract changes

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">NFT Details</h2>
//       <p className="text-gray-700">
//         <span className="font-semibold">Identifier:</span> {identifier}
//       </p>
//       <p className="text-gray-700 mt-2">
//         <span className="font-semibold">Contract:</span> {contract}
//       </p>
//       {loading ? (
//         <p className="text-gray-500 mt-4">Loading additional details...</p>
//       ) : error ? (
//         <p className="text-red-500 mt-4">{error}</p>
//       ) : details ? (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold text-gray-800">Additional Details</h3>
//           <p className="text-gray-700 mt-2">
//             <span className="font-semibold">Name:</span> {details.nft?.name || 'N/A'}
//           </p>
//           <p className="text-gray-700 mt-2">
//             <span className="font-semibold">Description:</span> {details.nft?.description || 'N/A'}
//           </p>
//           {/* Add more fields as needed */}
//         </div>
//       ) : (
//         <p className="text-gray-500 mt-4">No additional details available</p>
//       )}
//     </div>
//   );
// }

// NFTDetails.propTypes = {
//   identifier: PropTypes.string.isRequired,
//   contract: PropTypes.string.isRequired,
// };

// export default NFTDetails;

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function NFTDetails({ identifier, contract }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNFTDetails = async () => {
      setLoading(true);
      setError(null);
      const options = { method: "GET", headers: { accept: "application/json" } };
      const url = `https://testnets-api.opensea.io/api/v2/chain/sepolia/contract/${contract}/nfts/${identifier}`;

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setDetails(data.nft);
        console.log(data);
      } catch (err) {
        setError("Failed to load NFT details");
      } finally {
        setLoading(false);
      }
    };

    fetchNFTDetails();
  }, [identifier, contract]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    details && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-xl max-w-[90%] relative items-center justify-center"
      >
        {/* Image */}
        <div className="flex flex-row space-x-2 justify-center">
        <div className="flex-1/2">

        
        <img
          src={details.display_image_url || details.image_url}
          alt={details.name}
          className="w-full h-64 object-cover rounded-xl"
        />
         {/* Traits */}
         <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Traits</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {details.traits.map((trait, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded-lg">
                <p className="text-sm font-medium text-gray-700">{trait.trait_type}</p>
                <p className="text-sm text-gray-900">{trait.value}</p>
              </div>
            ))}
          </div>
        </div>
</div>
<div className="flex-1/3">


        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-800 mt-4">{details.name}</h2>

        {/* Description */}
        <p className="text-gray-600 mt-2">{details.description}</p>

       

        {/* OpenSea Link */}
        <a
          href={details.opensea_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-500 hover:text-blue-700 font-medium mt-4 text-center"
        >
          View on OpenSea
        </a>
        </div></div>
      </motion.div>
    )
  );
}

NFTDetails.propTypes = {
  identifier: PropTypes.string.isRequired,
  contract: PropTypes.string.isRequired,
};

export default NFTDetails;
