import json
from fastapi import HTTPException
from Utils.auth_utils import validate_jwt_token
from Utils.mongo_utils import MongoUtils
import uuid
from Utils.geolocation_utils import get_user_location



class CommunityHandler:
    def __init__(self, event):
        self.event = event
        self.headers = self.event.get('headers', {})
        self.body = self.event.get('body', {})
        # Extract token for authentication
        self.token = self.headers.get('Authorization', '').split('Bearer ')[-1]
        self.user_ip_address = "8.8.8.8"  # Replace with the actual user's IP address
        self.user_location = get_user_location(self.user_ip_address)

    async def push_communities(self, db):
        try:
            # Extract fields from the payload
            collection = self.body.get("collection", "")
            community_id = str(uuid.uuid4())
            total_pool = self.body.get("total_pool", "")
            geo_tag = self.user_location
            users = self.body.get("users", [])
            password_hash = self.body.get("password_hash", "")

            # Construct the community data
            community_data = {
                "collection": collection,
                "community_id": community_id,
                "total_pool": total_pool,
                "geo_tag": geo_tag,
                "users": users,
                "password_hash": password_hash,
            }

            # Insert new community data into MongoDB
            result = await db.communities.insert_one(community_data)
            return {"message": "Communities data inserted successfully", "community_id": str(result.inserted_id)}

        except Exception as e:
            # Log the exception
            print(f"Exception in push_communities: {str(e)}")
            return {'statusCode': 500, 'body': json.dumps({'message': f'Internal Server Error{e}'})}

    async def get_communities(self, db):
        try:
            if self.token:

                # Perform additional authentication checks if needed based on the decoded token

                # Your logic to retrieve communities from the database goes here
                # Use your actual MongoDB collection name and connection logic
                # Assuming communities are stored in a collection called 'communities'
                communities_data = await db.communities.find().to_list(length=None)

                return {"communities_data": communities_data}
            else:
                return {'statusCode': 401, 'body': json.dumps({'message': 'Invalid or expired token'})}

        except Exception as e:
            # Log the exception
            print(f"Exception in get_communities: {str(e)}")
            return {'statusCode': 500, 'body': json.dumps({'message': 'Internal Server Error'})}
