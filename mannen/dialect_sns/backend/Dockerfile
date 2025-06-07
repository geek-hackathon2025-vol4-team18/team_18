FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install uv

WORKDIR /backend

ENV UV_CACHE_DIR=/tmp/uv-cache
ENV UV_LINK_MODE=copy

ENV FLASK_APP=run.py
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=8080

EXPOSE 8080

CMD ["/bin/bash"]