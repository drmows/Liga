document.addEventListener("DOMContentLoaded", function () {
    fetch('../data/players.json')
        .then(response => response.json())
        .then(data => {
            const players = data.players;
            const player1Select = document.getElementById("player1");
            const player2Select = document.getElementById("player2");
            const winnerSelect = document.getElementById("winner");

            players.forEach(player => {
                const option1 = document.createElement("option");
                option1.value = player.name;
                option1.textContent = player.name;
                player1Select.appendChild(option1);

                const option2 = document.createElement("option");
                option2.value = player.name;
                option2.textContent = player.name;
                player2Select.appendChild(option2);

                const option3 = document.createElement("option");
                option3.value = player.name;
                option3.textContent = player.name;
                winnerSelect.appendChild(option3);
            });
        });

    function calculateMMRChange(player1MMR, player2MMR, result1, result2) {
        const mmrDifference = player1MMR - player2MMR;
        let points1 = 0;
        let points2 = 0;

        if (result1 > result2) {
            if (mmrDifference >= 130) {
                points1 = 10;
                points2 = -25;
            } else if (mmrDifference >= 80) {
                points1 = 15;
                points2 = -25;
            } else if (mmrDifference >= 30) {
                points1 = 20;
                points2 = -20;
            } else if (mmrDifference >= -30) {
                points1 = 25;
                points2 = -15;
            } else if (mmrDifference >= -80) {
                points1 = 30;
                points2 = -10;
            } else if (mmrDifference >= -130) {
                points1 = 35;
                points2 = -5;
            } else {
                points1 = 40;
                points2 = -5;
            }
        } else {
            if (mmrDifference >= 130) {
                points1 = -25;
                points2 = 10;
            } else if (mmrDifference >= 80) {
                points1 = -25;
                points2 = 15;
            } else if (mmrDifference >= 30) {
                points1 = -20;
                points2 = 20;
            } else if (mmrDifference >= -30) {
                points1 = -15;
                points2 = 25;
            } else if (mmrDifference >= -80) {
                points1 = -10;
                points2 = 30;
            } else if (mmrDifference >= -130) {
                points1 = -5;
                points2 = 35;
            } else {
                points1 = -5;
                points2 = 40;
            }
        }

        return { points1, points2 };
    }

    function submitMatch() {
        console.log("submitMatch function triggered");
        const player1Name = document.getElementById("player1").value;
        const player2Name = document.getElementById("player2").value;
        const winnerName = document.getElementById("winner").value;
        const destructionPoints1 = parseInt(document.getElementById("destructionPoints1").value);
        const destructionPoints2 = parseInt(document.getElementById("destructionPoints2").value);
    
        console.log("Player 1:", player1Name);
        console.log("Player 2:", player2Name);
        console.log("Winner:", winnerName);
    
        fetch('../data/players.json')
            .then(response => response.json())
            .then(data => {
                const players = data.players;
                const player1 = players.find(player => player.name === player1Name);
                const player2 = players.find(player -> player.name === player2Name);
                const initialMMR1 = player1.points;
                const initialMMR2 = player2.points;
    
                const result1 = winnerName === player1Name ? 1 : 0;
                const result2 = winnerName === player2Name ? 1 : 0;
    
                const { points1, points2 } = calculateMMRChange(initialMMR1, initialMMR2, result1, result2);
    
                player1.points += points1;
                player2.points += points2;
                player1.destructionPoints += destructionPoints1;
                player2.destructionPoints += destructionPoints2;
                player1.games++;
                player2.games++;
    
                if (winnerName === player1Name) {
                    player1.wins++;
                    player2.losses++;
                } else {
                    player1.losses++;
                    player2.wins++;
                }
    
                player1.winrate = (player1.wins / player1.games) * 100;
                player2.winrate = (player2.wins / player2.games) * 100;
    
                console.log("Updated Player 1 MMR:", player1.points);
                console.log("Updated Player 2 MMR:", player2.points);
    
                const newResult = {
                    player1: player1Name,
                    player2: player2Name,
                    initialMMR1,
                    initialMMR2,
                    points1,
                    points2,
                    destructionPoints1,
                    destructionPoints2,
                    winner: winnerName
                };
    
                console.log("New result:", newResult);
    
                fetch('../data/results.json')
                    .then(response => response.json())
                    .then(resultsData => {
                        resultsData.results.push(newResult);
                        return fetch('../data/results.json', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(resultsData)
                        });
                    })
                    .then(() => {
                        const resultsTable = document.getElementById("results-table").getElementsByTagName('tbody')[0];
                        const newRow = resultsTable.insertRow();
                        newRow.innerHTML = `
                            <td>${player1Name}</td>
                            <td>${player2Name}</td>
                            <td>${initialMMR1}</td>
                            <td>${initialMMR2}</td>
                            <td>${points1}</td>
                            <td>${points2}</td>
                            <td>${destructionPoints1}</td>
                            <td>${destructionPoints2}</td>
                            <td style="color: ${winnerName === player1Name ? 'green' : 'red'}">${winnerName}</td>
                        `;
                        console.log("New row added to table");
                    });
            });
    }