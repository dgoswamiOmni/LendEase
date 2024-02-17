import json
from fastapi import HTTPException
from Utils.auth_utils import validate_jwt_token


class LoanDataHandler:
    def __init__(self, event):
        self.event = event
        self.headers = self.event.get('headers', {})
        self.body = self.event.get('body', {})
        self.user_name = self.body.get('user_name', '')
        self.loan_category = self.body.get('loan_category', '')
        self.repayment_schedule = self.body.get('repayment_schedule', '')
        self.document_url = self.body.get('document_url', '')
        self.interest_rate = self.body.get('interest_rate', '')
        self.password_hash = self.body.get('password_hash', '')

        # Extract token for authentication
        self.token = self.headers.get('Authorization', '').split('Bearer ')[-1]

    async def put_loan_data(self, db):
        try:
            decoded_token = validate_jwt_token(self.token)
            if decoded_token:

                # Insert new lender data into MongoDB
                lender_data = {
                    "user_name": self.user_name,
                    "loan_category": self.loan_category,
                    "repayment_schedule": self.repayment_schedule,
                    "document_url": self.document_url,
                    "interest_rate": self.interest_rate,
                    "password_hash": self.password_hash,
                }
                result = await db.lend.insert_one(lender_data)

                return {"message": "Lender data inserted successfully", "lender_id": str(result.inserted_id)}
            else:

                return {'statusCode': 404, 'body': json.dumps({'message': 'User session not found'})}


        except Exception as e:
            # Log the exception
            print(f"Exception in put_lender_data: {str(e)}")
            return {'statusCode': 500, 'body': json.dumps({'message': 'Internal Server Error'})}

    async def get_loan_data(self, db):
        try:
            decoded_token = validate_jwt_token(self.token)
            if decoded_token:

                # Retrieve lender data based on username
                lender_data = await db.lend.find_one({"user_name": self.user_name})

                if lender_data:
                    return {
                        "lender_data": {
                            "user_name": lender_data["user_name"],
                            "loan_category": lender_data["loan_category"],
                            "repayment_schedule": lender_data.get("repayment_schedule", None),
                            "document_url": lender_data.get("document_url", None),
                            "interest_rate": lender_data.get("interest_rate", None),
                        }
                    }
                else:
                    raise HTTPException(status_code=404, detail="Lender data not found")
            else:
                return {'statusCode': 404, 'body': json.dumps({'message': 'User session not found'})}

        except Exception as e:
            # Log the exception
            print(f"Exception in get_lender_data: {str(e)}")
            return {'statusCode': 500, 'body': json.dumps({'message': 'Internal Server Error'})}
