
const touitResult = document.querySelector("#result-content");
const tweetForm = document.querySelector("#tweet-form");
let influencersToStyle = [];



//génération de touit et de son contenu, position en fonction des timestamp pour avoir du plus ancien au dernier même si quelqu'un mélange la base de donnée, ici je n'ai pas fait de template mais je travaille sur refaire ce projet en JSReact avec des templates, des callbacks, du SCSS, des components, des classes et des fichiers séparés //
function addTouit(name, message, ts, id, likes, comments_count){

    const touit = document.createElement("div");
    touit.role = "article";
    touit.className = "tweet";
    touit.setAttribute("data-timestamp", ts);
    touit.setAttribute("id", id);
    

    const person = document.createElement("div");
    person.className = "person";

    const pseudo = document.createElement("p");
    pseudo.textContent = name;
    
    const avatar = document.createElement("img");
    avatar.src = "./benoist.png";
    avatar.alt ="";
    avatar.className = "avatar";
    loadAvatar(name, avatar);


    const content = document.createElement("div");
    content.className = "content";

    const date = document.createElement("p");
    date.className = "date";
    date.textContent = tempsEcoulerTouit(ts);

    const msg = document.createElement("p");
    msg.className = "msg";
    msg.textContent = message;

    const interactions = document.createElement("div");
    interactions.className = "interactions";


    const likenb = document.createElement("span");
    likenb.className = "likes";
    likenb.textContent = likes;

    const moonButton = document.createElement("button");
    moonButton.className = "smallMoon";
    moonButton.addEventListener("click", () => {
        likeTouit(id, likenb) });
    //classname to toggle et mettre à jour le contenu du coup*/
    
    
    const commentdiv = document.createElement("button");
    commentdiv.className = "comments";
    commentdiv.textContent = "Commenter";
    commentdiv.addEventListener("click", () => {
        getComments(id, commentdiv);
    });
    

    const commentsnb = document.createElement("span");
    commentsnb.className = "commentsNb";
    commentsnb.textContent = comments_count;



    person.appendChild(pseudo);
    person.appendChild(avatar);
    content.appendChild(date);
    content.appendChild(msg);
    interactions.appendChild(moonButton);
    interactions.appendChild(likenb);
    interactions.appendChild(commentdiv);
    interactions.appendChild(commentsnb);

    touit.appendChild(person);
    touit.appendChild(content);  
    touit.appendChild(interactions);

    touitResult.appendChild(touit);
      
    
    let firstTweetTimestamp = touitResult.firstElementChild.getAttribute("data-timestamp");
     //s'il y en a pas ? cas d'erreurs à rajouter//
    if (ts > firstTweetTimestamp) {
        touitResult.insertBefore(touit, touitResult.firstElementChild);
    } else {
        touitResult.appendChild(touit);
    }
    /*petite animation pour que l'arrivée soit pas trop brutale*/
    setTimeout(function() {
        touit.classList.add("loaded");
        if (influencersToStyle.includes(name)) {
        touit.classList.add("influenceur-touit")
    }
    }, 100);
    
    
}

const pseudoInput = document.querySelector("#name");
const messageInput = document.querySelector("#msg");










/* valider l'envoie de mon touit et activation de la modale correspondante */

async function sendTweet(ev) {
    ev.preventDefault();

    const myPseudo = encodeURIComponent(pseudoInput.value);
    const myMessage = encodeURIComponent(messageInput.value);
    
    const response = await fetch(`bla.org/send`, {
        method:"POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${myPseudo}&message=${myMessage}`
    });

    if (response.ok) {
        
        const dialog = document.querySelector("#dialog-reussi");
        const closeButton = document.querySelector("#dialog-reussi button");
        
        dialog.showModal(); 

        closeButton.addEventListener("click", () => {
        dialog.close();
        });

    } else {
        const dialog = document.querySelector("#dialog-echoue");
        const closeButton = document.querySelector("#dialog-echoue button");

        dialog.showModal(); 

        closeButton.addEventListener("click", () => {
        dialog.close();
        });
    }
}
tweetForm.addEventListener("submit", sendTweet);



















