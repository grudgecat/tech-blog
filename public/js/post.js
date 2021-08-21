//DELETE A POST
const deleteHandler = async function (event) {
  alert("delete handler for post called!");

    const id = this.getAttribute('data-id');

    console.log("&&&&&&&&&&&id, ", `${id}`);

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('UNABLE TO DELETE POST');
    }
};
  
  document
    .querySelector("#deletepost")
    .addEventListener('click', deleteHandler);

//deleted edit post sections
