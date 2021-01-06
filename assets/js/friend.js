$("#allPeople").on("click", ".toggle_friend", toggle_friend);

function toggle_friend(event){
    event.preventDefault();
    let temp = this;
    $.ajax({
        type: 'post',
        url: $(this).attr("href"),

        success: function(data){
            if(data.data.addedFriend)
            {
                $(temp).attr("friendStatus", "notAdded");
                $(temp).text(`Remove`);
            }else{
                $(temp).attr("friendStatus", "Added");
                $(temp).text(`Add Friend`);
            }
            
            
        },
        error: function(error){
            // console.log(error.responseText);
            console.log("error");
        }
    });
}