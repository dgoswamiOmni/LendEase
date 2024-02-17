from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from Utils.mongo_utils import MongoUtils
from Classes.user_data_handler import UserDataHandler

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
async def login_user(username: str, password: str):
    user_handler = UserDataHandler(username=username, password=password, email="")
    return await user_handler.authenticate_user(mongo)


@app.post("/logout", response_model=dict)
async def logout_user(username: str, token: str):
    user_handler = UserDataHandler(username=username, password="", email="")
    return await user_handler.logout_user(mongo, token)


@app.post("/putUserData", response_model=dict)
async def put_user_data(username: str, email: str, password: str):
    user_handler = UserDataHandler(username=username, password=password, email=email)
    return await user_handler.put_user_data(mongo)


@app.get("/getUserData", response_model=dict)
async def get_user_data(username: str):
    try:
        user_handler = UserDataHandler(username=username, password="", email="")
        return await user_handler.get_user_data(mongo)
    except HTTPException as e:
        # If it's an HTTPException, return a detailed error response
        return {"statusCode": e.status_code, "error": str(e.detail)}


@app.post("/putLoan", response_model=dict)
async def put_loan():
    pass

@app.get("/getLoan", response_model=dict)
async def get_loans():
    pass

@app.post("/putInvestment", response_model=dict)
async def get_loan():

@app.get("/getInvestments", response_model=dict)
async def get_investors():
    pass



if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8090)