rem create cluster
eksctl create cluster -f aws_eks.yaml 
rem create Ingress controller https://docs.konghq.com/kubernetes-ingress-controller/2.3.x/guides/configure-acl-plugin/
kubectl create -f https://bit.ly/k4k8s

kubectl get pods --all-namespaces -o wide