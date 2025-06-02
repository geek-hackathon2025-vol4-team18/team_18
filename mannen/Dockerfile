FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install uv

WORKDIR /app

ENV UV_CACHE_DIR=/tmp/uv-cache
ENV UV_LINK_MODE=copy

CMD ["/bin/bash"]