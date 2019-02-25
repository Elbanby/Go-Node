FROM node
WORKDIR /app
COPY ./server .
RUN export PORT=4000
EXPOSE 4000
CMD node index.js
