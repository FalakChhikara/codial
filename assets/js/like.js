$("#postlist").on("click", ".Likes", Likes);

function Likes(event){
    event.preventDefault();
    let temp = this;
    let likesNumber = parseInt($(this).attr("data-likes"));
    console.log(this);
    $.ajax({
        type: 'post',
        url: $(this).attr("href"),

        success: function(data){
            if(data.data.dislike)
            {
                likesNumber -= 1;
            }else{
                likesNumber += 1;
            }
            $(temp).attr("data-likes", likesNumber);
            $(temp).text(`${likesNumber} Likes`);
            
        },
        error: function(error){
            // console.log(error.responseText);
            console.log("error");
        }
    });
}