import unittest
from datetime import datetime, timezone
from build_predictions import build, probability

class PredictionTests(unittest.TestCase):
    def test_future_and_same_day_scores_cannot_change_forecast(self):
        header = 'game_id,season,game_type,gameday,gametime,home_team,away_team,home_score,away_score,location\n'
        history = ''.join(f'2026_{i},2026,REG,2026-09-01,13:00,BUF,DET,21,14,Home\n' for i in range(16))
        upcoming = '2026_target,2026,REG,2026-09-17,20:15,BUF,DET,,,Home\n'
        now = datetime(2026,9,17,16,tzinfo=timezone.utc)
        clean = build(header+history+upcoming,now)['predictions'][0]
        leaked = build(header+history+upcoming+'future,2026,REG,2026-09-18,13:00,BUF,DET,0,99,Home\n'+'today,2026,REG,2026-09-17,13:00,BUF,DET,0,99,Home\n',now)['predictions'][0]
        self.assertEqual(clean['homeProbability'],leaked['homeProbability'])
        self.assertEqual(clean['kickoff'],'2026-09-18T00:15:00+00:00')

    def test_neutral_field(self):
        self.assertEqual(probability(1500,1500,True),.5)
        self.assertGreater(probability(1500,1500),.5)

if __name__ == '__main__':
    unittest.main()
