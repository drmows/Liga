const savePlayers = require('./db/savePlayers');

// Aufruf der Funktion zum Speichern der Spieler
savePlayers().catch(console.error);