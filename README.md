# Kollab - Online Platform for Project Collaboration

This README would normally document whatever steps are necessary to get the
application up and running. For the reference, we follow from [here](https://dev.to/vvo/a-rails-6-setup-guide-for-2019-and-2020-hf5).

If you need to study rails first, you can follow resources provided by Vincent [here](https://dev.to/vvo/modern-resources-for-learning-rails-6-and-ruby-2cbe).

Things you may want to cover:

- [Kollab - Online Platform for Project Collaboration](#kollab---online-platform-for-project-collaboration)
- [Ruby and Rails Version](#ruby-and-rails-version)
- [Javascript Version](#javascript-version)
- [Environment Configuration](#environment-configuration)
  - [Awesome irb and pry](#awesome-irb-and-pry)
  - [Credentials](#credentials)
- [Database](#database)
- [Editor Configuration](#editor-configuration)
  - [VSCode](#vscode)
- [Style Guide](#style-guide)
  - [Ruby](#ruby)
  - [Rails](#rails)
  - [SCSS](#scss)
- [Testing](#testing)
  - [RSpec](#rspec)
  - [Code Coverage](#code-coverage)
- [Up and Running](#up-and-running)
- [Debugging](#debugging)

To be updated

- System dependencies
- How to run the test suite
- Services (job queues, cache servers, search engines, etc.)
- Deployment instructions

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

# Environment Configuration

## Awesome irb and pry

Reading plain text while debugging is painful. Lucklily, we have gem called **awesome_print** to handle this for us.

Put `.irbrc` and `.pryrc` file to your home directory (~). Content could be copied from my [Github gist](https://gist.github.com/FFEVER/ae20275f858dcc238e39d8d4d7306690)

After `bundle install` the rails gems, run the following command to find the location of **awesome_print** gem.

```
$ gem which awesome_print
```

**Do not copy all path**, copy only until `.../lib/`. Replace the copied path to the first line of both files. Now you will have beautiful debug outputs. No more pain!

## Credentials

In the process of deciding, please read this [article](https://dev.to/vvo/secrets-environment-variables-config-files-the-ruby-on-rails-case-433f).

# Database

Install this version `PostgreSQL 12.1` via **homebrew**. Then make it run at start up.

```
$ brew services start postgresql
```

**Important**: Request password from project manager before create database user.

Add the requested password to your `~/.bash_profile` or `~/.zshrc` or other shell configuration file depends on your prefer shell.

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

# Style Guide

To improve code readability and consistency, we need to have some standard rules for writing our code. Fortunately, `solargraph` and `prettier` is good enough in auto formatting code in `vscode`, but it is also good to know some of the basic.

**You don't need to remember it all!** Skimming through it is enough.

## Ruby

We follow style guide from [Airbnb Style Guide](https://github.com/airbnb/ruby). Please read and try to follow for the best practice.

## Rails

We follow style guide from [here](https://rails.rubystyle.guide/#introduction). Please read and try to follow for the best practice.

## SCSS

We follow style guide from [here](https://sass-guidelin.es/#syntax--formatting). Please read and try to follow for the best practice.

# Testing

## RSpec

Testing is as important as implementing since it makes sure that your code perform as you expected and knows when someone break your code. We use alternative framework for testing called [RSpec](https://github.com/rspec/rspec-rails). Please make sure you know how to write the test properly. You can follow the guide from [the official guide](https://relishapp.com/rspec/rspec-rails/v/3-9/docs/gettingstarted) or [another guide](https://www.codewithjason.com/rails-testing-hello-world-using-rspec-capybara/).

## Code Coverage

After running your tests, open `coverage/index.html` in the browser of your choice. We use [simplecov](https://github.com/colszowka/simplecov) gem.

# Up and Running

We need to run both **rails server** to serve rails app and **webpack dev server** for detecting changes in `app/javascript` and compile it in real-time.
You can run both separately but we suggests you to use app called [Overmind](https://github.com/DarthSim/overmind). The app allow you to run two processes simultaneously and allow you to connect to specific process too.

```
$ brew install overmind
```

To start a rails server, run **overmind** from the project root directory:

```
$ overmind start
```

You can access your rails server from `localhost:5000`.



# Debugging
To debug put **pry** at any line of your code:
```
binding.pry
```
If you are using **Overmind** you need to open another terminal and run:
```
$ overmind connect web
```
After you done your debugging, you can safely disconnect from the window by hitting `Ctrl b` and then `d`.
