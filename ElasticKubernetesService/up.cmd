eksctl create cluster -f aws_eks.yaml 

kubectl apply -f https://projectcontour.io/quickstart/contour.yaml

kubectl get pods -n projectcontour -o wide
kubectl get services -n projectcontour
kubectl get develop -n projectcontour
