import React from "react";
import Layout from "../components/Layout";

const goalDetailPageData = {
  header: {
    title: "Learn React",
    categoryTag: "Career Development",
  },
  progressTracker: {
    progressBar: 75, // percentage completed
    percentageCompleted: "75%",
  },
  mainSections: [
    {
      sectionName: "Overview",
      content: {
        description:
          "Become proficient in React to build modern web applications.",
        deadline: "2024-12-31",
        priorityLevel: "High",
      },
    },
    {
      sectionName: "Action Plan",
      tasks: [
        { task: "Complete React basics tutorial", completed: true },
        { task: "Build a To-Do List app", completed: false },
        { task: "Learn state management with Redux", completed: false },
      ],
    },
    // {
    //   sectionName: "Reminders",
    //   reminders: [
    //     { reminder: "Start React course on Coursera", date: "2024-07-01" },
    //     {
    //       reminder: "Finish Redux tutorial by end of August",
    //       date: "2024-08-31",
    //     },
    //   ],
    // },
    {
      sectionName: "Notes",
      notes: [
        {
          note: "Check out the React documentation regularly.",
          date: "2024-06-15",
        },
        {
          note: "Join React community forums for support.",
          date: "2024-06-20",
        },
      ],
    },
    {
      sectionName: "Visuals",
      images: [
        { url: "https://example.com/image1.jpg", description: "React logo" },
        {
          url: "https://example.com/image2.jpg",
          description: "Sample React app screenshot",
        },
      ],
    },
    // {
    //   sectionName: "Motivational Quotes",
    //   quotes: [
    //     {
    //       quote:
    //         "The best way to get started is to quit talking and begin doing. - Walt Disney",
    //     },
    //   ],
    // },
    // {
    //   sectionName: "Progress Logs",
    //   logs: [
    //     { log: "Completed the React basics tutorial.", date: "2024-06-10" },
    //     { log: "Built a simple React component.", date: "2024-06-20" },
    //   ],
    // },
  ],
  footer: {
    buttons: [
      { label: "Save", action: "saveGoalDetails" },
      { label: "Delete Goal", action: "deleteGoal" },
      { label: "Share", action: "shareGoalProgress" },
    ],
  },
};

const GoalDetailPage = ({ data }) => {
  const { header, progressTracker, mainSections, footer } = data;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{header.title}</h1>
        <span className="inline-block mt-2 px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">
          {header.categoryTag}
        </span>
      </header>

      <div className="mb-6">
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${progressTracker.progressBar}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
        <span className="text-sm text-gray-600">
          {progressTracker.percentageCompleted}
        </span>
      </div>

      {mainSections.map((section, index) => (
        <section key={index} className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {section.sectionName}
          </h2>
          {section.content && (
            <div className="mb-4">
              <p>
                <strong>Description:</strong> {section.content.description}
              </p>
              <p>
                <strong>Deadline:</strong> {section.content.deadline}
              </p>
              <p>
                <strong>Priority Level:</strong> {section.content.priorityLevel}
              </p>
            </div>
          )}
          {section.tasks && (
            <ul className="mb-4">
              {section.tasks.map((task, idx) => (
                <li key={idx} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="mr-2"
                  />
                  <span>{task.task}</span>
                </li>
              ))}
              <li>
                <button className="text-blue-500 hover:underline">
                  Add Task
                </button>
              </li>
            </ul>
          )}
          {section.reminders && (
            <ul className="mb-4">
              {section.reminders.map((reminder, idx) => (
                <li key={idx} className="mb-2">
                  {reminder.reminder} - {reminder.date}
                </li>
              ))}
              <li>
                <button className="text-blue-500 hover:underline">
                  Add Reminder
                </button>
              </li>
            </ul>
          )}
          {section.notes && (
            <ul className="mb-4">
              {section.notes.map((note, idx) => (
                <li key={idx} className="mb-2">
                  {note.note} - {note.date}
                </li>
              ))}
              <li>
                <button className="text-blue-500 hover:underline">
                  Add Note
                </button>
              </li>
            </ul>
          )}
          {section.images && (
            <div className="mb-4">
              <div className="flex flex-wrap">
                {section.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image.url}
                    alt={image.description}
                    className="w-1/4 h-auto m-1 rounded-lg shadow-md"
                  />
                ))}
              </div>
              <button className="text-blue-500 hover:underline">
                Add Image
              </button>
            </div>
          )}
          {section.quotes && (
            <div className="mb-4">
              {section.quotes.map((quote, idx) => (
                <blockquote key={idx} className="italic text-gray-600">
                  "{quote.quote}"
                </blockquote>
              ))}
            </div>
          )}
          {section.logs && (
            <ul className="mb-4">
              {section.logs.map((log, idx) => (
                <li key={idx} className="mb-2">
                  {log.log} - {log.date}
                </li>
              ))}
              <li>
                <button className="text-blue-500 hover:underline">
                  Add Log
                </button>
              </li>
            </ul>
          )}
        </section>
      ))}

      {/* <footer className="flex justify-end space-x-4">
        {footer.buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(button.action)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {button.label}
          </button>
        ))}
      </footer> */}
    </div>
  );
};

const handleButtonClick = (action) => {
  // Define the actions for the buttons
  console.log(action);
};

const App = () => {
  return (
    <Layout>
      <GoalDetailPage data={goalDetailPageData} />
    </Layout>
  );
};

export default App;
