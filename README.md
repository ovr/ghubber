[![GitHub release](https://img.shields.io/github/release/ovr/ghubber.svg)](https://github.com/ovr/ghubber/releases)
[![Build Status](https://travis-ci.org/ovr/ghubber.svg?branch=master)](https://travis-ci.org/ovr/ghubber)
[![Greenkeeper badge](https://badges.greenkeeper.io/ovr/ghubber.svg)](https://greenkeeper.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

![Logo](/.github/assets/logo.jpg?raw=true "Logo")

# <img src="https://socialconnect.github.io/assets/icons/mark-github.svg" width="27"> GHubber (GitHub mobile client)

Yet another Mobile :iphone: client for GitHub powered on react-native.

> It's alpha, in development ;)
 
## How to get alpha version :atom:
 
### Android

The app is an alpha and the easiest way to install will be Play Market Alpha version. To get access to the alpha, you should:

1. Join [Google Plus Group](https://plus.google.com/communities/115242870069378334413) (needed to access in play market alpha page)
2. https://play.google.com/apps/testing/com.ghubber
3. https://play.google.com/store/apps/details?id=com.ghubber (refresh multiple times, maybe not allowed due delay in Google)

### iOS

Please send a email to `zaets28rus@gmail.com` with Subject: `Invite me to GHubber TestFlight` and your email, firstname, lastname.

> Note: Be sure to incude the email you use for iTunes.

## Installation 

Before we start to develop app you should configure your env:

### Common

1. You should install NodeJS with NPM

OSX by brew:

```bash
brew install nodejs
```

Debian and Ubuntu:

```bash
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Now you should install dependencies by `NPM`, inside project directory run:

```bash
npm install
```

[If you have another OS](https://nodejs.org/en/download/package-manager/)

### Android

1. You should download and [install Android Studio](https://developer.android.com/studio/install.html)
2. Run Android Studio and download default SDKs, don't forget to configure path(s)

```
export ANDROID_HOME=/Users/<user>/Library/Android/sdk
export PATH=$ANDROID_HOME/platform-tools:$PATH
```

3. Run emulator:

#### Way 1: Built-in Android emulator, use KVM on linux if it's installed for acceleration

> Note: KVM and VirtualBox supposedly cannot coexist, or rather, VirtualBox won't run while the KVM modules are loaded in memory

The easy way will be to create a new device inside Android Studio, press run

#### Way 2: [Genymotion](https://www.genymotion.com/) is a cool emulator, it runs on VirtualBox

Run it, you will see ;)

#### Way 3: Run on real device (I didn't use this method for development, and I don't recommend it)

First you should enable Developer menu on Android, Google it or try:
 
1. Go to the settings menu, and scroll down to "About phone." Tap it.
2. Scroll down to the bottom again, where you see "Build number." (Your build number may vary from our's here.)
3. Tap it seven (7) times. After the third tap, you'll see a playful dialog that says you're four taps away from being a developer. (If only it were that simple, eh?) Keep on tapping, and *poof*, you've got the developer settings back.

### iOS

> Note: Sorry, but for build `iOS` you should have `macOS`

It's pretty easy, you should install XCode by AppStore :+1:

## Lets run ;)

### Way 1

You should open 2 terminals

Inside second you should write:

```bash
npm run start
```

Inside first:

Android:

```bash
npm run android
```

iOS:

```bash
npm run ios
```

### Way 2

Or just run `npm run start:android` or `npm run start:ios` depending on the platform :smile:

## Roadmap

> Will be continued // @todo

- **AccountIssues**
    - [X] Overview
    - [X] Filter by types
    - [X] Infinity loading
    - [X] Refreshing
- **Feed**
    - [X] Overview
    - [X] Infinity loading
    - [ ] Refreshing
- **Profile**
    - [X] Overview
        - [X] Information
        - [X] Contributions Graph (Tablet only, for now)
        - [X] Organizations
        - [ ] Pinned Repositories (will be in v0.5.0)
    - [X] Repositories
    - [ ] Stars
    - [ ] Following
    - [ ] Followers
    - [ ] Gists
- **Repository**
    - [X] Overview      
    - [ ] Issues      
    - [ ] PRs      
    - [ ] Watchers
- **Organization**
    - [ ] Overview
    - [ ] Teams
    - [ ] Repositories
- **Pull Request**
    - [ ] Overview
    - [ ] Close/re-open
    - [ ] Add/remove/edit comment
- **Issue**
    - [ ] Overview
    - [ ] Close/re-open
    - [ ] Add/remove/edit comment

## We are hiring

Do you know JS and React and would like to code on react-native for $? Write an email to dmitry@interpals.net with your resume and join Interpals.net.

## Sponsors

Thanks to our sponsors and supporters:

| JetBrains | Interpals                 |
|-----------|---------------------------|
| WebStorm  | Hosting App inside Itunes |


## LICENSE

This project is open-sourced software licensed under the MIT License with Additions.

* You are not able to edit About Page.
* Delete any copyrights.
* You are not able to fork/clone/rebuild repository to publish "YOU FORK NAME" to Play Market, ITunes or any app stores.

See the [LICENSE](LICENSE) file for more information.
