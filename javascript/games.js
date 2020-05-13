let db = firebase.database();
let spill = db.ref("Spill/spill");
let main = document.querySelector("main");

function visAlleSpill() {
    main.innerHTML = "";
    spill.orderByChild("nummer").on("child_added", visSpill);
}

// function (typer spill???)

function visSpill(snapshot) {
    let spill = snapshot.val();
    let spillNokkel = snapshot.key;

    main.innerHTML += `
    <div id="card" class="cards" ><h3>${spill.Navn} </h3>
			 <h3><img src="${spill.picture}" alt="${spill.Navn}" width="100%" height="100%"> <br> ${spill.Creator} </h3>
	
		</div>`;
}

window.onload = visAlleSpill;