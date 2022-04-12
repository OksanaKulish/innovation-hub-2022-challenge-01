kubectl apply -f apiPython.yaml
kubectl apply -f apiDotnet.yaml

rem Create an Ingress rule to proxy
kubectl apply -f ingress.yaml
kubectl get -o jsonpath="{.status.loadBalancer.ingress[0].hostname}" service -n kong kong-proxy
pause