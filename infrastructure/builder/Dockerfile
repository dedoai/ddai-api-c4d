FROM public.ecr.aws/lambda/nodejs:20
WORKDIR /app
COPY app/ .
WORKDIR /app
RUN npm install
CMD [ "index.handler" ]
