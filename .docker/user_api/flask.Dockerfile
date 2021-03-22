FROM tiangolo/uwsgi-nginx-flask:python3.8
WORKDIR /app
COPY .docker/nginx.service /etc/systemd/system/nginx.service
ARG DEPLOY_ENVIRONMENT
COPY .docker/uwsgi.$DEPLOY_ENVIRONMENT.ini /app/uwsgi.ini
COPY ./api/requirements.txt /app/requirements.txt
RUN pip3 install -r requirements.txt
COPY ./api /app