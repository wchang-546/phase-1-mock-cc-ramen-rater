/** Basic deliverables 
 [X] See all ramen images in div #ramen-menu. 
 - using img tag fetch 
 [X] Click on a #ramen-menu image and see all the info about the ramen inside the #ramen-detail div.
 - name, rating, comment.
 [X] Create a new ramen using the form submit, and added to the #ramen-menu div. 
 - This can be DOM manipulation, not a PATCH request. 
 Advanced Deliverables: 
 [X] See first ramen info on page load without clicking an image. 
 [X] Update rating and comment, without persisting. 

 Extra Advanced Deliverables: 
 [ ] Persist rating and comment updates. (PATCH)
 [ ] Persist new ramens that are created. (POST)
 [ ] Persist any ramen deletions. (DELETE)
 */



fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(json => {
        let ramenInfo = json; 
        ramenInfo.forEach(ramen => {
            ramenInfoInBar(ramen);
        })

        showRamenDetail(ramenInfo[0]);
        addRamenToBar();
        updateRatingComment();
        
    })
    .catch(error => {console.log(error.message)});
    

function ramenInfoInBar(ramen){
    const createRamenImg = document.createElement("img") 
    document.getElementById("ramen-menu").appendChild(createRamenImg)
    createRamenImg.src = ramen.image
    createRamenImg.alt = ramen.name

    createRamenImg.addEventListener("click", () => {
        showRamenDetail(ramen)
    });
};

function showRamenDetail(ramen){
    document.querySelector(".detail-image").src = ramen.image;
    document.querySelector(".name").textContent = ramen.name;
    document.querySelector(".restaurant").textContent = ramen.restaurant;
    document.querySelector("#rating-display").textContent = ramen.rating;
    document.querySelector("#comment-display").textContent = ramen.comment;
};


function addRamenToBar(){
    document.querySelector("#new-ramen").addEventListener('submit', (e) => {
        e.preventDefault();
        
        const createRamenImg = document.createElement("img") 
        createRamenImg.src = e.target["image"].value
        createRamenImg.alt = e.target["name"].value

        document.getElementById("ramen-menu").appendChild(createRamenImg)

        e.target.reset();
    });    
};

function updateRatingComment(){
    document.getElementById("edit-ramen").addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById("rating-display").textContent = e.target["rating"].value
        document.getElementById("comment-display").textContent = e.target["new-comment"].value
    });
};

