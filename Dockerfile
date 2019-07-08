FROM node:10

# Create application directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy all files to the container
COPY . ./

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY ./app/package*.json ./app/

# Set environment variables
ENV NODE_ENV=production

# Install Angular CLI
RUN npm install -g @angular/cli

# Run build for production
RUN npm run prod

# Remove entire Angular application keeping only /dist
RUN rm -rf ./app

# Install PM2 to daemonize application
RUN npm install -g pm2

EXPOSE 3000

CMD ["pm2-runtime", "index.js" ]