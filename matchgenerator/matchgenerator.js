const spieler = [
    { name: 'Spieler 1', id: 1 },
    { name: 'Spieler 2', id: 2 },
    { name: 'Spieler 3', id: 3 },
    { name: 'Spieler 4', id: 4 },
    { name: 'Spieler 5', id: 5 },
    { name: 'Spieler 6', id: 6 }
];

let previousMatches = [];
let byeGamer = null;

function loadPlayers() {
    const spielerAuswahl = document.getElementById('spieler-auswahl');
    spielerAuswahl.innerHTML = '';
    spieler.forEach(spieler => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" name="spieler" value="${spieler.id}"> ${spieler.name}
        `;
        spielerAuswahl.appendChild(label);
    });
}

function generateMatches() {
    const selectedPlayers = Array.from(document.querySelectorAll('input[name="spieler"]:checked'))
        .map(input => parseInt(input.value));
    
    if (selectedPlayers.length < 2) {
        alert('Es müssen mindestens 2 Spieler ausgewählt werden.');
        return;
    }

    if (selectedPlayers.length % 2 !== 0) {
        if (byeGamer === null) {
            byeGamer = selectedPlayers[Math.floor(Math.random() * selectedPlayers.length)];
        } else {
            const index = selectedPlayers.indexOf(byeGamer);
            if (index > -1) {
                selectedPlayers.splice(index, 1);
            }
            byeGamer = selectedPlayers[Math.floor(Math.random() * selectedPlayers.length)];
        }
    }

    const matches = [];
    while (selectedPlayers.length >= 2) {
        const player1 = selectedPlayers.splice(Math.floor(Math.random() * selectedPlayers.length), 1)[0];
        const player2 = selectedPlayers.splice(Math.floor(Math.random() * selectedPlayers.length), 1)[0];
        matches.push([player1, player2]);
    }

    previousMatches.push(...matches);
    displayMatches(matches);
}

function displayMatches(matches) {
    const paarungenListe = document.getElementById('paarungen-liste');
    paarungenListe.innerHTML = '';
    matches.forEach(match => {
        const li = document.createElement('li');
        const player1 = spieler.find(s => s.id === match[0]).name;
        const player2 = spieler.find(s => s.id === match[1]).name;
        li.innerText = `${player1} vs ${player2}`;
        paarungenListe.appendChild(li);
    });

    if (byeGamer !== null) {
        const li = document.createElement('li');
        const byePlayer = spieler.find(s => s.id === byeGamer).name;
        li.innerText = `${byePlayer} hat ein Freilos`;
        paarungenListe.appendChild(li);
    }
}

window.onload = loadPlayers;