# **CCube Verification Demo**

## **Introduction**
The CCube Verification Demo is a sample application designed to demonstrate user identity verification using the ComplyCube Web SDK and API. The project includes:
- **Frontend**: A **React**-based user interface deployed on **Vercel** for ease of hosting and scaling.
- **Backend**: A **Node.js** and **Express-based** API, refactored with **serverless-http** to support AWS Lambda deployment that interacts with ComplyCube’s API and includes middleware validation using **Zod**.


---

## **Features**

### **Frontend**
- User-friendly form for collecting personal details (email, name, date of birth).
- Integration with the **ComplyCube Web SDK** for real-time identity verification.
- Responsive design using **Material-UI**.
- Form submission status indicators (loading, success, error).
- Deployed on **Vercel**, enabling automatic CI/CD for rapid updates. Preview visit: https://ccube-demo.vercel.app/

### **Backend**
- API endpoints for creating authentication tokens and initiating verification checks.
- Integration with ComplyCube’s API using **Axios**.
- Structured error handling.
- Form validation with **Zod** for request payloads.
- Unit testing with **Jest**.
- Serverless deployment
  - Express app to support **AWS Lambda** using **serverless-http**.
  - Deployed via **Serverless** Framework v4
  - Bundled using **esbuild** for deployment.
  - Hosted on AWS Lambda with **API Gateway** as the routing layer.

---

## **Tech Stack**

### **Frontend**
- **React**: UI library.
- **Vite**: Fast build tool.
- **Material-UI (MUI)**: Component library for styling.
- **i18next**: Internationalization library.
- **Axios**: HTTP client for making API requests.

### **Backend**
- **Node.js**: JavaScript runtime.
- **Express**: Web framework.
- **Zod**: Schema validation for request payloads.

- **Jest**: Testing framework for backend unit testing.
- **serverless-http**: Middleware to adapt Express for AWS Lambda.
- **Serverless Framework**: Deployment automation for AWS Lambda and API Gateway.

---


## **Setup and Installation**

### **Prerequisites**
- Node.js (v16+)
- Serverless v4
- npm or yarn
- complycube api key

### **1. Frontend**

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

### **2. Backend**

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   serverless offline
   ```

4. build and deploy the backend in AWS lambda:
   ```bash
   serverless deploy
   ```

---

## **Testing**

### **Backend Tests**
Run unit tests using Jest:
```bash
cd backend
npm run test
```

---

## **API Endpoints**

### **GET `/healthcheck`**
Check the backend service health.

### **POST `/api/createtoken`**
Generate a ComplyCube authentication token.

### **POST `/api/createcheck`**
Create an identity verification check.

### **GET `/api/getcheckresult/{checkId}`**
Retrieve the result of a verification check.

---

## **Future Improvements**
- **E2E Testing**: Add Cypress to test the entire application workflow.
