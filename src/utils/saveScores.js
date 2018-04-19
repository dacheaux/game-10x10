/**
* Saves time for a level
@param time {number} - full time for this level
@param times {array} - times between two clicks
*/
import { store } from '../index';
import { onWinOrLose } from '../actions';

export default (time, times, gameProps, gameLogic) => {
  const { level, player, players } = gameProps;
  const { levelSquares, checkedSquares } = gameLogic;
  const { scores } = player;

  const newPlayers = players.filter(item => item.name !== player.name);
  if (time !== null) {
    const timeChart = times.map((e, i, arr) => Math.round((e - arr[0]) / 1000));
    timeChart.splice(0, 1);
    let levelScores = scores[`level${level}`];
    if (!levelScores) {
      levelScores = {
        timesCompleted: 1,
        topTime: time,
        allTimes: [time],
        topTimeChart: timeChart
      };
    } else {
      ++levelScores.timesCompleted;
      if (levelScores.allTimes) {
        levelScores.allTimes.push(time);
        levelScores.allTimes.sort((a, b) => a - b);
      } else {
        levelScores.allTimes = [time];
      }
      if (time < levelScores.topTime || !levelScores.topTime) {
        levelScores.topTime = time;
        levelScores.topTimeChart = timeChart;
      }
    }
    if (level >= player.level) ++player.level;
    if (player.level > 99) player.level = 99;
    ++player.lives;
    newPlayers.push(player);
    store.dispatch(onWinOrLose(player, newPlayers));
    player.scores[`level${level}`] = levelScores;
  } else {
    player.lives = player.lives - (levelSquares.length - checkedSquares.length);
    if (player.lives < 0) player.lives = 0;
    newPlayers.push(player);
    store.dispatch(onWinOrLose(player, newPlayers));
  }
  localStorage.setItem('player--game-100hops', JSON.stringify(player));
  localStorage.setItem('players--game-100hops', JSON.stringify(newPlayers));
};
