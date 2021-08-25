const commentHandler = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#comment_text').value.trim();
    let location = window.location.href;
    location = location.split('/').pop();
    let post_id = location;

    if (comment_text) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
        if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to add comment. Please verify you are logged in, and try again.');
      }
    }
  };


  document
  .querySelector(".comment-form")
  .addEventListener('submit', commentHandler);