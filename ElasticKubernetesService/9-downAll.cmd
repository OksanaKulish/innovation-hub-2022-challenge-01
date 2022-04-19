kubectl delete -f ingress.yaml
kubectl delete -f 1-apiDotnet.yaml
kubectl delete -f 1-apiPython.yaml

kubectl delete -f 0-cluster-autoscaler.yaml

aws iam delete-role-policy --role-name AmazonEKSClusterAutoscalerRole --policy-name AmazonEKSClusterAutoscalerPolicy
aws iam delete-role --role-name AmazonEKSClusterAutoscalerRole