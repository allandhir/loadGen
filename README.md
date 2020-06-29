# loadGen
React app to view metrics and to start/stop load testing (displays only readyReplicas for now. Similarly other metrics like cpu, memory utilization and more can be added)
**3 deployments**
- React app served on nginx
- node server to generate load
- node server subjected to load


_______________________________________________________
Requires a kubernetes environment up and running with additional default addons:
  - metrics-server
  - ingress

#### Consider these as you rollout HPA(step 8):
- The default HPA check interval is 30 seconds. This can be configured through the --horizontal-pod-autoscaler-sync-period flag of the controller manager

- HPA waits for 3 minutes after the last scale-up events to allow metrics to stabilize. This can also be configured through -- horizontal-pod-autoscaler-upscale-delay flag
- HPA waits for 5 minutes from the last scale-down event to avoid autoscaler thrashing. Configurable through — horizontal-pod-autoscaler-downscale-delay flag

for minikube
```sh
$ minikube start — extra-config=controller-manager.horizontal-pod-autoscaler-upscale-delay=1m — extra-config=controller-manager.horizontal-pod-autoscaler-downscale-delay=1m — extra-config=controller-manager.horizontal-pod-autoscaler-sync-period=10s — extra-config=controller-manager.horizontal-pod-autoscaler-downscale-stabilization=1m
```
# Build images

```sh
$ docker build -t <name>:<tag> ./frontend/
$ docker build -t <name>:<tag> ./backend/loadgen/
$ docker build -t <name>:<tag> ./backend/loadnode/
```
**change image <name>:<tag> in \*.deployment.yaml files accordingly**

# kubectl away
#### ServiceAccount, Role and RoleBinding
1. create a serice account named testsa in default namespace
```sh
$ kubectl create sa testsa
```

2. create a role that allows pods to access resource: deployments with verbs: get, watch, list (just enough permissions to get no. of ready replicas)
```sh
$ kubectl create -f testsa-role.yaml
```
3. Bind this role to the testsa service account (pods with testsa service account now will have permissions to access resource: deployments with verbs: get, watch, list)
```sh
$ kubectl create -f testsa-rolebinding.yaml
```
#### Backend
4. create loadnode-deployment and service (server subjected to load)
```sh
$ kubectl create -f loadnode-deployment.yaml
$ kubectl create -f loadnode-service.yaml
```
5. create node-app-deployment and service (server that causes load)
```sh
$ kubectl create -f node-app-deployment.yaml
$ kubectl create -f node-app-service.yaml
```
#### Frontend
6. create react-service1-deployment and service (frontend)
```sh
$ kubectl create -f react-service1-deployment.yaml
$ kubectl create -f react-service1-service.yaml
```
7. create ingress to reach your frontend application. 
```sh
$ kubectl create -f test-ingress.yaml
```
To check IP of ingress.
```sh
$ kubectl describe ingress react-ingress
```
#### Horizontal pod autoscaler
8. hpa maintains average cpu utilization of 4% across all pods and scales up/down accordingly
```sh
$ kubectl autoscale deployment loadnode-app-deployment --cpu-percent=4 --min=1 --max=4 
```

# Test
- Access Ingress IP from browser and react application should be displayed.
- press on "getReplicas". Should show "1" as there is no load yet.
- press "genLoad" and wait for a minute
- Meanwhile open and exec `kubectl get hpa loadnode-app-deployment -w` to monitor the avg CPU utilization.
- Once average crosses 4%, pods are upscaled to max of 4.
- press "stopLoad" and wait. You should see falling cpu utilization and reducing number of replicas




