# AppasionArte

## Introduction

"AppasionArte" is a web application designed for artists from different disciplines to have a space where they can share their art with others; it is also intended for anyone who wants to enrich themselves by enjoying shared art.


![AppasionArte](https://media1.tenor.com/m/KOTZkOM5W3oAAAAC/animated-greeting-card-art.gif)

## Functional description

The application allows:

- Creating a user profile where you can share your creations in any of the available categories.
- Accessing in guest mode to enjoy artists' posts.

### Uses cases

Artist
- register
- login
- logout
- create content (create, find, modify and remove their short stories)
- share public profile
- manage private archive (future version)

Guest
- Read Short Stories and see the Profile of our creators
- filter to artist(future)
- filter to categories(future)


### UI/UX design

[Figma](https://www.figma.com/design/DILuhWXcqfurXML03D21W4/AppasionArte?node-id=0-1&p=f&t=guzoQt1SbMVL2OQE-0)

## Technical description
- This web app is built following 3 layers architecture

### Blocks

- App (React)
- API (Expess)
- DB (Mongo)

### Packages

- api (handlers, logic, data)
- app (components, logic, data)
- com (errors, validate, regex)
- doc (readme, images)

### Data Model

UserData
- id (unique, string)
- name (required, string)
- email (required, unique, string)
- username (required, unique, string)
- password (required, hashed, string)
- image (string)
- description (string)

StoryData
- id (unique, string)
- author (author.id, unique, require)
- title ( string, required)
- shorStory ( string, required)
- storyDate (date, required)

### Techs

- HTML / JavaScript / CSS / Tailwind / React / React Router
- Node / Express / Mongo / Mongoose / BCrypt / JWT / curl / Mocha / Chai / Morgan
- Git / Markdown / VSCode / Sublime Merge

## Tracking

[PR](https://github.com/b00tc4mp/neoland-202510/pull/31)
