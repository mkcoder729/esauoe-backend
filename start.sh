#!/bin/bash
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn esauoe_project.wsgi:application --bind 0.0.0.0:$PORT