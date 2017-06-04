
Upload Debug Symbols to Sentry

```bash
export SENTRY_PROPERTIES=sentry.properties

if [ ${CONFIGURATION} = "Release" ]; then
../node_modules/sentry-cli-binary/bin/sentry-cli upload-dsym
fi
```

Bundle React Native code and images

```bash
export SENTRY_PROPERTIES=sentry.properties
export NODE_BINARY=node

../node_modules/sentry-cli-binary/bin/sentry-cli react-native xcode ../node_modules/react-native/packager/react-native-xcode.sh
```
