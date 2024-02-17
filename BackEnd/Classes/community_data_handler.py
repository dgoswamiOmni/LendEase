import json
from fastapi import HTTPException
from Utils.auth_utils import validate_jwt_token
from Utils.mongo_utils import MongoUtils


class CommunityHandler:
    def __init__(self, event):
        self.event = event
        self.headers = self.event.get('headers', {})
        self.body = self.event.get('body', {})
        # Extract token for authentication
        self.token = self.headers.get('Authorization', '').split('Bearer ')[-1]

    async def push_communities(self, db):
        try:

            result = await db.communities.insert_one(self.body)

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
