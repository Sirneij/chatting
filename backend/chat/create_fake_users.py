# make_fake_users.py
from django.contrib.auth import get_user_model
from faker import Faker

fake = Faker()
# Delete all users
get_user_model().objects.exclude(is_staff=True).delete()
# Generate 30 random emails and iterate them.
for email in [fake.unique.email() for i in range(5)]:
    # Create user in database
    user = get_user_model().objects.create_user(fake.user_name(), email, "password")
    user.last_name = fake.last_name()
    user.first_name = fake.first_name()
    user.is_active = True
    user.save()
