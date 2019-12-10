#!/bin/sh
set -e
tsc -w --preserveWatchOutput&
npx babel --config-file=../../../babel.config.cjs.js lib --out-dir dist/cjs -w --verbose&
npx babel --config-file=../../../babel.config.js lib --out-dir dist/esm -w --verbose
