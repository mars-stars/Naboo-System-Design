# What image do you want to start building on?
FROM node:14

# Tell your container where your app's source code will live
WORKDIR /usr/src/Naboo-System-Design

# What source code do you what to copy, and where to put it?
COPY package*.json ./

# Does your app have any dependencies that should be installed?
RUN npm install

# Bundle app source
COPY . .

# What port will the container talk to the outside world with once created?
EXPOSE 3000

# How do you start your app?
CMD [ "node", "index.js" ]