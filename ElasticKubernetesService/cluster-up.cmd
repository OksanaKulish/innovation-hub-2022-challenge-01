echo off
rem 			Create cluster
eksctl create cluster -f aws_eks.yaml 
rem 			Create Ingress controller 
rem https://docs.konghq.com/kubernetes-ingress-controller/2.3.x/guides/configure-acl-plugin/
kubectl create -f https://bit.ly/k4k8s

rem kubectl get pods --all-namespaces -o wide
rem 			Deploy the Metrics Server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
rem kubectl get deployment metrics-server -n kube-system
rem 			Show cluster information
rem aws eks describe-cluster --name t3small-cluster --query "cluster.identity.oidc.issuer" --output text
rem aws iam list-open-id-connect-providers
echo on