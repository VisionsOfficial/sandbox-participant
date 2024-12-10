#!/bin/bash

if [ "$TEST" = 'provider' ]; then
  npm run seed
fi

if [ "$ENV" = 'development' ]; then
  npm run dev
else
  npm run build && npm run start
fi
