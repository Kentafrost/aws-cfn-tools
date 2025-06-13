### **Workflow Overview**

1. **Lambda Function Execution**
    - The Lambda function checks the status of specified EC2 instances.
    - If any instance is running, Lambda stops it.
    - After action, Lambda publishes a notification to an SNS topic (e.g., to send an email).

2. **Error Handling**
    - If the Lambda function fails (e.g., due to an exception), an error notification is sent via the same SNS topic.
    - CloudWatch Logs capture all Lambda executions and errors.
    - CloudWatch Metrics and Alarms can be configured to count error logs and trigger additional notifications via SNS.

---

### **Components**

- **Lambda Function:**  
  Automates EC2 status checks and stop actions, and sends notifications.

- **SNS Topic:**  
  Receives notifications from Lambda (success or failure) and delivers them (e.g., via email).

- **CloudWatch Logs & Metrics:**  
  - Logs all Lambda activity.
  - Tracks errors for alerting and operational visibility.

---

### **Typical Flow**