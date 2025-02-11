# Accountability

Accountability is a site built for logging and tracking long term accountability goals.

Log a goal, track it for 3/6/9/12 months, complete. Repeat.

Built using
- React / Vite
- Tailwind
- AWS API Gateway
- AWS Lambda
- AWS RDS


# Project Architecture

Current project setup
- One VPC, two public two private subnets spanning two AZs
- RDS sat in private subnets
- API Gateway with Lambdas triggered from endpoints
- Lambdas in VPC Private subnets for RDS access
- Lambdas with role to account for permissions
  

DB Code held in DBScripts
Lambda Code held in Lambda