/* Chercher les touits sur l'API, récupérer les infos nécéssaires et lancer les fonctions nécéssaire a géré le load après avec le bouton 
//86400000 = 24h 
Je récupère aussi les ID pour vérifier qui a déjà été load et afficher afin de pas générer deux fois les même touit
Deux essais de boucles mais je préfère finalement faire une boucle standard et réfléchir à l'utilisation de i
attention je rajoute maintenant les likes et comments et je dois aussi gérer leur mise à jour maintenant du coup
attention des gens ont spammé énormément dans l'école j'ai rajouté un timeout pour l'instant*/


let todayTimestamp = new Date().getTime() - 43200000;
let displayedTweetIds = new Set();
console.log(todayTimestamp);

async function loadTweets(todayTimestamp) {
    const response = await fetch(`bla.org/list?ts=${todayTimestamp}`, {
        method:"GET"
    });

    if (response.ok) {
        const object = await response.json();
        const messages = object.messages;
        
        for (let i = 0; i < messages.length; i++){
            let reversedI = messages.length - 1 - i;
            let tweetId = messages[reversedI].id;

            if (!displayedTweetIds.has(tweetId)) {

                let timestamp = messages[reversedI].ts;
                addTouit(messages[reversedI].name, messages[reversedI].message, timestamp, messages[reversedI].id, messages[reversedI].likes, messages[reversedI].comments_count);
                displayedTweetIds.add(tweetId);
            } 
        }
        /*
        for (let i = messages.length - 1; i >= 0; i--) {
            let tweetId = messages[i].id;

            if (!displayedTweetIds.has(tweetId)) {

                let timestamp = messages[i].ts;
                //let dateMessage = tempsEcoulerTouit(timestamp);
                addTouit(messages[i].name, messages[i].message, timestamp, messages[i].id);
                displayedTweetIds.add(tweetId);
            } 
        }*/
        
    } else {
        console.log("erreur load tweets");
    }
}

addEventListener("load", loadTweets(todayTimestamp));




/*function du bouton pour récupérer 24h de touit de plus */
document.querySelector("#loadMore").addEventListener("click", loadOlder);
function loadOlder() {
    todayTimestamp -= 86400000;
    let before = todayTimestamp;
    loadTweets(before);
}












/*functions de mise à jour et update de timestamp */
/*ajout d'un timeout temporaire */
async function loadLastTweets(){
    updateTimestamps();
    let lastTimestamp = touitResult.firstElementChild.getAttribute("data-timestamp");
    loadTweets(lastTimestamp);
}

async function refreshTweets(){
    setInterval(loadLastTweets,10000);
}
 
setTimeout(refreshTweets, 1000);


function updateTimestamps() {
    const tweets = document.querySelectorAll(".tweet");
    tweets.forEach(tweet => {
        const timestamp = parseInt(tweet.getAttribute("data-timestamp"));

        const dateElement = tweet.querySelector(".date");
        const updatedSince = tempsEcoulerTouit(timestamp);

        dateElement.textContent = updatedSince;
    })
}
























/*réfléchir au load du grand nombre d'avatar */
/*function de génération d'avatar */
async function loadAvatar(username, element) {
    const response = await fetch(`bla.org/avatar/get?username=${username}`, {
        method:"GET", 
        headers: {
            'Content-Type': 'image/png'
        },
    });

    if (response.ok) {
        const avatar = await response.blob();
        const avatarImg = URL.createObjectURL(avatar);
        element.src = avatarImg;
    } else {
        console.log("erreur avatars");
    }
}















/*Récupérer les influenceurs sur l'API et générer l'accordeon qui correspond, j'ai essayé deux méthodes de récupérations en dehors de la fonction push dans un array ou return j'ai pris l'array*/

const influencersContent = document.querySelector("#influencers-content");

function top10Influencers(name) {

    const influencer = document.createElement("div");
    influencer.className = "influencer";

    const pseudo = document.createElement("p");
    pseudo.textContent = name;

    influencer.appendChild(pseudo);
    influencersContent.appendChild(influencer);
}

