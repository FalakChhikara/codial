$("#Friendusers").on("click", ".toggle_friend", toggle_friend);
$("#Generalusers").on("click", ".toggle_friend", toggle_friend);

function newfriendtag(id, status, name, addRem){
    return $(`
        <div id="usersProfile-${id}">
        <small>
        <li>
        <a id="usersProfile-${id}" href="/users/profile/${id}">${name}</a>
        <a class="toggle_friend" href="/friends/addRemoveFriend/?status=${status}&id=${id}"> ${addRem} </a>
        </li>
        </small><br>
        </div>
    `);
}

function toggle_friend(event){
    event.preventDefault();
    let temp = this;
    $.ajax({
        type: 'post',
        url: $(this).attr("href"),

        success: function(data){
            if(data.data.addedFriend)
            {
                // add to friendlist
                let newPost = newfriendtag(data.data.id,"Remove",data.data.name,"Remove Friend");
                $(`#usersProfile-${data.data.id}`).remove();
                $("#FriendusersList").prepend(newPost);

            }else{
                // add to General List
                let newPost = newfriendtag(data.data.id,"Add",data.data.name,"Add Friend");
                $(`#usersProfile-${data.data.id}`).remove();
                $("#GeneralusersList").prepend(newPost);
            }
            
            
        },
        error: function(error){
            // console.log(error.responseText);
            console.log("error");
        }
    });
}
