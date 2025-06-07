// learn date-fns first and build a small project to understand it ✅
// fix date issues when updating the date ✅
// fix the filtering of habits timing thing ✅
// update the header of today component as per design  ✅
// dont reload the whole app just while updating next month ✅
// dont show habits on dates which are behind the date of creation ✅
// dont show habits on days which are not included in repeadted habits list ✅
// use node js and mongodb ✅
// complete the next.js course from codeevolution
// make it mobile / tab responsive - ✅
// complete the stats and chart component from design
// Add Animation using Framer motion - ✅
// add signIn and sinUp functionality and store user data - ✅
// use React Querry
// find correct way to store habits to date / date into habit object
// learn typescript for react && next.js and refactor the code

// how can i take this thing to next level ?

// UI enhancements: Continually improve your UI based on user feedback and the latest design trends.
// For instance, you could add a dark mode, create a more intuitive onboarding process, or provide more customization options for the users.

// Performance: Ensure the app loads quickly, runs smoothly, and is optimized for different devices. React's virtual DOM
//  provides opportunities for fine-tuning performance that can make a significant difference.

// Accessibility: Make sure your app is accessible to users with disabilities. This can involve providing alternative text for
// images, ensuring good contrast between text and background, and making sure the app can be fully used with a keyboard.

// Social Features: Allowing users to share their progress, join groups, or compete in challenges could make the app more engaging.

// Notifications and Reminders: Users could benefit from customizable reminders about their habits. You could also use notifications
// to celebrate milestones or suggest new habits based on their progress.

// const byDate = habit => isBefore(selectedDay, new Date(habit.createdDate))
// const byDay = habit => !habit.repeatHabitDays.includes(selectedDay)

//! main stuff
// /habits
// Habit
// HabitForm

//? least concern
// calendar
// constants
// deleteHabit
// HabitsCompletionChart
// HabitsStats
// Sidebar

// i went over the code and saw how things i've built
// and its a simple code base
// what i learnt is that the main thing is the habit object

// baki ka everything is sorted well
// one thing to fix later is : isCompleted feature

// write now i can start creating new habits which has the similar key and values
// and then see if everything is rendered / calculated correctly

// design : https://hype4.academy/video-courses/web-design-course
// react : https://www.joyofreact.com/
// animation : https://animations.dev/
// css : https://css-for-js.dev/

// bugs :
// - create , edit and stats popup enter and exit fucks up - fixed ✅
// - overflowing of stats component is fucked up , should not be able to go round and round - fixed ✅
// - more space in the bottom for habits  - fixed ✅

// features :
// find a way to add the "why" behind the habit

// goals page

// - API'S
// -- create goal - done ✅
// -- get goals - done ✅
// -- update goals - done ✅
// -- delete goals - done ✅

// - UI
// -- create goal form dialog - done ✅
// -- handle ui for adding habits - done ✅
// -- goal detail page - done ✅
// - impliment sidebar - done ✅
// - figure out img upload

// bugs :

// - cant choose date after today's date - done ✅
// - the goal habit card does not go away after i delete - done ✅
// - fix habit width issue on mobile - done ✅
// delete goal - done ✅
// after habit creation inside goal the habit is not immediately rendered - done ✅
// even after deleting the habit from goal the habit is not removed from the goal - done ✅
// - add img to goal
// - update goal
// show a empty screen when there are no goals - done ✅
//
// show a loading state while creating goal and habits
// - show a loading state while fetching goals
// - show a loading state while fetching habits
// - show a loading state while updating goal
// - show a loading state while deleting goal
// - show a loading state while deleting habit
// - show a loading state while updating habit

// - figure out how habits and goals will be connected - done ✅
// - here is how you are doing it :
// create goal and get the goal
// each habit should have the goal id
// now create habits in bulk and get them back
// once you have that habits array
// replace the habits array of goal obj and return the goal

// goals detail page design 💡

// white space consistency
// consistency in colors
// better cards
// consistency in font weight
// better / new colors

// add stuff to fill the page
// - goal check box button
// - bigger goal progress tracker for habits like github calendar if the goal is habit based
// - if its a milestone based goal then show normal progress bar
// - add milestone adding and rendering feature

// - make the habits / miltestions page better looking
// - notes / logs to anaa hi chahiye
// - visuals
// - update , delete
// - habit and goal check accomplishment reward feature
// -

//     name: "Design Engineer $80k to $100k",
//     description: "It's more than just a financial target. It's about a promise and commitment. I aim to marry the love of my life, Shreya. To earn her family's trust and show my dedication, I understand the need to distinguish myself from the crowd, both in ambition and achievement. It's imp to show that I can provide and care for our future.",
//   const dateWhichIsAfterCurrDate = add(today, {
//     days: 309,
//   });

// how does milstone work ?

// its a one time check thing
// is specific to goal only
// looks like  a habit but isnt one
// if all the milstones checked then the goal is completed
// on goal completed we need to show a success UI

// ojb : name and isCompleted - ✅
// create milestone button
// - gets the ojb
// - calls an api : createMilstone
// - in the backend :
// --- gets the goal id
// --- and that obj is added into the milstones array
// render that
// on click make is !isComplete
// and call the api
// in the backend :
// - get the id
// - find the goal
// - inside that goal find the milstone
// - update the milstone

// 0 : habit tap animation
// 1 : habits animation
// 2 : sidebar animation
// 3 : sheet animation
// 4 : shared layout animationx
// 5 : Button , Expand
// 6 : workflow / process of making animations
// 7 : design / animation inspiration : follow design engineer's on twitter
// 8 : peerlist : saurabh daswant
// 9 :  twitter : @daswantsaurabh

// two main things

// motion
// - layout
// - layoutId
// - animate
// - exit
// - initial
// - transition

// AnimatePresence

// you already have the new ui ready for the weekly layout
// redesign the ui for your case
// add joy using motion

// ideas :
// habits weekly flip book animation
// toats : “All done for Thursday 🥳” + confetti animation
// Drag-to-reorder habits
// Animate week transitions (slide left/right)
// Add a 🔥 streak indicator next to habit names. Visualise 🔥 x4
// Progress Indicators Show daily or weekly progress on top:
// “You’ve completed 9/16 habits this week 🎉”