async function topAuteursActif() {
    const responseInfluencers = await fetch(`bla.org/influencers?count=11`, {
        method:"GET"
    });

    if (responseInfluencers.ok) {
        //const tryReturnMethod = []; 
        const topInfluencers = await responseInfluencers.json();
        const influencer = topInfluencers.influencers;
        
        const listInfluencers = Object.keys(influencer);
        for (let i = 0; i < 10 ; i++) {

            top10Influencers(listInfluencers[i]);
            influencersToStyle.push(listInfluencers[i]);
            //tryReturnMethod.push(listInfluencers[i]);
        }
        //return tryReturnMethod;
    } else {
        console.log("erreur get top auteurs");
    }
}
//const influencersToStyle = await topAuteursActif();
addEventListener("load", topAuteursActif);

















/*Activer les accordeons a l'appuie du bouton */
const acc = document.querySelectorAll(".accordeon");

for (let i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
    }
}













/*Récupérer les mots les plus courrants sur l'API, les trier et générer l'accordeon qui correspond pour l'instant selection du top 20*/

async function topUsedWords() {
    const responseWord = await fetch(`bla.org/trending`, {
        method:"GET"
    });

    if (responseWord.ok) {
        const topWords = await responseWord.json();
        let orderWords = Object.entries(topWords);
        let sortedWords = orderWords.sort((a, b) => b[1] - a[1]);
       
        for (let i = 0; i < 20 && i < sortedWords.length; i++) {
            top20Words(sortedWords[i][0], sortedWords[i][1]);
        }
    } else {
        console.log("erreur get top words");
    }
}
addEventListener("load", topUsedWords);



const wordsContent = document.querySelector("#top-word-content");

function top20Words(word, count) {

    const words= document.createElement("span");
    words.className = "words";
    words.textContent = ` #${word}(${count}) `;

    wordsContent.appendChild(words);
}












/*
const commentAside = document.querySelector("comments");

    this toggle sur le coté et du coup affiche les commentaires de cet id
*/



/*récuperer les commentaires lié à un touit avec son id a changer plus tard pour le lier à un bouton qui ouvre un side*/
async function getComments(id, element) {
    const responseComments = await fetch(`bla/list?message_id=${id}`, {
        method:"GET"
    });

    if (responseComments.ok) {
        const object = await responseComments.json();
        const commentaires = object.comments;
       
        if (commentaires.length > 0) {
            for (let i = 0; i < commentaires.length; i++) {
            const commentateur = commentaires[i].name;
            const commentaire = commentaires[i].comment;
            element.textContent =  ` ${commentateur} : ${commentaire} `;
            } 
        } 
    } else {
        console.log("erreur get comments");
    }
}


















/*calculer depuis combien de temps le touit est là manuellement, chercher mieux, méthode return*/

function tempsEcoulerTouit(tsTouit) {

    const currentTimestamp = Date.now();
    const difference = currentTimestamp - tsTouit;

    if (difference < 0 ) {
        return ('Dans le futur');
    }

    const sDifference = Math.floor(difference / 1000);
    const sDiff = (sDifference % 60);

    const mDifference = Math.floor(sDifference / 60);
    const mDiff = (mDifference % 60);

    const hDifference = Math.floor(mDifference / 60);
    const hDiff = (hDifference % 24);

    const dDifference = Math.floor(hDifference / 24);

    if (dDifference > 0) {
        return ('il y a ' + dDifference + 'j ' + hDiff + 'h ' + mDiff + ' min ');
    } else if (hDiff > 0 ) {
        return ('il y a ' + hDiff + 'h ' + mDiff + 'min ');
    } else if (mDiff > 0 ) {
        return ('il y a ' + mDiff + 'min ');
    } else {
        return ('il y a ' + sDiff + 'sec ');
    }
}











/*function qui increase like */
async function likeTouit(id, likenb) {

    const idTouit = encodeURIComponent(parseInt(id));

    const likeResponse = await fetch(`bla/likes/send`, {
        method:"PUT",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `message_id=${idTouit}`
    });
    if (likeResponse.ok) {
        const like = await likeResponse.json(); 
        onLike(id, likenb);   
    } else {
        console.log("erreur like");
    }
}



async function onLike(id, likenb) {
    const response = await fetch(`bla/get?id=${id}`, {
        method:"GET"
    });

    if (response.ok) {
        const object = await response.json();
        const likeCount = object.data.likes;
        console.log(likeCount);
        likenb.textContent = likeCount;
        
    } else {
        console.log("erreur onLike");
    }
}