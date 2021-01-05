console.log("comment ajax");


// method to create a post in DOM
let newcomment = function(comment){
    return $(`
            <div id="comment-${comment._id}">
            <li><p>${comment.content} 
                <small>
                    
                    ${comment.user.name}
                        <a class="deleteComment" href="/comment/delete/${comment._id}">delete comment</a>

                </small></p> </li>
            </div>
            `
);}


// method to submit the form data for new post using AJAX
let createComment = function(event){
    event.preventDefault();
    console.log(this);
    console.log("inside createComment");
    let commentId = $(event.target).attr("id");
    let postId = commentId.split("-")[1];
    let textarea = event.target.childNodes[1];
    let commentForm = $(`#${commentId}`);
    $.ajax({
        type: 'post',
        url: "/comment/create",
        data: commentForm.serialize(), // convert form data into JSON
        
        // after success data is returned from controller
        success: function(data){
            console.log("before data");
            console.log(data);

            let newComment = newcomment(data.data.comment);
            console.log($(`#commentlist-${postId}`).prepend(newComment));
            $(textarea).val('');
            new Noty({
                theme: 'relax',
                text: "Comment published!",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();
            
        },
        error: function(error){
            console.log(error.responseText);
        }
    });
    return false;
}



$('.Cform').submit('.CommentForm',createComment)
$("#postlist").on('click','.commentlist .deleteComment', deleteComment)







function deleteComment(event){
    event.preventDefault();
    console.log("falak in deletecomment");
    console.log(this);
    let pathurl = $(this).attr("href");
    $.ajax({
        type: 'get',
        url: pathurl,

        success: function(data){
            console.log(data);
            $(`#comment-${data.data.comment_id}`).remove();
            new Noty({
                theme: 'relax',
                text: "comment deleted",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();
            
        },
        error: function(error){
            // console.log(error.responseText);
            console.log("error");
        }
    });
}
