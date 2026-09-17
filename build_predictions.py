"""Build a prospective NFL Elo baseline from public completed-game results."""
import csv
import io
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import urlopen
from zoneinfo import ZoneInfo

SOURCE = 'https://raw.githubusercontent.com/nflverse/nfldata/master/data/games.csv'
NAMES = dict(zip(
    'ARI ATL BAL BUF CAR CHI CIN CLE DAL DEN DET GB HOU IND JAX KC LA LAC LV MIA MIN NE NO NYG NYJ PHI PIT SEA SF TB TEN WAS'.split(),
    ['Arizona Cardinals','Atlanta Falcons','Baltimore Ravens','Buffalo Bills','Carolina Panthers','Chicago Bears','Cincinnati Bengals','Cleveland Browns','Dallas Cowboys','Denver Broncos','Detroit Lions','Green Bay Packers','Houston Texans','Indianapolis Colts','Jacksonville Jaguars','Kansas City Chiefs','Los Angeles Rams','Los Angeles Chargers','Las Vegas Raiders','Miami Dolphins','Minnesota Vikings','New England Patriots','New Orleans Saints','New York Giants','New York Jets','Philadelphia Eagles','Pittsburgh Steelers','Seattle Seahawks','San Francisco 49ers','Tampa Bay Buccaneers','Tennessee Titans','Washington Commanders']))
ALIASES = {'OAK':'LV','SD':'LAC','STL':'LA'}

def team(code):
    return ALIASES.get(code, code)

def probability(home, away, neutral=False):
    return 1 / (1 + 10 ** ((away-home-(0 if neutral else 55))/400))

def build(text, now):
    rows = sorted(csv.DictReader(io.StringIO(text)), key=lambda r: (r['gameday'], r['game_id']))
    ratings, counts, latest = {}, {}, {}
    season = None
    validation = []
    eastern = now.astimezone(ZoneInfo('America/New_York'))
    for row in rows:
        if row['game_type'] not in ('REG', 'WC', 'DIV', 'CON', 'SB'):
            continue
        if row['gameday'] >= eastern.date().isoformat():
            continue  # Same-day results are excluded even if scores appear in the feed.
        if not row['home_score'] or not row['away_score']:
            continue
        year = int(row['season'])
        if season != year:
            ratings = {t: 1500 + (v-1500)*.75 for t,v in ratings.items()}
            season = year
        h, a = team(row['home_team']), team(row['away_team'])
        hr, ar = ratings.get(h,1500), ratings.get(a,1500)
        p = probability(hr,ar,row['location']=='Neutral')
        hs, aws = float(row['home_score']), float(row['away_score'])
        y = 1 if hs>aws else 0 if hs<aws else .5
        if year >= eastern.year-3 and hs != aws:
            validation.append((p,y))
        update = 20*(y-p)
        ratings[h], ratings[a] = hr+update, ar-update
        for t in (h,a):
            counts[t] = counts.get(t,0)+1
            latest[t] = row['gameday']
    timestamp = now.isoformat()
    predictions = []
    for row in rows:
        if int(row['season']) != eastern.year or not row['gametime']:
            continue
        kickoff = datetime.fromisoformat(row['gameday']+'T'+row['gametime']).replace(tzinfo=ZoneInfo('America/New_York')).astimezone(timezone.utc)
        if kickoff <= now:
            continue
        h,a = team(row['home_team']),team(row['away_team'])
        if h not in NAMES or a not in NAMES or min(counts.get(h,0),counts.get(a,0))<16:
            continue
        # Refuse current predictions when either team's results feed is out of date.
        if min(int(latest[h][:4]),int(latest[a][:4])) < eastern.year-1:
            continue
        hr,ar = ratings[h],ratings[a]
        if int(row['season']) != season:
            hr,ar = 1500+(hr-1500)*.75,1500+(ar-1500)*.75
        p = probability(hr,ar,row['location']=='Neutral')
        strength = max(p,1-p)
        confidence = 'Toss-up' if strength<.55 else 'Slight edge' if strength<.62 else 'Moderate' if strength<.7 else 'Strong signal'
        predictions.append(dict(scheduleId=row['game_id'],home=NAMES[h],away=NAMES[a],kickoff=kickoff.isoformat(),homeProbability=p,timestamp=timestamp,featureCutoff=timestamp,probabilityBasis='decisive_result',modelVersion='elo-results-v1-k20-h55-r75',confidence=confidence,source=SOURCE,lastCompletedGames={h:latest[h],a:latest[a]},factors=[f'Completed-game Elo: {h} {hr:.1f}, {a} {ar:.1f}', 'Neutral venue' if row['location']=='Neutral' else 'Home field: 55 Elo points'],uncertainties=['No QB, injury or weather inputs','Fixed Elo parameters; probabilities are not recalibrated','Data corrections may differ from originally published results']))
    n = len(validation)
    return dict(generatedAt=timestamp,source=SOURCE,predictions=predictions,validation=dict(games=n,brier=sum((p-y)**2 for p,y in validation)/n if n else None,accuracy=sum((p>=.5)==bool(y) for p,y in validation)/n if n else None,note='Sequential pregame predictions over the latest three completed calendar years plus current results. Fixed parameters; revised source data, not a point-in-time backtest. Ties excluded from evaluation.'))

if __name__ == '__main__':
    with urlopen(SOURCE,timeout=30) as response:
        text = response.read().decode('utf-8')
    now = datetime.now(timezone.utc)
    result = build(text,now)
    directory = Path(__file__).resolve().parent / '.market-data'
    directory.mkdir(exist_ok=True)
    (directory / f'results-{int(now.timestamp())}.csv').write_text(text)
    (directory / 'baseline.json').write_text(json.dumps(result,indent=2))
    print(json.dumps({'predictions':len(result['predictions']),'validation':result['validation']}))
