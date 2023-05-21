# Pixelwave
Repo for storing files in creation of Pixelwave site as part of my Responsive Full Stack Web Development Assignment 2

To Install
- Open the folder and navigate to the ./src folder (in command prompt)
- Ensure that you have cofnigured your path to include the location of your node folder
- run 'npm install' (sometimes running npm install doesn't work, so if it doesn't try running 'npm install --legacy-peer-deps')
- in a second command prompt tab, navigate to ./src/backend
- run 'npm install' (again, sometimes running npm install doesn't work, so if it doesn't try running 'npm install --legacy-peer-deps' instead)

To Run
- Ensure that the setting in DEV.env match those of your local MySQL instance
- in the frontend tab (./src), run npm start and wait for the development server to start up
- on the backend tab, run 'node dbCalls.js'. You should be met with the message 'Express Server Listening on Port  3001'
- When this is done, you should be able to use my Pixelwave site.