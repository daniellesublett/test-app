import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([])
  const slicedPostArray = posts.slice(0, 10);
  const fetchPostData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
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
