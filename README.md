# link
### Free client side link tracking with GitHub Pages & Google Analytics

**Simply fork, configure, and create your own custom tracked links!*

Example: [My GitHub Profile][example_link]

![Google Analytics Dashboard](https://github.com/GleasonK/link/blob/main/readme_img.png?raw=true)


# Setup
## 1. Create a Google Analytics account (if needed)
This step can be skipped if you already have an account.
_link_ tracking uses GA to collect and store data.

[Instructions to Setup Google Analytics][google_setup]

## 2. Fork this repository
Make copy of this repo.
_link_ tracking uses GitHub Pages to collect data and redirect users.

[How to Fork a Repo][gh_fork_repo]

## 3. Set your google analytics ID in the `config` field of link.js
Set the `gaID` field in `link.js` of your forked repo. This ID is used by Google to direct Analytics Events such as link clicks to your account.

```js
const config = {
	gaID: 'UA-46933211-3', // CHANGE ME
	// ...
};
```
Analytics ID can be found in the Admin panel on Google Analytics.

[How to Find Google Analytics ID][google_find_id]

## 4. Set up github pages for your repo
GitHub Pages will serve the _link_ tracking and forwarding repo for free!

[How to Setup GitHub Pages for a Repository][gh_pages_setup]

## 5. All done!
Links can now be created using `<username>.github.io/link/?l=<url>`.

Github pages can be configured to a custom domain name (mine is set to kevingleason.me), which allows creation of tracked links to have a custom name.

[How to Setup a Custom Domain with GitHub Pages][gh_custom_domain]

[example_link]:https://kevingleason.me/link/?l=https://github.com/GleasonK/
[google_setup]:https://support.google.com/analytics/answer/1008015
[gh_fork_repo]:https://docs.github.com/en/get-started/quickstart/fork-a-repo
[google_find_id]:https://support.google.com/analytics/answer/1008080
[gh_pages_setup]:https://pages.github.com/
[gh_custom_domain]:https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site