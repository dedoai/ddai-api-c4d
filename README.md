# ddai-api-lambda

![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

**dedoAI** - Call for Data API Service

---

## Overview

This repository contains the `ddai-api-lambda` service, a Dockerized AWS Lambda function that exposes a set of APIs for managing "Call for Data" entities. This API allows creating, retrieving, updating, and deleting Call for Data entries, as well as managing associated files. The service is designed for scalability and can be easily integrated with other dedoAI services.

---

## Features

- **Call for Data Management**: Full CRUD operations for managing "Call for Data" entities.
- **File Management**: Supports uploading, retrieving, and deleting files associated with Call for Data entries.
- **PostgreSQL Integration**: The service connects to a PostgreSQL database for data persistence.
- **Dockerized**: Packaged as a Docker container for seamless deployment.
- **AWS Lambda**: Leveraging the power of AWS Lambda for a serverless architecture.

---

## Technologies

- **Node.js**: The core backend logic is written in Node.js.
- **AWS Lambda**: Serverless compute service used to handle API requests.
- **PostgreSQL**: Database for persisting Call for Data and file information.
- **Docker**: Containerization for easy deployment.
- **Joi Validation**: Input validation for robust and secure data handling.

---

## API Endpoints

The following APIs are exposed by the service:

| Method | Endpoint                 | Description                            |
|--------|--------------------------|----------------------------------------|
| GET    | `/c4d`                   | Retrieve Call for Data entries         |
| GET    | `/c4d/files`             | Retrieve associated files              |
| POST   | `/c4d`                   | Create a new Call for Data entry       |
| PUT    | `/c4d/{id}`              | Update an existing Call for Data entry |
| DELETE | `/c4d/{id}`              | Delete a Call for Data entry           |
| DELETE | `/c4d/files/{fileId}`     | Remove a file from Call for Data entry |

### Example Request

```bash
curl -X POST "https://your-api-endpoint/c4d" \
-H "Content-Type: application/json" \
-d '{"title": "New Call for Data", "description": "Request for data", "consumer_id": 1, "category_id": 2, "data_type": "json", "reward": 100}'
```

---

## Getting Started

### Prerequisites

To run or contribute to this project, you will need:

- **Node.js** (version 14.x or higher)
- **AWS CLI**: To interact with AWS services.
- **Docker**: Required for running and packaging the Lambda function.

### Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/dedoAI/ddai-api-lambda.git
    cd ddai-api-lambda
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Build and run the Docker container:

    ```bash
    docker build -t ddai-api-lambda .
    docker run -p 3000:3000 ddai-api-lambda
    ```

4. The API will be available at `http://localhost:3000`.

---

## Database Integration

This service interacts with a PostgreSQL database to store and retrieve Call for Data and file information. Database credentials are managed through environment variables, and the connection is handled in the `db.js` file.

### Sample Query

- To retrieve all files associated with a Call for Data entry:

```js
const query = 'SELECT file_name, file_type, bucket_url FROM files WHERE entity_id = $1 and entity_name = $2';
```

---

## Deployment

This Lambda function can be deployed using Docker and AWS services. To deploy:

1. Build the Docker image:

    ```bash
    docker build -t ddai-api-lambda .
    ```

2. Push the Docker image to an AWS ECR repository:

    ```bash
    docker tag ddai-api-lambda:latest 123456789012.dkr.ecr.region.amazonaws.com/ddai-api-lambda:latest
    docker push 123456789012.dkr.ecr.region.amazonaws.com/ddai-api-lambda:latest
    ```

3. Deploy the Lambda function using AWS CLI or CloudFormation.

---

## Testing

To run unit tests for this service, use the following command:

```bash
npm test
```

You can also test the Lambda function locally using Docker:

```bash
docker run -p 3000:3000 ddai-api-lambda
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For more information about dedoAI or to get in touch with the team:

- **Website**: [dedo.org](https://www.dedo.org)
- **Email**: support@dedo.org
