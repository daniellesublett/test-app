import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // *********** Adds pagination to display 10 results at a time
  const startIndex = currentPage * 10;
  const endIndex = startIndex + 10;
  const slicedPostArray = posts.slice(startIndex, endIndex);

  const fetchPostData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        // ************ This handles case if endpoint fails.
        if (!response.ok) {
          throw new Error('Error in fetching data')
        }
        return response.json()
      })
      .then(data => {
        setPosts(data)
      })
      .catch(error => {
        console.error('Error:', error.message)
      })
  }

  useEffect(() => {
    fetchPostData()
  }, [])

  return (
    <div>
      <button 
        class='prev-next-buttons' 
        onClick={handlePreviousPage} 
        disabled={currentPage === 0}>
          Previous 10
      </button>
      <button
        class='prev-next-buttons' 
        onClick={handleNextPage}
        disabled={endIndex >= posts.length}
      >
        Next 10
      </button>         
        <table class="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Post</th>
            </tr>
          </thead>
          <tbody>
          {slicedPostArray.map(post => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
          </tbody>
        </table>     
    </div>
  );
}


export default App;
