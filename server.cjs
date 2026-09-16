const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const {compare} = require('./market-core.cjs');
const root = __dirname;
let cache, cachedAt = 0;
async function data() {
  const now = Date.now();
  if (!process.env.ODDS_API_KEY) {
    const games = [{id:'sample-buf-bal',home:'Buffalo Bills',away:'Baltimore Ravens',kickoff:new Date(now+86400000).toISOString(),books:[]}];
    games[0].books = [['draftkings','DraftKings',-145,125],['fanduel','FanDuel',-150,130],['betmgm','BetMGM',-140,120]].map(([id,name,homeOdds,awayOdds])=>({id,name,homeOdds,awayOdds,home:games[0].home,away:games[0].away,timestamp:new Date(now-60000).toISOString(),source:'Synthetic sample'}));
    return {mode:'sample',games,predictions:[{gameId:games[0].id,homeProbability:0.64,timestamp:new Date(now-300000).toISOString(),featureCutoff:new Date(now-3600000).toISOString(),probabilityBasis:'decisive_result',modelVersion:'sample-v1',confidence:'Moderate',factors:['QB efficiency','Defensive efficiency','Home field'],uncertainties:['Injury updates','Lineup changes','Weather and information released after prediction']}]};
  }
  if (cache && now-cachedAt<60000) return cache;
  const url = new URL('https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/');
  url.search = new URLSearchParams({apiKey:process.env.ODDS_API_KEY,regions:'us',markets:'h2h',oddsFormat:'american'});
  const response = await fetch(url,{signal:AbortSignal.timeout(15000)});
  if (!response.ok) throw new Error(`Odds provider returned ${response.status}`);
  const payload = await response.json();
  const games = payload.map(event=>({id:event.id,home:event.home_team,away:event.away_team,kickoff:event.commence_time,books:event.bookmakers.flatMap(book=>{
    const market = book.markets.find(m=>m.key==='h2h');
    if (!market || market.outcomes.length !== 2) return [];
    return [{id:book.key,name:book.title,home:event.home_team,away:event.away_team,homeOdds:market.outcomes.find(o=>o.name===event.home_team)?.price,awayOdds:market.outcomes.find(o=>o.name===event.away_team)?.price,timestamp:market.last_update || book.last_update,source:'The Odds API'}];
  })}));
  let predictions = [];
  if (process.env.PREDICTIONS_FILE) predictions = JSON.parse(await fs.readFile(process.env.PREDICTIONS_FILE,'utf8'));
  await fs.mkdir(path.join(root,'.market-data'),{recursive:true});
  await fs.writeFile(path.join(root,'.market-data',`${now}.json`),JSON.stringify({ingestedAt:new Date(now).toISOString(),payload,predictions}));
  cache = {mode:'live',games,predictions}; cachedAt = now;
  return cache;
}
const server = http.createServer(async(req,res)=>{
  try {
    const url = new URL(req.url,'http://localhost');
    if (url.pathname.startsWith('/api/')) {
      const d = await data();
      const parts = url.pathname.split('/').filter(Boolean);
      const name = parts[1], id = parts[2];
      const comparisons = d.games.map(g=>compare(g,d.predictions.find(p=>p.gameId===g.id),Date.now(),url.searchParams.get('book') || ''));
      let result;
      if (name==='market-scanner') result = {mode:d.mode,updatedAt:new Date().toISOString(),comparisons};
      else if (name==='games' && id==='upcoming') result = d.games.filter(g=>Date.parse(g.kickoff)>Date.now());
      else if (name==='predictions') result = d.predictions.find(p=>p.gameId===id);
      else if (name==='markets') result = d.games.find(g=>g.id===id)?.books;
      else if (name==='market-comparison') result = comparisons.find(c=>c.game.id===id);
      if (result===undefined) {res.writeHead(404);res.end();return;}
      res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(result));return;
    }
    const files = {'/':'index.html','/index.html':'index.html','/app.js':'app.js','/styles.css':'styles.css','/market.html':'market.html','/market.js':'market.js'};
    const file = files[url.pathname];
    if (!file) {res.writeHead(404);res.end();return;}
    res.writeHead(200,{'Content-Type':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html'});
    res.end(await fs.readFile(path.join(root,file)));
  } catch {res.writeHead(502,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Market data unavailable. Check provider configuration and prediction input.'}));}
});
server.listen(Number(process.env.PORT || 4173),'127.0.0.1',()=>console.log(`Sports analytics: http://127.0.0.1:${server.address().port}`));
