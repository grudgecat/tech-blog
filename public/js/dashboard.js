//CREATE A NEW POST
const postHandler = async (event) => {
    event.preventDefault();
  
    const postTitle = document.querySelector('#post-title').value.trim();
    const postText = document.querySelector('#post-text').value.trim();
  
    if (postTitle && postText) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ postTitle, postText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post. Please verify you are logged in, and try again.');
      }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', postHandler);
  
  