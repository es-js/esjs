#!/bin/bash

set -xe

# Bump all packages
for PKG in ./packages/* ; do
  pushd $PKG
  echo "⚡ Bumping $PKG"

  # Bump version
  pnpm dlx @jsdevtools/version-bump-prompt

  popd > /dev/null
done

