## Clone this, reset the git url, and make an app

### Notes

Install `release-it` (`npm install release-it -g`) to make bumping versions real easy.

If `release-it` complains about your upstream repo, push once with the `-u` flag set
(`git push -u origin master`) to tell git that `origin/master` is to be the tracking branch
for the branch that you're currently pushing from. Yay git.

`git config --global push.default simple`

#### Repo Config

To work on a module, go and fork it from the Ohmubus org.

Locally, your module repos will need to be set up with two remotes, `ohmubus` and
`origin`. `ohmubus` points to the org repo, `origin` points to your fork.

Ensure that your local repo knows to use your `origin/master` as the remote
tracking branch for your local `master`. You can do so using the `-u` flag
to git push or by setting up your `.git/config` as below.

Example repo config:

    [core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
    [remote "ohmubus"]
        url = https://github.com/ohmubus/tachikoma.git
        fetch = +refs/heads/*:refs/remotes/ohmubus/*
    [remote "origin"]
        url = https://github.com/enlore/tachikoma.git
        fetch = +refs/heads/*:refs/remotes/origin/*
    [branch "master"]
        remote = origin
        merge = refs/heads/master

That last bit, the branch config section, seems to set up the remote tracking
branch for `git push` and `pull` purposes, resultant from `git push -u ...`.

#### NPM Setup

If doing a release, be sure to be logged in to NPM on the command line via
`npm login`.

#### .release.json

Each user's install of Cognition Lab requires some setup to be able to do
releases. The config files for release-it live in each module's dir in
`src/app/lib/<module>`.

The important fields are in `src`, `dist`, and `npm`. `src.pushRepo` should be
set to the github url of _your fork_ of the module.

`dist.repo` should be set to the _upstream fork_, in this case the fork on the
Ohmubus org.

Doing a relase will push a tag up to both your fork and the golden fork on the
org. Doing a release with also push a commit to each fork's `master` branch.
The template currently looks like "Release <version>", as is show in the config
below.

You'll need to dip into each module and edit those config files. I'll automate
this setup process later.

    {
        "non-interactive": true,
        "dry-run": false,
        "verbose": false,
        "force": false,
        "pkgFiles": ["package.json"],
        "prereleaseId": null,
        "commitMessage": "Release %s",
        "tagName": "%s",
        "tagAnnotation": "Release %s",
        "buildCommand": false,
        "changelogCommand": "git log --pretty=format:'* %s (%h)' [REV_RANGE]",
        "requireCleanWorkingDir": false,
        "src": {
            "pushRepo": "https://github.com/enlore/tachikoma.git",
            "beforeStartCommand": false,
            "beforeStageCommand": false,
            "afterReleaseCommand": false
        },
        "dist": {
            "repo": "https://github.com/ohmubus/tachikoma.git",
            "stageDir": ".stage",
            "baseDir": "dist",
            "files": ["**/*"],
            "pkgFiles": null,
            "beforeStageCommand": false,
            "afterReleaseCommand": false
        },
        "npm": {
            "publish": true,
            "publishPath": ".",
            "tag": "latest",
            "private": false,
            "forcePublishSourceRepo": false
        },
        "github": {
            "release": false,
            "releaseNa": "Release %s",
            "tokenRef": "GITHUB_TOKEN"
        }
    }

## Release Workflow

Hacker:

1. Pull from the golden repo: `git pull ohmubus master`
2. Hack on features
3. Commit locally
4. Push to your fork `git push origin master`
5. Jump on github and initiate a pull request

Releaser:

1. Jump on github and look at the PR from the hacker
2. Review, comment, approve, deny, etc. Ultimately merge new stuff into golden
   repo
3. Locally (your command line), pull from the golden repo: `git pull ohmubus
   master`
4. Be sure to have logged into NPM via cmd line: `npm login`
5. Still sitting in the module's dir, invoke `release-it`

`release-it` can do a few differnent things. In this case, it'll be set up to
non-interactively:

* Push a commit to `ohmubus/master` on Github labeled "Release <version>"
* Push a tag up to `ohmubus`, creating a versioned release
* Push a commit to your fork on Github labeled as above
* Push a tag up to your fork on Github, created a versioned relase
* Push a this newly tagged and commited version of the module to npm using `npm
  * publish`

_Note_ that the above workflow assumes that the releaser has no merge conflicts
when pulling down the newly merged feature from their fellow dev. Merge
conflicts require a slightly different workflow, but the end goal is the same:
pull down into your local repo from the golden org repo, invoke `release-it`.

_Further, note_ that you will never need to tag a release yourself or bump the
version property in `package.json`.

If you are the hacker providing the new version's code, after the release is
published you may want to pull the tag from the org repo into yours, but it's
not strictly necessary. You'll get the newest version of the module when you
pull from the golden repo.
