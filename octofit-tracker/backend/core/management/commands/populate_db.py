from django.core.management.base import BaseCommand
from core.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Deleting old data...'))
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Creating teams...'))
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')

        self.stdout.write(self.style.SUCCESS('Creating users...'))
        users = [
            User.objects.create(email='tony@stark.com', name='Tony Stark', team=marvel),
            User.objects.create(email='steve@rogers.com', name='Steve Rogers', team=marvel),
            User.objects.create(email='bruce@wayne.com', name='Bruce Wayne', team=dc),
            User.objects.create(email='clark@kent.com', name='Clark Kent', team=dc),
        ]

        self.stdout.write(self.style.SUCCESS('Creating workouts...'))
        workouts = [
            Workout.objects.create(name='Pushups', description='Upper body workout', difficulty='Easy'),
            Workout.objects.create(name='Running', description='Cardio workout', difficulty='Medium'),
            Workout.objects.create(name='Deadlift', description='Strength workout', difficulty='Hard'),
        ]

        self.stdout.write(self.style.SUCCESS('Creating activities...'))
        Activity.objects.create(user=users[0], workout=workouts[0], duration_minutes=30, score=100)
        Activity.objects.create(user=users[1], workout=workouts[1], duration_minutes=45, score=150)
        Activity.objects.create(user=users[2], workout=workouts[2], duration_minutes=60, score=200)
        Activity.objects.create(user=users[3], workout=workouts[0], duration_minutes=20, score=80)

        self.stdout.write(self.style.SUCCESS('Creating leaderboards...'))
        Leaderboard.objects.create(team=marvel, total_score=250)
        Leaderboard.objects.create(team=dc, total_score=280)

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
