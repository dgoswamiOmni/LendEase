import json
from fastapi import HTTPException
from Utils.auth_utils import validate_jwt_token

class InvestorDataHandler:
    def __init__(self, event):
        self.event = event
        self.headers = self.event.get('headers', {})
        self.body = self.event.get('body', {})
        self.user_name = self.body.get('user_name', '')
        self.amount = self.body.get('amount', '')
        self.interest_accrual = self.body.get('interest_accrual', '')
        self.auto_payment_flag = self.body.get('auto_payment_flag', '')
        self.expected_returns = self.body.get('expected_returns', '')
        self.investment_plan = self.body.get('investment_plan', '')

        # Extract token for authentication
        self.token = self.headers.get('Authorization', '').split('Bearer ')[-1]
        validate_jwt_token(self.token)  # Example: You might want to validate the token here

    async def put_investor_data(self, db):
        try:
            # Insert new investor data into MongoDB
            investor_data = {
                "user_name": self.user_name,
                "amount": self.amount,
                "interest_accrual": self.interest_accrual,
                "auto_payment_flag": self.auto_payment_flag,
                "expected_returns": self.expected_returns,
                "investment_plan": self.investment_plan,
            }
            result = await db.invest.insert_one(investor_data)

            return {"message": "Investor data inserted successfully", "investor_id": str(result.inserted_id)}
        except Exception as e:
            # Log the exception
            print(f"Exception in put_investor_data: {str(e)}")
            return {'statusCode': 500, 'body': json.dumps({'message': 'Internal Server Error'})}

    async def get_investor_data(self, db):
        try:
            # Retrieve investor data based on username
            investor_data = await db.invest.find_one({"user_name": self.user_name})

            if investor_data:
                return {
                    "investor_data": {
                        "user_name": investor_data["user_name"],
                        "amount": investor_data["amount"],
                        "interest_accrual": investor_data.get("interest_accrual", None),
                        "auto_payment_flag": investor_data.get("auto_payment_flag", None),
                        "expected_returns": investor_data.get("expected_returns", None),
                        "investment_plan": investor_data.get("investment_plan", None),
                    }
                }
            else:
                raise HTTPException(status_code=404, detail="Investor data not found")
        except Exception as e:
            # Log the exception
            print(f"Exception in get_investor_data: {str(e)}")
            return {'statusCode': 500, 'body': json.dumps({'message': 'Internal Server Error'})}
