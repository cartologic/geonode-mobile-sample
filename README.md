# GeoNode Mobile Sample

> This repo is a [workshop](https://summit.geonode.org/schedule/#session-202) as a part of the [GeoNode Summit](http://summit.geonode.org/) in 2020

![geonode-mobile](https://user-images.githubusercontent.com/44545113/101247866-7834ab00-3724-11eb-9e62-5befed11fc7a.gif)

# Introduction

If you have GeoNode in your environment or considering it as a solution, then you might want to add additional functonalities to it in the future. Possible functionality would be to have a mobile client for your GeoNode backend that users can download and use directly, perhaps add data collection capabilities to that mobile client and send it to GeoNode, or even send push notifications to your users with updates. You can develop your own backend system (php - node - etc...) which consumes resources from your GeoNode directly with the discuess concept in this workshop.

# Target Audience

1. Developers
2. Business Owners

# Development Prerequisites

A basic knowledge of the following is needed to proceed with the workshop

1. Node - React
2. Android Studio (to make the android app) - xCode (to make the iOS app)

# Repository Branches

1. `master` The starting point of this workshop.
2. `completed` The complete working project.

# Workshop Content

Please follow the below steps (on `master` branch to complete the workshop):

> The GeoNode instance you're using must have the CORS enabled for this to work.

> The GeoNode instance that will be used for the workshop has all the needed configurations.

1. Log in to the GeoNode backend and register the mobile app in Django oAuth Toolkit through GeoNode admin (replace GeoNodeHost with your actual host address) https://[GeoNodeHost]/en/admin/oauth2_provider/application/

   - Create a new application.
   - Set `Client type` to `Confidential`.
   - Set `Authorization grant type` to `Resource owner password-based`.
   - Set `Name` to `GeoNode Mobile`.
   - Copy the auto generated `Client id` and `Client secret` into a side note, both will be used later.
   - Hit `Save` to create the oAuth application.

2. Clone/Download the code from the repo https://github.com/Cartologic/geonode-mobile-sample.

```
git clone https://github.com/cartologic/geonode-mobile-sample.git
```

3. Open the code in your IDE and open the file `src/config.ts`.

4. Set the `authenticationClientId` to the `Client id` value from step `1`.

5. Set the `authenticationClientSecret` to the `Client secret` value from step `1`.

6. In your terminal, install the dependencies

```
npm install
```

7. Start the app

```
npm start
```

You should have the app up and running in your browser at `http://localhost:300` by default.

8. Adjust the view in the browser. Open the dev tools, and choose _mobile view_ and set it to either and _Android_ device or _iOS_ device.

9. Test the authentication by using the app to login to GeoNode by a user in the system. (workshop username: _demo_ and password _demo_).

10. The app should login successfully and you see the profile picture of the user visible in the menu. If you click on the picture, that should take you to the profile page to see some information about the user retrieved from GeoNode.

11. To see how the `Authentication` works, open the file `src/context/Authentication/AuthenticationContextProvider.tsx` and check the `loginHandler` method.

12. To Enable Authorization on requests such as the `Get Layers` request. Open the file `src/pages/Home/Home.tsx` and add an authorization header to the Get request at line `47`.

> Instead of

```
const layersCountResponse = await axios.get("/api/layers");
```

> Replace with

```
const layersCountResponse = await axios.get("/api/layers", { headers: { Authorization: `Bearer ${token}` } })
```

This will send the user `Access Token` along with the Get request and GeoNode will identify the approperiate resources to show accordingly.

13. Repeat step `12` again in the `Layers` page to show the `authorized` layers only. Open the file `src/pages/Layers/Layers.tsx` and add an authorization header to the Get request at line `50`.

> Instead of

```
const response = await axios.get("/api/layers", {
          params: {
            order_by: sortLayersBy,
          },
        });
```

> Replace with

```
const response = await axios.get("/api/layers", {
          params: {
            order_by: sortLayersBy,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
```

14. Try doing the same for the `Maps` and `Documents` pages on your own.

# Requests Reference

A postman collection is available in the repo to see the requests (login - logout - get layers) outside of the code.

1. Open Postman app, and import the postman collection from the repo inside the `api` directory.
2. From the Postman app, test `Login` and `Logout` requests to see `Authentication`, then test the `Get Layers` request to see the `Authorization` concept.

```
username: demo
password: demo
```

# Create Android app

For detailed instructions, please refer to the official documentation https://ionicframework.com/docs/developing/android

Generate code build, then create an Android project.

```
npm run build
ionic capacitor add android
ionic capacitor open android
```
