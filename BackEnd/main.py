from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from Utils.mongo_utils import MongoUtils
from Classes.user_data_handler import UserDataHandler
from Classes.investor_data_handler import InvestorDataHandler
from Classes.loan_data_handler import LoanDataHandler
from Classes.community_data_handler import CommunityHandler
app = FastAPI()
handler = Mangum(app)

# Enable CORS (Cross-Origin Resource Sharing) for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mongo_instance = MongoUtils()
mongo = mongo_instance.connect_to_database()


@app.post("/login", response_model=dict)
async def login_user(event: dict):
    user_handler = UserDataHandler(event)
    return await user_handler.authenticate_user(mongo)


@app.post("/logout", response_model=dict)
async def logout_user(event: dict):
    user_handler = UserDataHandler(event)
    return await user_handler.logout_user(mongo)


@app.post("/putUserData", response_model=dict)
async def put_user_data(event: dict):
    user_handler = UserDataHandler(event)
    return await user_handler.put_user_data(mongo)


@app.get("/getUserData", response_model=dict)
async def get_user_data(event: dict):
    try:
        user_handler = UserDataHandler(event)
        return await user_handler.get_user_data(mongo)
    except HTTPException as e:
        # If it's an HTTPException, return a detailed error response
        return {"statusCode": e.status_code, "error": str(e.detail)}

@app.post("/putLoan", response_model=dict)
async def put_loan(event: dict):
    global loan_handler
    loan_handler = LoanDataHandler(event)
    return await loan_handler.put_loan_data(mongo)


@app.get("/getLoan", response_model=dict)
async def get_loan(event: dict):
    global loan_handler
    loan_handler = LoanDataHandler(event)
    try:
        return await loan_handler.get_loan_data(mongo)
    except HTTPException as e:
        # If it's an HTTPException, return a detailed error response
        return {"statusCode": e.status_code, "error": str(e.detail)}



@app.post("/putInvestment", response_model=dict)
async def put_investment(event: dict):
    global investor_handler
    investor_handler = InvestorDataHandler(event)
    return await investor_handler.put_investor_data(mongo)


@app.get("/getInvestments", response_model=dict)
async def get_investment(event: dict):
    global investor_handler
    investor_handler = InvestorDataHandler(event)
    try:
        return await investor_handler.get_investor_data(mongo)
    except HTTPException as e:
        # If it's an HTTPException, return a detailed error response
        return {"statusCode": e.status_code, "error": str(e.detail)}


@app.post("/pushCommunities", response_model=dict)
async def push_communities(event: dict):
    community_handler = CommunityHandler(event)
    return await community_handler.push_communities(mongo)

@app.get("/getCommunities", response_model=dict)
async def get_communities(event: dict):
    community_handler = CommunityHandler(event)
    return await community_handler.get_communities(mongo)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8090)
