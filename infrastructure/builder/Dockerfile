FROM public.ecr.aws/lambda/nodejs:20
COPY ./app/package*.json ${LAMBDA_TASK_ROOT}
RUN npm install
COPY ./app/ ${LAMBDA_TASK_ROOT}
CMD [ "index.handler" ]
