const commentHandler = async (event) => {
    event.preventDefault();
  
    // alert('called comment handler to add a new comment!');

    const comment_text = document.querySelector('#comment_text').value.trim();
    console.log('COMMENT TEXT HERE, ', comment_text);
    let location = window.location.href;
    location = location.split('/').pop();
    console.log('&&&&&&&&&& post id added here ', location);
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
        alert('Failed to add comment.');
      }
    }
  };


  document
  .querySelector(".comment-form")
  .addEventListener('submit', commentHandler);