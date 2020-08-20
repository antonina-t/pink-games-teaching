import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/*
 * Returns a promise holding an array of our score objects.
 * game parameter is either "memory", "snake" or "minesweeper" (collection id)
 */
export function fetchLeaderboard(game) {
  const auth = firebase.auth();
  const db = firebase.firestore();
  return auth
    .signInAnonymously()
    .then(() => db.collection(game).orderBy("timeMs", "asc").get())
    .then((querySnapshot) => {
      let leaderboard = [];
      querySnapshot.forEach((document) => {
        leaderboard.push(document.data());
      });
      return leaderboard;
    })
    .catch(function (error) {
      console.log("Error getting leaderboard: ", error);
    });
}

/*
 * Returns a promise for saving the score
 */
export function saveScore(game, score) {
  const auth = firebase.auth();
  const db = firebase.firestore();
  return auth
    .signInAnonymously()
    .then(() => db.collection(game).add(score))
    .catch(function (error) {
      console.log("Error saving score: ", error);
    });
}
