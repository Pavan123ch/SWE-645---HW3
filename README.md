# SWE 645 – Homework 3  
Full Stack Web Application with CI/CD on AWS

## 📌 Overview
This project demonstrates a full-stack web application deployed using Docker, Kubernetes, and automated using GitHub Actions CI pipeline.

## 🏗️ Architecture
- Frontend: React
- Backend: FastAPI (Python)
- Containerization: Docker
- Orchestration: Kubernetes (k3s on AWS EC2)
- CI/CD: GitHub Actions
- Container Registry: DockerHub

## 🚀 Features
- Student survey form
- Data stored via backend API
- RESTful communication
- Kubernetes deployment with multiple frontend replicas

## 🐳 Docker Images
- Backend: surya100599/backend-app
- Frontend: surya100599/frontend-app

## ☁️ Deployment
Application deployed on AWS EC2 using Kubernetes.

Services:
- Frontend → NodePort (30008)
- Backend → NodePort (30007)

## 🌐 Access URLs
Frontend:
http://13.220.253.5:30008

Backend API:
http://13.220.253.5:30007/surveys

## 🔄 CI/CD Pipeline
Implemented using GitHub Actions.

On every push:
1. Build backend Docker image  
2. Build frontend Docker image  
3. Push images to DockerHub  

Workflow:
.github/workflows/ci.yml

## 🧠 Learnings
- Docker containerization  
- Kubernetes deployment and scaling  
- CI automation using GitHub Actions  
- Debugging real-world deployment issues  

## ⚠️ Note
Due to AWS Learner Lab expiration, the live deployment may not always be accessible. However, the full implementation and CI pipeline are available in this repository.
