# **CCube Verification Demo**

## **Introduction**
The CCube Verification Demo is a sample application designed to demonstrate user identity verification using the ComplyCube Web SDK and API. The project includes:
- **Frontend**: A React-based user interface for collecting user details and initiating verification.
- **Backend**: A Node.js and Express application that interacts with ComplyCube’s API and includes validation using **Zod**.

This application is designed for local development and testing, with the flexibility to deploy to traditional servers or containers.

---

## **Features**

### **Frontend**
- User-friendly form for collecting personal details (email, name, date of birth).
- Integration with the ComplyCube Web SDK for real-time identity verification.
- Responsive design using Material-UI.
- Form submission status indicators (loading, success, error).

### **Backend**
- API endpoints for creating authentication tokens and initiating verification checks.
- Integration with ComplyCube’s API using **Axios**.
- Structured error handling.
- Form validation with **Zod** for request payloads.
- Unit testing with **Jest**.

---

## **Tech Stack**

### **Frontend**
- **React**: UI library.
- **Vite**: Fast build tool.
- **Material-UI (MUI)**: Component library for styling.
- **i18next**: Internationalization library.

### **Backend**
- **Node.js**: JavaScript runtime.
- **Express**: Web framework.
- **Zod**: Schema validation for request payloads.
- **Axios**: HTTP client for making API requests.
- **Jest**: Testing framework for backend unit testing.

---


## **Setup and Installation**

### **Prerequisites**
- Node.js (v16+)
- npm or yarn

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
   npm run dev
   ```

4. build the backend server in production:
   ```bash
   npm run build
   ```

---

## **Testing**

### **Backend Tests**
Run unit tests using Jest:
```bash
cd backend
npm run test
```

#### Example Jest Test File
Here’s an example of how the backend uses Jest to test API functionality:

```javascript
import request from 'supertest';
import app from '../src/index';

describe('GET /healthcheck', () => {
  it('should return status ok', async () => {
    const response = await request(app).get('/healthcheck');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
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

## **Key Features of Backend**

### **1. Validation with Zod**
The backend uses **Zod** to validate API request payloads.  
Example schema for token creation:
```typescript
import { object, string } from 'zod';

export const createAuthTokenSchema = object({
  body: object({
    email: string().email('Invalid email format'),
  }),
});
```

Validation is integrated with Express middleware:
```typescript
import { createAuthTokenSchema } from './validation/schemas';
import validateResource from './middleware/validateResource';

app.post('/api/createtoken', validateResource(createAuthTokenSchema), createAuthTokenHandler);
```

### **2. Axios for API Requests**
Axios is used to communicate with the ComplyCube API:
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.complycube.com',
});

export async function createClient(data: any) {
  const response = await apiClient.post('/clients', data);
  return response.data;
}
```

---

## **Future Improvements**
- **E2E Testing**: Add Cypress to test the entire application workflow.
- **Advanced Logging**: Use Winston or a similar library for backend logging.
- **Dockerization**: Provide Docker images for easier deployment.
