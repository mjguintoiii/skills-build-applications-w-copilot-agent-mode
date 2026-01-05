from django.urls import reverse
from rest_framework.test import APITestCase
from .models import User, Team, Workout, Activity, Leaderboard

class APISmokeTest(APITestCase):
    def test_api_root(self):
        response = self.client.get(reverse('api-root'))
        self.assertEqual(response.status_code, 200)

    def test_users_endpoint(self):
        response = self.client.get('/api/users/')
        self.assertIn(response.status_code, [200, 403])

    def test_teams_endpoint(self):
        response = self.client.get('/api/teams/')
        self.assertIn(response.status_code, [200, 403])

    def test_workouts_endpoint(self):
        response = self.client.get('/api/workouts/')
        self.assertIn(response.status_code, [200, 403])

    def test_activities_endpoint(self):
        response = self.client.get('/api/activities/')
        self.assertIn(response.status_code, [200, 403])

    def test_leaderboards_endpoint(self):
        response = self.client.get('/api/leaderboards/')
        self.assertIn(response.status_code, [200, 403])
