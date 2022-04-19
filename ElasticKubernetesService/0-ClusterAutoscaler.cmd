echo off
rem https://www.kubecost.com/kubernetes-autoscaling/kubernetes-cluster-autoscaler/
rem https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html
rem                                                   Create IAM OIDC provider 
eksctl utils associate-iam-oidc-provider --cluster t3small-cluster --approve
rem                                                   Create an IAM role for the provider
call 0-trustJson.cmd
aws iam create-role --role-name AmazonEKSClusterAutoscalerRole --assume-role-policy-document file://0-trust.json --description "AmazonEKSClusterAutoscaler"
rem                                                   Create IAM policy
aws iam put-role-policy --role-name AmazonEKSClusterAutoscalerRole --policy-name AmazonEKSClusterAutoscalerPolicy --policy-document file://0-AmazonEKSClusterAutoscalerPolicy.json
rem                                                   Deploy Cluster Autoscaler
kubectl apply -f 0-cluster-autoscaler.yaml

rem kubectl logs -l app=cluster-autoscaler -n kube-system -f
rem kubectl get pods -n kube-system
echo on