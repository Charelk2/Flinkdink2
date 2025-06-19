#!/bin/sh
# Install dependencies and run tests in CI environments.
set -e
npm install
npm test
