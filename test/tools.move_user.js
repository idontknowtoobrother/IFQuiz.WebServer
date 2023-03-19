{
    "client": "Thunder Client",
    "collectionName": "IF-Quiz",
    "dateExported": "2023-03-19T15:06:59.935Z",
    "version": "1.1",
    "folders": [],
    "requests": [
        {
            "_id": "aff207b5-c062-4a38-ae8c-b7bbb2580fb3",
            "colId": "965256f3-b3d1-4ecc-9e63-2a0956c7b0b1",
            "containerId": "",
            "name": "SignUp",
            "url": "http://localhost:3000/auth/signup",
            "method": "POST",
            "sortNum": 10000,
            "created": "2023-02-01T09:58:41.823Z",
            "modified": "2023-02-24T22:03:53.759Z",
            "headers": [],
            "params": [],
            "body": {
                "type": "json",
                "raw": "{\n    \"email\": \"testx@gmail.com\",\n    \"password\": \"12345xwe2\",\n    \"fullname\": \"firstname lastname\",\n    \"birthday\": \"2012-04-23T18:25:43.511Z\"\n}",
                "form": []
            },
            "tests": []
        },
        {
            "_id": "2d10b7d7-3159-404b-9f69-60182cd3bc1d",
            "colId": "965256f3-b3d1-4ecc-9e63-2a0956c7b0b1",
            "containerId": "",
            "name": "Create Quiz",
            "url": "http://localhost:3000/quizzes/create",
            "method": "POST",
            "sortNum": 15000,
            "created": "2023-02-01T12:40:43.857Z",
            "modified": "2023-02-25T07:09:35.565Z",
            "headers": [
                {
                    "name": "Authorization",
                    "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjkzNDQ5ODU5MDFiZmUxOTRmN2M1ZCIsImlhdCI6MTY3NzI3NjIzMywiZXhwIjoxNjc3NDQ5MDMzfQ.gp8pBFYYan8OnI3vfD5qLAlQy8ByX8RyGjChFssNIuo"
                }
            ],
            "params": [],
            "body": {
                "type": "json",
                "raw": "{\n    \"name\": \"a\",\n    \"description\": \"description of quiz\",\n    \"category\": \"Mathematics\"\n}",
                "form": []
            },
            "tests": []
        },
        {
            "_id": "eed9520b-09ac-4f8e-b6c6-a89b20de9aa0",
            "colId": "965256f3-b3d1-4ecc-9e63-2a0956c7b0b1",
            "containerId": "",
            "name": "Login",
            "url": "http://localhost:3000/auth/login",
            "method": "POST",
            "sortNum": 20000,
            "created": "2023-02-01T10:58:47.929Z",
            "modified": "2023-02-25T06:39:24.194Z",
            "headers": [],
            "params": [],
            "body": {
                "type": "json",
                "raw": "{\n    \"email\": \"testx@gmail.com\",\n    \"password\": \"12345xwe2\"\n}",
                "form": []
            },
            "tests": []
        },
        {
            "_id": "b2367f8b-8a56-4777-9332-71637b7b1f72",
            "colId": "965256f3-b3d1-4ecc-9e63-2a0956c7b0b1",
            "containerId": "",
            "name": "Upload Profile Image",
            "url": "http://localhost:3000/file/upload/profile-image",
            "method": "POST",
            "sortNum": 25000,
            "created": "2023-02-25T10:00:04.013Z",
            "modified": "2023-02-25T11:22:50.464Z",
            "headers": [
                {
                    "name": "Authorization",
                    "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjlhYzRlMDk2YWJmOTFhYzlmZjZlMSIsImlhdCI6MTY3NzMyMjUwMiwiZXhwIjoxNjc3NDk1MzAyfQ.OjBhoR56bpNSjpDGd25eE3K26JYsWhU3xVu4cE-pWXE"
                }
            ],
            "params": [],
            "body": {
                "type": "formdata",
                "raw": "",
                "form": [],
                "files": [
                    {
                        "name": "profile-image",
                        "value": "d:\\[ Pictures ]\\270040687_734421277530170_7796251460781359228_n.jpg"
                    }
                ]
            },
            "tests": []
        },
        {
            "_id": "27084a8f-c7d0-443f-b637-fb9b8cbefe16",
            "colId": "965256f3-b3d1-4ecc-9e63-2a0956c7b0b1",
            "containerId": "",
            "name": "Get All Quizzes",
            "url": "http://localhost:3000/quizzes",
            "method": "GET",
            "sortNum": 30000,
            "created": "2023-02-01T12:27:51.384Z",
            "modified": "2023-02-25T06:52:22.504Z",
            "headers": [],
            "params": [],
            "tests": []
        },
        {
            "_id": "a127677b-6bd5-4b4f-9b92-f5221671a4d8",
            "colId": "965256f3-b3d1-4ecc-9e63-2a0956c7b0b1",
            "containerId": "",
            "name": "Get Quiz",
            "url": "http://localhost:3000/quizzes/63f9aa26096abf91ac9ff6dc",
            "method": "GET",
            "sortNum": 50000,
            "created": "2023-02-01T12:47:54.017Z",
            "modified": "2023-02-25T06:29:54.837Z",
            "headers": [],
            "params": [],
            "tests": []
        },
        {
            "_id": "85a3d028-0867-4444-b813-ff1dbb1e8d52",
            "colId": "965256f3-b3d1-4ecc-9e63-2a0956c7b0b1",
            "containerId": "",
            "name": "Delete Quiz",
            "url": "http://localhost:3000/quizzes/63f9a217afe9402ef759e7b6",
            "method": "DELETE",
            "sortNum": 60000,
            "created": "2023-02-02T03:53:10.467Z",
            "modified": "2023-02-25T06:20:41.074Z",
            "headers": [
                {
                    "name": "Authorization",
                    "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjkzNDQ5ODU5MDFiZmUxOTRmN2M1ZCIsImlhdCI6MTY3NzI3NjIzMywiZXhwIjoxNjc3NDQ5MDMzfQ.gp8pBFYYan8OnI3vfD5qLAlQy8ByX8RyGjChFssNIuo"
                }
            ],
            "params": [],
            "tests": []
        },
        {
            "_id": "1f39698f-5372-497e-b85a-83c4621aa89a",
            "colId": "965256f3-b3d1-4ecc-9e63-2a0956c7b0b1",
            "containerId": "",
            "name": "Update Quiz",
            "url": "http://localhost:3000/quizzes/63f9a217afe9402ef759e7b6",
            "method": "PUT",
            "sortNum": 70000,
            "created": "2023-02-02T03:53:51.530Z",
            "modified": "2023-02-25T06:16:06.955Z",
            "headers": [
                {
                    "name": "Authorization",
                    "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGEzZGU1M2ZiNjFhZTdiMmQyN2E2NiIsImlhdCI6MTY3NTMyNzA3NiwiZXhwIjoxNjc1NDk5ODc2fQ.vlJB9Gk2b4Zci1Ay2S4Ll2IKe4eyed_PoTLNpSbYWy4",
                    "isDisabled": true
                }
            ],
            "params": [],
            "body": {
                "type": "json",
                "raw": "{\n    \"name\": \"test upoda\" \n}",
                "form": []
            },
            "auth": {
                "type": "bearer",
                "bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjkzNDQ5ODU5MDFiZmUxOTRmN2M1ZCIsImlhdCI6MTY3NzI3NjIzMywiZXhwIjoxNjc3NDQ5MDMzfQ.gp8pBFYYan8OnI3vfD5qLAlQy8ByX8RyGjChFssNIuo"
            },
            "tests": []
        },
        {
            "_id": "49352124-ee4d-4053-ba49-10771680b0c0",
            "colId": "965256f3-b3d1-4ecc-9e63-2a0956c7b0b1",
            "containerId": "",
            "name": "Update Status",
            "url": "http://localhost:3000/accounts/status",
            "method": "PATCH",
            "sortNum": 80000,
            "created": "2023-02-24T22:00:58.676Z",
            "modified": "2023-02-24T22:38:41.620Z",
            "headers": [],
            "params": [],
            "body": {
                "type": "json",
                "raw": "{\n    \"status\": \"thisis my new status\"\n}",
                "form": []
            },
            "auth": {
                "type": "bearer",
                "bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjkzNDQ5ODU5MDFiZmUxOTRmN2M1ZCIsImlhdCI6MTY3NzI3NjIzMywiZXhwIjoxNjc3NDQ5MDMzfQ.gp8pBFYYan8OnI3vfD5qLAlQy8ByX8RyGjChFssNIuo"
            },
            "tests": []
        },
        {
            "_id": "dece7d2d-6980-4b97-9098-ef01bf4ca5a9",
            "colId": "965256f3-b3d1-4ecc-9e63-2a0956c7b0b1",
            "containerId": "",
            "name": "Update Profile",
            "url": "http://localhost:3000/accounts/edit",
            "method": "PATCH",
            "sortNum": 90000,
            "created": "2023-02-24T22:36:58.667Z",
            "modified": "2023-02-25T10:04:38.398Z",
            "headers": [],
            "params": [],
            "body": {
                "type": "json",
                "raw": "{\n    \"email\": \"newemailEdited@gmail.com\",\n    \"status\": \"new status edited\"\n}",
                "form": []
            },
            "auth": {
                "type": "bearer",
                "bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjlhYzRlMDk2YWJmOTFhYzlmZjZlMSIsImlhdCI6MTY3NzMxOTQ3MCwiZXhwIjoxNjc3NDkyMjcwfQ.Paz_jLQ0zYyHXvqdl9ZbjQs071R_5ST2iceLEgv84fMeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjlhYzRlMDk2YWJmOTFhYzlmZjZlMSIsImlhdCI6MTY3NzMxOTQ3MCwiZXhwIjoxNjc3NDkyMjcwfQ.Paz_jLQ0zYyHXvqdl9ZbjQs071R_5ST2iceLEgv84fM"
            },
            "tests": []
        }
    ]
}
