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


let ramenInfo;
let currentRamen;

fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(json => {
        ramenInfo = json; 
        ramenInfo.forEach(ramen => {
            ramenInfoInBar(ramen);
        })

        showRamenDetail(ramenInfo[0]);

        addRamenToBar();

        updateRatingComment();
        
    })
    .catch(error => {console.log(error.message)})
    

function ramenInfoInBar(ramen){
    let ramenImgLocation = document.querySelector("#ramen-menu")
    let ramenImg = document.createElement("img")
    ramenImg.src = ramen.image
    ramenImg.alt = ramen.name
    ramenImgLocation.appendChild(ramenImg)

    ramenImg.addEventListener("click", () => {
        showRamenDetail(ramen);
    })
};

function showRamenDetail(ramen){
    currentRamen = ramen;
    
    let ramenName = document.querySelector(".name");
    let ramenImg = document.querySelector(".detail-image");
    let ramenRestaurant = document.querySelector(".restaurant");
    let ramenComment = document.getElementById("comment-display");
    let ramenRating = document.getElementById("rating-display");

    ramenName.textContent = ramen.name;
    ramenImg.src = ramen.image;
    ramenRestaurant.textContent = ramen.restaurant;
    ramenComment.textContent = ramen.comment;
    ramenRating.textContent = ramen.rating;
};

function addRamenToBar(){
    const ramenForm = document.querySelector("#new-ramen")

    ramenForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let ramenInfoLocation = document.querySelector('#ramen-menu');
        let newRamenImg = document.createElement("img")

        const addRamenImg = e.target["image"].value

        newRamenImg.alt = e.target["name"].value
        newRamenImg.src = addRamenImg;
        ramenInfoLocation.appendChild(newRamenImg)

        e.target.reset();
    })    
};

function updateRatingComment(){
    const updateForm = document.querySelector("#edit-ramen")
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        let ramenRatingUpdateLocation = document.querySelector("#rating-display")
        let ramenCommentUpdateLocation = document.querySelector("#comment-display")

        const updateRamenRating = e.target["rating"].value
        const updateRamenComment = e.target["new-comment"].value

        ramenRatingUpdateLocation.textContent = updateRamenRating
        ramenCommentUpdateLocation.textContent = updateRamenComment
    })
}

