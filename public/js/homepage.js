//DELETE A COMMENT
const deleteHandler = async function (event) {
      const id = this.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        // alert('Unable to delete comment. You may only delete your own comments. Please verify you are logged in, and try again.');
        console.log('unable to delete comment');
      }
  };
    
 let deletecomments =  document
      .querySelectorAll(".deletecomment")

for(let i=0; i < deletecomments.length; i++) {
  deletecomments[i].addEventListener('click', deleteHandler);
}

     