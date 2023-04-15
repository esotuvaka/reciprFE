# reciPR Frontend

Frontend for reciPR, a meal prep recipe sharing web app. Create and Explore different recipes, filter by allergies / diet, and save your favorites in collections!

---

### Built using React, TypeScript, TailwindCSS

---

### Upcoming changes:

- [ ] implement filtered API endpoints, e.g: "BACKEND/tags=chicken,air%20fryer&max_calories=500"
- [x] implement GET by ID via header searchbar
- [x] update createRecipe to also take macros
- [x] implement repository pattern for all API calls
- [ ] ? create and use repository pattern for app state management (redux workaround)
- [ ] ? create and use repository pattern for error management (passing to components that have errors with API data for example)
- [ ] implement auth
- [ ] implement session trackers to prevent API spam (throttled to 1 call per x time interval)
- [ ] implement form input validation
- [ ] implement ability to like and save posts
- [ ] implement profiles and editing collections of recipes
- [ ] implement explore filter for diet / allergies
