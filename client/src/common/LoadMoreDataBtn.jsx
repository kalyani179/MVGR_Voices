import React from 'react';

const LoadMoreDataBtn = ({ state, fetchDataFunc,additionalParam }) => {
  if (state && state.totalDocs > state.results.length) {
    return (
      <button
        onClick={() => fetchDataFunc({ ...additionalParam, page: state.page + 1 })}
        className="text-primary font-medium p-2 px-3 rounded-md flex items-center"
      >
        Load More
      </button>
    );
  } else {
    return null; // Return null if state is null or all data is already loaded
  }
};

export default LoadMoreDataBtn;
