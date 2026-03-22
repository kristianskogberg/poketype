Author: Kristian Skogberg
Email: k.skogberg98@gmail.com

This is a mobile application created with React Native for both Android and iOS devices. Users can search for a Pokémon or Type and the application will display the name of the Pokémon, its Pokédex number, its type and an image of that Pokémon. Images are fetched from PokéAPI. The application will calculate which types the Pokémon is strong against, weak against, resistant to and vulnerable to and display them conveniently. Alternatively by clicking the different types users can view information about that specific type.

PokéAPI documentation: https://pokeapi.co/docs/v2

To run on an emulator:

```bash
npx expo start
```

## Releasing a new Android build

When publishing an update to the Google Play Store, you need to increment the `versionCode` in **two places**:

1. `app.json` → `expo.android.versionCode`
2. `android/app/build.gradle` → `defaultConfig.versionCode`

Both must match and be higher than the previous Play Store version. Then commit, push, and build (must be committed before build):

```bash
eas build --platform android --profile production
```
