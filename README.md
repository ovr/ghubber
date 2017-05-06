# <img src="https://socialconnect.github.io/assets/icons/mark-github.svg" width="27"> GHubber (GitHub mobile client)

[![Build Status](https://travis-ci.org/ovr/ghubber.svg?branch=master)](https://travis-ci.org/ovr/ghubber)
[![Greenkeeper badge](https://badges.greenkeeper.io/ovr/ghubber.svg)](https://greenkeeper.io/)


Yet another Mobile :iphone: client for GitHub powered on react-native.

> It's alpha, in development ;)
 
## How to get alpha version :atom:
 
### Android

Due, app is an alpha, the easiest way to install, will be Play Market Alpha version, to get access for alpha, you should do:

1. Join [Google Plus Group](https://plus.google.com/communities/115242870069378334413) (needed to access in play market alpha page)
2. https://play.google.com/apps/testing/com.ghubber
3. https://play.google.com/store/apps/details?id=com.ghubber (refresh multiple times, maybe not allowed due delay in Google)

### iOS

I am sorry, but this will be in near feature

# Installation 

Before We start to develop app your should configure your env:

## Common

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

[If you are having another OS](https://nodejs.org/en/download/package-manager/)

## For Android

1. You should download and [install Android Studio](https://developer.android.com/studio/install.html)
2. Run Android Studio and download default SDKs, don't forget to configure path(s)

```
export ANDROID_HOME=/Users/ovr/Library/Android/sdk
```

3. Run emulator, you can run default emulator or genymotion

- Built-in Android emulator, use KVM on linux if it's installed for acceleration

> Attentation, KVM and VirtualBox supposedly cannot coexist, or rather, VirtualBox won't run while the KVM modules are loaded in memory

- [Genymotion](https://www.genymotion.com/) is a cool emulator, it runs on VirtualBox

## For OSX

It's pretty easy, you should install XCode by AppStore

 
### Roadmap

> Will be continued // @todo

- **Profile**
    - [X] Overview
    - [X] Repositories
    - [ ] Stars
    - [ ] Following
    - [ ] Followers
    - [ ] Gists
- **Repository**
    - [ ] Overview      
    - [ ] Issues      
    - [ ] PRs      
    - [ ] Watchers
- **Issue**
    - [ ] Overview
    - [ ] Close/re-open
    - [ ] Add/remove/edit comment

### LICENSE

This project is open-sourced software licensed under the MIT License.

See the [LICENSE](LICENSE) file for more information.
