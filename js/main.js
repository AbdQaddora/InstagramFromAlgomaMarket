let posts;
fetch("../json/posts.json")
    .then(response => response.json())
    .then(temp => {
        posts = temp;
        let rand = Math.floor(Math.random() * posts.sport.length);
        postGenrator(posts.sport[rand]);
        console.log(posts.sport[rand])
    })
    .catch(console.log("Error 1"))


function postGenrator(postJson) {
    let post = "";
    fetch("https://randomuser.me/api/").
        then(temp =>
            temp.json()
        ).then(x => {
            let name = x.results[0].name;
            console.log(name);
            userName = name.first + name.last;
            userImage = x.results[0].picture.medium;
            console.log(userImage);
            return [userName, userImage];
        }).then(arr => {
            post = `<div class="post">
                <div class="user">
                    <div>
                        <div class="userPic" style="background-image: url(${arr[1]});"></div>
                        <div class="userName">${arr[0]}</div>
                    </div>
                    <div><span class="material-icons more">more_vert</span></div>
                </div>
                <div class="post-img" style="background-image: url(${postJson.img});"></div>
                <div class="interaction">
                    <div>
                        <span class="material-icons like">favorite_border</span>
                        <span class="material-icons">comment</span>
                        <span class="material-icons">share</span>
                    </div>
    
                    <div><span class="material-icons">bookmark_border</span></div>
                </div>
                <div class="views"><span>${postJson.views}</span> views</div>
                <div class="content">${postJson.content}</div>
                </div>`;
            return post;
        }).then(post => { document.querySelector(".page").innerHTML = post })
        .catch(console.log("Error 2"));
}
