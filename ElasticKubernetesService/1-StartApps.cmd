echo off
kubectl apply -f ingress.yaml

kubectl apply -f 1-apiDotnet.yaml
kubectl apply -f 1-apiPython.yaml


rem kubectl scale deployment api-dotnet --replicas=2
rem kubectl scale deployment api-python --replicas=2

rem kubectl logs -l app=api-dotnet 
echo on