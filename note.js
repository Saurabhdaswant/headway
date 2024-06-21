// learn date-fns first and build a small project to understand it ✅
// fix date issues when updating the date ✅
// fix the filtering of habits timing thing ✅
// update the header of today component as per design  ✅
// dont reload the whole app just while updating next month ✅
// dont show habits on dates which are behind the date of creation ✅
// dont show habits on days which are not included in repeadted habits list ✅
// use node js and mongodb ✅
// complete the next.js course from codeevolution
// make it mobile / tab responsive
// complete the stats and chart component from design
// Add Animation using Framer motion
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
