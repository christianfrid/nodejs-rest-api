#!/bin/bash
set -e

if [ -n "${MONGO_INITDB_ROOT_USERNAME:-}" ] && [ -n "${MONGO_INITDB_ROOT_PASSWORD:-}" ]; then
mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD<<EOF
use warehouse;
db.createUser({user: "$MONGO_DB_USERNAME", pwd: "$MONGO_DB_PASSWORD", roles : [{role: "readWrite", db: "warehouse"}]});
EOF
else
  echo "Could not create user."
  exit 1
fi
