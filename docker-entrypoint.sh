#!/bin/bash

PORT="${PORT:-8000}"
HOST="${HOST:-0.0.0.0}"

cd /code
exec python manage.py runserver "${HOST}:${PORT}"