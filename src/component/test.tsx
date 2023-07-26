import React, { useState, useEffect } from 'react';

interface Response {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

const TestComponent = () => {
  const [apiData, setApiData] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page here

  useEffect(() => {
    const fetchAPIs = async () => {
      try {
        const response = await fetch('https://api.publicapis.org/entries');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setApiData(data.entries);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchAPIs();
  }, []);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apiData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h1>Public APIs</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="api-list">
            {currentItems.map((api) => (
              <li key={api.API} className="api-item">
                <h2>{api.API}</h2>
                <p>{api.Description}</p>
                <div className="api-info">
                  <p>
                    <strong>Authentication:</strong> {api.Auth}
                  </p>
                  <p>
                    <strong>HTTPS:</strong> {api.HTTPS ? 'Yes' : 'No'}
                  </p>
                  <p>
                    <strong>CORS:</strong> {api.Cors}
                  </p>
                  <p>
                    <strong>Link:</strong>{' '}
                    <a href={api.Link} target="_blank" rel="noopener noreferrer">
                      {api.Link}
                    </a>
                  </p>
                  <p>
                    <strong>Category:</strong> {api.Category}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="pagination">
            {Array.from({ length: Math.ceil(apiData.length / itemsPerPage) }, (unusedValue, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TestComponent;
