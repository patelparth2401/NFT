import PropTypes from 'prop-types';

function NFTCard({ nft }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img
        src={nft.display_image_url || nft.image_url}
        alt={nft.name}
        className="w-full h-64 object-cover"
        onError={(e) => (e.target.src = 'https://via.placeholder.com/500?text=NFT+Image+Not+Found')}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{nft.name}</h2>
        <p className="text-gray-600 mt-2 line-clamp-3">{nft.description}</p>
        <a
          href={nft.opensea_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-500 hover:text-blue-700 font-medium"
        >
          View on OpenSea
        </a>
      </div>
    </div>
  );
}

// PropTypes for type checking (optional but recommended)
NFTCard.propTypes = {
  nft: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    display_image_url: PropTypes.string,
    image_url: PropTypes.string,
    opensea_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default NFTCard;