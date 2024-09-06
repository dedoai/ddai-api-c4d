FROM public.ecr.aws/docker/library/node:20
WORKDIR /app
COPY app/ .
WORKDIR /app
RUN npm install
CMD [ "index.handler" ]
