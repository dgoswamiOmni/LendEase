import os
import motor.motor_asyncio

class MongoUtils:
    def __init__(self):
        self.cached_db = None

    def connect_to_database(self):
        if self.cached_db:
            return self.cached_db
        MONGO_URI = "mongodb+srv://devarshigoswami97:AoKUNhswGnboFmWt@dayoff.c1bq6uj.mongodb.net/?retryWrites=true&w=majority"
        # Fetch MongoDB URI from environment variable
        mongodb_uri = MONGO_URI
        # mongodb_uri = os.environ.get('MONGO_URI')

        if not mongodb_uri:
            raise ValueError("MongoDB URI not found in environment variables.")

        # Connect to MongoDB using the fetched URI
        client = motor.motor_asyncio.AsyncIOMotorClient(mongodb_uri)

        # Specify which database we want to use (you can customize this based on your needs)
        db = client.LendEase

        self.cached_db = db
        return db