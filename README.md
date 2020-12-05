# GeoNode Mobile Sample

This repo is part of the `GeoNode Summit` in 2020

It is a sample cross platform mobile app that leverages GeoNode as a back-end

## Workshop Content
The following steps will be followed in the workshop:
1. Clone/Download the code from the repo https://github.com/Cartologic/geonode-mobile-sample
```
git clone https://github.com/cartologic/geonode-mobile-sample.git
```
2. Log in to the GeoNode backend to register the mobile app in Djago oAuth Toolkit http://summit2020.cartoview.net/
3. Open Postman app, and import the postman collection from the repo inside the `api` directory.
4. From the Postman app, test `Login` and `Logout` requests to see `Authentication`, then test the `Get Layers` request to see the `Authorization` concept.
```
username: demo
password: demo
```
5. Open the code in your IDE, then from the terminal install the dependencies and run the code.
```
npm install
npm start
```
6. To check how `Authentication` works, open the file `src/context/Authentication/AuthenticationContextProvider.tsx` and check the `loginHandler` method.
7. To Enable Authorization on requests such as the `Get Layers` request. Open the file `src/pages/Home/Home.tsx` and add an authorization header to the Get request
```
get("/api/layers", { headers: { Authorization: `Bearer ${token}` } })
```
### Create Android app
8. 