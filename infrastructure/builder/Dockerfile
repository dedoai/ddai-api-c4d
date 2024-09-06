FROM public.ecr.aws/lambda/nodejs:20
WORKDIR /app
COPY ../../app/package*.json ./
RUN npm install
COPY ../../app/ .

CMD [ "index.handler" ]
