# **CCube Document & Identity Verification Project**

## **Introduction**
This project is a full-stack application designed for document and identity verification using the **ComplyCube Web SDK**. It includes a React-based frontend and an Express backend, deployed to **Vercel** and **AWS Lambda** respectively.

---

## **Features**

### **Frontend**

- Built with **React**, **MUI** for UI components, and **Vite** for a fast development environment.
- Integrates **ComplyCube Web SDK** for user document verification.
- Deployed on **Vercel**, enabling automatic CI/CD for rapid updates. Preview visit: https://ccube-demo.vercel.app/

### **Backend**

- Built with **Express** and **serverless-http**.
- Form validation with **Zod** for request payloads.
- Uses **Serverless Framework** with **AWS Lambda** and **API Gateway** for serverless deployment.
- Unit testing with **Jest**.
- Includes APIs for generating tokens and retrieving document check statuses.

---

## Folder Structure

```plaintext
project-root/
│
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── api/            # Axios services
│   │   ├── assets/         # Static assets
│   │   ├── shared/         # i18n
│   │   └── main.tsx        # Application entry point
│   ├── playwright/         # E2E tests with Playwright
│   └── vite.config.ts      # Vite configuration
│
├── backend/                # Express backend application
│   ├── controllers/        # API controllers
│   ├── services/           # Business logic
│   ├── middlewares/        # Custom middlewares
│   ├── utils/              # Utility functions
│   ├── schemas/            # Zod validation schemas
│   └── index.ts            # Application entry point
│   ├── serverless.yml      # Serverless deployment configuration
│   └── jest.config.js      # Jest configuration
```

---

## **Tech Stack**

### **Frontend**
- **React**: UI library.
- **MUI**: Component library for styling and responsive design.
- **Vite**: Development build tool for optimized frontend development.
- **Axios**: For handling HTTP requests.
- **Playwright**: For E2E testing.
- **i18next**: Internationalization library.

### **Backend**
- **Express**: Web framework for handling API requests.
- **Zod**: Schema validation for API inputs.
- **Axios**: For backend-to-backend HTTP requests.
- **Serverless Framework**: For deploying the backend as AWS Lambda functions.
- **ESBuild** (indirect): For bundling backend code for Lambda.
- **Jest**: Testing framework for backend unit testing.

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

3. Fill in env variables in template.yml

4. Start the development server:
   ```bash
   serverless offline
   ```

5. build and deploy the backend in AWS lambda:
   ```bash
   serverless deploy
   ```

---

## **Testing**

### **Frontend Integration Tests**
Run unit tests using playwright:
```bash
cd frontend
npm run test:e2e
npm run test:e2e:ui
```

### **Backend Unit Tests**
Run unit tests using Jest:
```bash
cd backend
npm run test
```

---
## High-Level Architecture

### **Frontend**:
- **React App** hosted on Vercel.
- Fetches APIs from the backend for generating tokens and initiating document checks.
- Uses the **ComplyCube Web SDK** for handling document uploads and identity verification.

### **Backend**:
- **Express APIs**:
  - `/healthcheck`: Health check endpoint.
  - `/api/createtoken`: Generates tokens for SDK integration.
  - `/api/createcheck`: Initiates document verification.
  - `/api/getcheckresult/:checkId`: Fetches verification results.
- **Serverless Framework**:
  - Deployed as AWS Lambda functions.
  - Uses AWS API Gateway for routing.


---

## **Future Improvements**
- Cypress to test the entire application workflow.
- Optimize build and deployment processes for CI/CD pipelines.
