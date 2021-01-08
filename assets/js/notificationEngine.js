

class NotificationEngine{
    constructor(selfId){
        this.selfId = selfId;
        this.roomName = "Notificaion-"+selfId;
        this.socket = io.connect('http://localhost:8080', { transports: ['websocket', 'polling', 'flashsocket'] }); // connet to server .on("connection")
        
        if(selfId){
            console.log(this.roomname);
            this.connectionHandler();
        }
        
    }

    connectionHandler(){
        let self = this;
        self.socket.on('connect', function(){
            console.log("socket notification is connected");

            self.socket.emit("joinRoom",{
                chatroom : self.roomName,
                userId : self.selfId,
            });

        });

        $("#postlist").on("click", ".Likes", function(event){
            Likes(event,self,this);
        });

        self.socket.on("sendingMsdToPerson",function(data){
            if(self.selfId != data.from)
            {
                new Noty({
                theme: 'relax',
                text: `${data.tag} ${data.content} is liked by <a href="/users/profile/${data.from}"> ${data.name}</a>`,
                type: 'success',
                layout: 'bottomLeft',
                timeout: 1500
                
                }).show();
            }
            
        });

        $('.Cform').submit('.CommentForm',function(event){
            createComment(event,self,this);
        });

        self.socket.on("sendingCommentNotiToPerson",function(data){
            if(self.selfId != data.from)
            {
                // console.log("falanjsnjsncjncjs");
                new Noty({
                    theme: 'relax',
                    text: `<a href="/users/profile/${data.from}">${data.name}</a> commented on your post`,
                    type: 'success',
                    layout: 'bottomLeft',
                    timeout: 1500
                    
                }).show();
            }
            
        });
        

    }


    

}
