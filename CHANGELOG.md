
## 0.7.0

Features:

- [Commit] screen - initial implementation
- [RepositoryIssue] screen - initial implementation
- [RepostioryPullRequest] screen - initial implementation
- [Android] Upd buildToolsVersion to `26.0.1`
- [Android] Upd gradle to `2.3.3`

Fixes:

- [Android] Fixed crash with Sentry

## v0.6.1

Fixes:

- [Login] Fix `ImageBackground` for tablets
- [Android] Support Deep linking
- [Android] Fixes for OAuth

## v0.6.0

Features:

- Implement [OAuth] login type
- Implement [AccountIssues] screen, thank @lex111
- Showing Badges on PRs
- Feed - better support for different events
- Better performance with new `React Native`

Code:

- `ESLint` fixes, green CI :smiley_cat:
- Better `Flow` support

Full diff: https://github.com/ovr/ghubber/compare/0.5.1...0.6.0

## v0.5.1

Features:

- Better About screen

Fixes:

- iOS app performance

Full diff: https://github.com/ovr/ghubber/compare/0.5.0...0.5.1

## v0.5.0

## v0.4.1

- [AccountIssues] NFR: Implement infinity loading
- [AccountIssues] Hotfix: Change type was not working
- [Android] Fix epic broken build

## v0.4.0

- Implement SideMenu (Drawer)
- Implement Account Issues
- Profile screen - better desing, more info
- ProfileScreen show Repositories count badge
- Implement KeyBoardAvoidingView (it was not able to login on small device, for example iPhone 5 SE)
- RepositoryScreen - render README
- Error logging by Sentry
