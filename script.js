const db = firebase.database();
const Forum = db.ref("Forum");
const Categories = db.ref("Categories");
let secInnlegg = document.querySelector("secInnlegg")

  
let skjema = document.getElementById("impForm");
let inpText = document.getElementById("inpText");
let inpUser = document.getElementById("inpUser");
let inpTitle = document.getElementById("inpTitle");
let inpCategory =document.getElementById("inpCategory");
const inpBilde = document.querySelector("#inpBilde");

let secPokemon = document.getElementById("secInnlegg");

//Her kommer lyteren for databasen.  	

  
// Lytterfunksjon som kjører hver gang man trykker på submit.
function registrerInnlegg(event) {
    console.log("registrerInnlegg");
    // Vi forhindrer at 
    event.preventDefault();
    let key = inpTitle.value;
    let data = {
        Title: inpTitle.value,
        Text: inpText.value,
        Category: inpCategory.value,
        User: inpUser.value,
    };
    let Innlegg = Forum.child(key);
    Innlegg.set(data);
    
    // Nuller ut skjemaet
    skjema.reset();
}
function visKontakt(snapshot) {
  let Category = snapshot.key; // Primær-nøkkelen
  let Innlegg = snapshot.val();
  secFresh.innerHTML += `
    <h1 class="MenyHeader" onclick="showPost()">${Innlegg.Title}</h1>
    <div>${Innlegg.Text}</div><div> Category: ${Innlegg.Category}|      User: ${Innlegg.User}</div>`;
  console.log("vis Innlegg");
}
Forum.on("child_added", visKontakt);
function VisAlt(){
  secFresh.innerHTML = "";
Forum.orderByChild("Title").on("child_added", visKontakt)
}

function VisAction(){
  secFresh.innerHTML = "";
  Forum
      .orderByChild("Category")
      .equalTo("Action")
      .on("child_added", visKontakt);
 console.log("vis Action");
}

function VisMOBA(){
  secFresh.innerHTML = "";
  Forum
      .orderByChild("Category")
      .equalTo("MOBA")
      .on("child_added", visKontakt);
 console.log("vis MOBA");
}

function VisFPS(){
  secFresh.innerHTML = "";
  Forum
      .orderByChild("Category")
      .equalTo("FPS")
      .on("child_added", visKontakt);
 console.log("vis FPS");
}

function VisTycoon(){
  secFresh.innerHTML = "";
  Forum
      .orderByChild("Category")
      .equalTo("Tycoon")
      .on("child_added", visKontakt);
 console.log("vis Tycoon");
}

function VisStrategy(){
  secFresh.innerHTML = "";
  Forum
      .orderByChild("Category")
      .equalTo("Strategy")
      .on("child_added", visKontakt);
 console.log("vis Strategy");
}

function VisShooter(){
  secFresh.innerHTML = "";
  Forum
      .orderByChild("Category")
      .equalTo("Shooter")
      .on("child_added", visKontakt);
 console.log("vis Shooter");
}

function showPost() {
  var x = document.getElementById("ShowPost");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}



