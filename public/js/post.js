//DELETE A POST
const deleteHandler = async function (event) {
    const id = this.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Unable to delete post. You may only delete your own posts. Please verify you are logged in, and try again.');
    }
};
  
  document
    .querySelector("#deletepost")
    .addEventListener('click', deleteHandler);
