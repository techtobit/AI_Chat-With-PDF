# AI PLANET
#### Objective:
Develop a full-stack application that allows users to upload PDF documents and ask questions
regarding the content of these documents. The backend will process these documents and
utilize natural language processing to provide answers to the questions posed by the users.

##### Tools and Technologies:
Backend: FastAPI
NLP Processing: LangChain/LLamaIndex
Frontend: React.js
Database: SQLite or PostgreSQL (for storing document metadata, if necessary)
File Storage: Local filesystem or cloud storage (e.g., AWS S3) for storing uploaded PDFs


### FastAPI

Uplaod PDF file.Post Method:
```  try {
        const response = axios.post('http://localhost:8000/upload/', formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        });
        setMessage(`File uploaded successfully: ${response.data.id}`);
        onUploadSuccess(response.data.id);
        return {errors: false}
        } catch (error) {
        }
```
Success(200) Response:
``` 
#body
{
  	"id": 8,
  	"filename": "Full Stack SEO Developer  - Ashraf Uddin.pdf"
}
```
Error 
```
#Body
{
  "detail": "File must be a PDF"
}
```


