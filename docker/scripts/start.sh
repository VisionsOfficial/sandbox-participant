#!/bin/bash

if [ "$TEST" = 'provider' ]; then
  npm run seed
fi

if [ "$ENV" = 'development' ]; then
  npm run build && npm run start
else
  npm run build && npm run start
fi
