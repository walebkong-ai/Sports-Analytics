function implied(odds) {
  if (!Number.isFinite(odds) || Math.abs(odds) < 100) throw new Error('Invalid American odds');
  return odds > 0 ? 100 / (odds + 100) : -odds / (-odds + 100);
}
function compare(game, prediction, now = Date.now(), bookFilter = '') {
  const warnings = [];
  const kickoff = Date.parse(game.kickoff);
  if (!Number.isFinite(kickoff) || kickoff <= now) warnings.push('Game has started or kickoff is invalid');
  const books = [];
  const seen = new Set();
  for (const book of [...game.books].sort((a,b) => Date.parse(b.timestamp)-Date.parse(a.timestamp))) {
    if (bookFilter && book.id !== bookFilter) continue;
    if (seen.has(book.id)) continue;
    const age = now - Date.parse(book.timestamp);
    if (!Number.isFinite(age) || age < 0 || age > 900000 || book.home !== game.home || book.away !== game.away) continue;
    try {
      const h = implied(book.homeOdds), a = implied(book.awayOdds);
      books.push({...book, homeProbability: h/(h+a), margin: h+a-1});
      seen.add(book.id);
    } catch {}
  }
  if (books.length < 2) warnings.push('Fewer than two fresh complete sportsbooks');
  const pt = Date.parse(prediction?.timestamp), cutoff = Date.parse(prediction?.featureCutoff);
  if (!prediction || prediction.gameId !== game.id || !Number.isFinite(prediction.homeProbability) || prediction.homeProbability < 0 || prediction.homeProbability > 1 || !Number.isFinite(pt) || pt > now || pt >= kickoff || !Number.isFinite(cutoff) || cutoff > pt || prediction.probabilityBasis !== 'decisive_result') warnings.push('Missing or invalid timestamped model prediction');
  if (warnings.length) return {game, books, warnings, gap: null};
  const values = books.map(b=>b.homeProbability).sort((a,b)=>a-b);
  const n = values.length;
  const median = n%2 ? values[(n-1)/2] : (values[n/2-1]+values[n/2])/2;
  const mean = values.reduce((a,b)=>a+b,0)/n;
  const gap = (prediction.homeProbability-median)*100;
  const abs = Math.abs(gap);
  return {game, prediction, books, warnings, gap, consensus: {median, mean, low:values[0], high:values[n-1], dispersion:Math.sqrt(values.reduce((s,p)=>s+(p-mean)**2,0)/n)}, classification:abs<2?'Model agrees with market':abs<5?'Small discrepancy':abs<8?'Meaningful discrepancy':'Large discrepancy - investigate'};
}
module.exports = {implied, compare};
