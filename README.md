# Kollab - Online Platform for Project Collaboration

This README would normally document whatever steps are necessary to get the
application up and running. For the reference, we follow from [here](https://dev.to/vvo/a-rails-6-setup-guide-for-2019-and-2020-hf5).


Things you may want to cover:

* [Ruby version](#-ruby-and-rails-version)

* [Javascript version](#javascript-version)

* System dependencies

* Configuration

* [Database initialization](#-database)

* [Editor configuration](#editor-configuration)

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions


# Ruby and Rails Version
`ruby 2.6.5`

`rails 6.0.2.1`

We use **rbenv** as a Ruby Version Manager. Please follow this [tutorial(Thai)](https://blog.datawow.io/%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9A%E0%B8%87%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%86%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-ruby-on-rails-part-i-840749ecc4e8) for initial setup.

# Javascript Version
`node v12.14.0`

`npm v6.13.4`

`yarn v1.21.1`

Use `nvm` as a Javascript Version Manager. Install it from [here](https://github.com/nvm-sh/nvm#install--update-script).

Go to `kollab/` then run:
```
$ nvm use
$ nvm install
$ nvm exec
$ nvm which
```




# Database
Install this version `PostgreSQL 12.1` via **homebrew**. Then make it run at start up.
```
$ brew services start postgresql
```

**Important**: Request password from project manager before create database user.

Add the requested password to your `~/.bash_profile` or  `~/.zshrc` or other shell configuration file depends on your prefer shell.
```
export KOLLAB_DATABASE_PASSWORD="requested_password"
```

Create user named `kollab` and enter the requeted password by:
```
$ createuser -P -d kollab
```

Create a new database from `kollab/` by:
```
$ rails db:setup
$ rails db:migrate
```

# Editor Configuration
## VSCode
The recommended extensions are defined in `.vscode/extensions.json`
- [Endwise](https://marketplace.visualstudio.com/items?itemName=kaiwood.endwise)
- [Solargraph](https://marketplace.visualstudio.com/items?itemName=castwide.solargraph)
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- [Ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

The recommended settings are defined in `.vscode/settings`
