#!/usr/bin/env bash
# exit on error
set -o errexit

gunicorn core.wsgi:application --bind 0.0.0.0:$PORT
