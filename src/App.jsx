import { useState, useEffect } from 'react';
import NFTCard from './components/NFTCard';
import NFTDetails from './components/NFTDetails';
import './index.css';

function App() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNFT, setSelectedNFT] = useState(null);

  useEffect(() => {
    const fetchNfts = async () => {
      const options = { method: 'GET', headers: { accept: 'application/json' } };

      try {
        const response = await fetch(
          'https://testnets-api.opensea.io/api/v2/collection/sneakers-60/nfts',
          options
        );
        const data = await response.json();
        setNfts(data.nfts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch NFTs');
        setLoading(false);
        console.error(err);
      }
    };

    fetchNfts();
  }, []);

  const handleNFTClick = (identifier, contract) => {
    console.log('Received in App:', identifier, contract); // Debug log
    setSelectedNFT({ identifier, contract });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Sneakers NFT Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {nfts.map((nft) => (
          <NFTCard key={nft.identifier} nft={nft} onNFTClick={handleNFTClick} />
        ))}
      </div>
      {selectedNFT && (
        <NFTDetails
          identifier={selectedNFT.identifier}
          contract={selectedNFT.contract}
        />
      )}
    </div>
  );
}

export default App;