This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Dockerise the application

`docker build --tag dineshpillai/flink-streamer-ui . `

To run it:

`docker run -p 3001:80 dineshpillai/flink-streamer-ui:latest`

and will be accessible on http://localhost:3001/

To push the docker image:

`docker push dineshpillai/flink-streamer-ui:latest`

## Run the application on Kubernetes cluster on Digital Ocean

1. Create a K8 cluster, call it flink-mongo-cluster and download the config to ~/.kube directory
2. Confirm the nodes are up and running by cd to ~/.kube directory

`kubectl --kubeconfig=flink-mongo-cluster-config.yaml get nodes`

3. Once you see a list of nodes; you are ready to deploy ui to K8
4. Now cd to flink-streamer-ui/helm/flink-streamer-ui directory. This is where you are currently developing the UI from
5. Run the following helm command to install flink-streamer-ui

`helm install flink-streamer-ui --kubeconfig ~/.kube/flink-mongo-cluster-kubeconfig.yaml . `

6.Confirm if the pod is up and running by cd back to .kube directory

`kubectl --kubeconfig=flink-mongo-cluster-config.yaml get pods`

7. Once you see the flink streamer pod running; port forward local to this pod
`kubectl --kubeconfig=flink-mongo-cluster-kubeconfig.yaml port-forward flink-streamer-ui-7d79f4b55b-m54v6 3001:80`