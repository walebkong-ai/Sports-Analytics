const byId = id=>document.getElementById(id);
const pct = p=>`${(p*100).toFixed(1)}%`;
const escapeText = value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let snapshot;
async function load() {
  try {
    const setupResponse = await fetch('/api/model-status');
    if (!setupResponse.ok) throw new Error('Model status unavailable');
    const setup = await setupResponse.json();
    byId('connectionStatus').textContent = `${setup.oddsConfigured?'Odds provider configured':'Odds provider key required'} · ${setup.predictions.length} baseline predictions${setup.generatedAt?' · Model updated '+new Date(setup.generatedAt).toLocaleString():''}`;
    const response = await fetch(`/api/market-scanner?book=${encodeURIComponent(byId('bookFilter').value)}`);
    if (!response.ok) throw new Error('Market data unavailable');
    snapshot = await response.json();
    byId('marketError').textContent = '';
    byId('marketStatus').textContent = `${snapshot.mode==='sample'?'Synthetic sample quotes and model':'Live provider quotes'} · ${new Date(snapshot.updatedAt).toLocaleString()}`;
    for (const [id,items] of [['teamFilter',snapshot.comparisons.flatMap(c=>[c.game.home,c.game.away])],['bookFilter',snapshot.comparisons.flatMap(c=>c.game.books.map(b=>b.id))]]) {
      const select = byId(id), selected = select.value;
      select.innerHTML = `<option value="">All ${id==='teamFilter'?'teams':'books'}</option>`+[...new Set(items)].map(v=>`<option>${escapeText(v)}</option>`).join('');
      select.value = selected;
    }
    render();
  } catch {byId('marketError').textContent = 'Market data unavailable. Run the Node server and check provider settings.';byId('scanner').replaceChildren();}
}
function render() {
  const rows = snapshot.comparisons.filter(c=>(!byId('teamFilter').value || [c.game.home,c.game.away].includes(byId('teamFilter').value)) && (!byId('confidenceFilter').value || c.prediction?.confidence===byId('confidenceFilter').value) && (c.gap===null || Math.abs(c.gap)>=Number(byId('gapFilter').value)));
  byId('scanner').innerHTML = rows.map(c=>`<article style="border-top:1px solid #ccd3d8;padding:24px 0"><h2>${escapeText(c.game.away)} at ${escapeText(c.game.home)}</h2><p>Kickoff ${escapeText(new Date(c.game.kickoff).toLocaleString())}</p>${c.warnings.length?`<p role="alert"><strong>DATA QUALITY WARNING</strong>: ${c.warnings.map(escapeText).join('; ')}</p>`:`<div class="history-grid"><div><span>Home model</span><strong>${pct(c.prediction.homeProbability)}</strong></div><div><span>Home market median</span><strong>${pct(c.consensus.median)}</strong></div><div><span>MODEL–MARKET GAP</span><strong>${c.gap>0?'+':''}${c.gap.toFixed(1)} pts</strong></div><div><span>${escapeText(c.classification)}</span><strong>${escapeText(c.prediction.confidence || 'Unspecified')}</strong></div></div><p>Mean ${pct(c.consensus.mean)} · Range ${pct(c.consensus.low)}–${pct(c.consensus.high)} · Dispersion ${(c.consensus.dispersion*100).toFixed(2)} pts · ${c.books.length} books</p><p>Away model ${pct(1-c.prediction.homeProbability)} · Away consensus ${pct(1-c.consensus.median)}</p><h3>Why model differs</h3><p>${(c.prediction.factors || []).map(escapeText).join(' · ') || 'No model factors supplied'}</p><p>Potential missing information: ${(c.prediction.uncertainties || ['Injuries','Lineup changes','Weather','Information released after model update']).map(escapeText).join(' · ')}</p><p>Model ${escapeText(c.prediction.modelVersion)} · Prediction ${escapeText(c.prediction.timestamp)}</p>`}<div class="table-wrap"><table><thead><tr><th>Book</th><th>Home odds</th><th>Away odds</th><th>Home no-vig</th><th>Margin</th><th>Quote UTC</th></tr></thead><tbody>${c.books.map(b=>`<tr><td>${escapeText(b.name)}</td><td>${b.homeOdds}</td><td>${b.awayOdds}</td><td>${pct(b.homeProbability)}</td><td>${pct(b.margin)}</td><td>${escapeText(b.timestamp)}</td></tr>`).join('')}</tbody></table></div></article>`).join('') || '<p>No matching games.</p>';
}
byId('bookFilter').addEventListener('change',load);
for (const id of ['teamFilter','gapFilter','confidenceFilter']) byId(id).addEventListener('input',()=>snapshot && render());
load();
setInterval(load,60000);
